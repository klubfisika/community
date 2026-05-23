# MinIO Storage — Development Setup

Platform KF13 menggunakan **MinIO** (S3-compatible) untuk penyimpanan file selama development.
Untuk production, endpoint storage tinggal diganti ke Supabase Storage / Cloudflare R2 / AWS S3
tanpa perubahan kode — cukup ganti environment variables.

## Arsitektur: Hybrid Upload (Presigned URL)

**Kenapa bukan server-side upload?**
Vercel Edge Functions punya body size limit: 4.5 MB (Edge) / 50 MB (Serverless).
Upload file via server = file masuk ke memori Vercel dulu = boros bandwidth + risky timeout.

**Kenapa bukan pure client-side?**
Credentials storage (`ACCESS_KEY`/`SECRET_KEY`) akan bocor ke browser.
Tidak ada validasi server-side (ukuran, tipe, ownership).

**Solusi: Presigned URL**

```
Browser                    Qwik Server (Vercel)              MinIO/S3
  │                             │                               │
  │  1. POST metadata (Zod)     │                               │
  │  { filename, type, size }   │                               │
  │  ─────────────────────────► │                               │
  │                             │  2. generate presigned PUT    │
  │                             │  ────────────────────────────►│
  │  3. return { presignedUrl } │                               │
  │  ◄───────────────────────── │                               │
  │                             │                               │
  │  4. PUT file directly       │                               │
  │  ──────────────────────────────────────────────────────────►│
  │                             │                               │
  │  5. POST confirm + save ref │                               │
  │  ─────────────────────────► │  (simpan key ke DB)           │
```

**Keunggulan:**
- Server validasi metadata (Zod) + auth — tidak perlu handle bytes
- Browser upload langsung ke storage — tidak kena limit Vercel
- Credentials tetap aman di server
- `file.type` divalidasi server sebelum presigned URL dibuat

---

## 1. Menjalankan MinIO

```bash
# Di host VPS:
docker run -d \
  --name kf13-minio-dev \
  --restart unless-stopped \
  -p 127.0.0.1:9005:9000 \
  -p 127.0.0.1:9006:9001 \
  -e "MINIO_ROOT_USER=kf13admin" \
  -e "MINIO_ROOT_PASSWORD=kf13password" \
  -v kf13_minio_data:/data \
  minio/minio server /data --console-address ":9001"

# Buat bucket:
docker exec kf13-minio-dev mc alias set local http://localhost:9000 kf13admin kf13password
docker exec kf13-minio-dev mc mb local/kf13-assets
```

| Port | Fungsi |
|------|--------|
| `9005` | S3 API endpoint (digunakan aplikasi) |
| `9006` | Console UI (dashboard management) |

Kedua port hanya terbuka ke `127.0.0.1` — tidak bisa diakses dari luar VPS.

## 2. SSH Forwarding (Akses dari Lokal)

Gabungkan forward aplikasi + MinIO dalam satu perintah:

```bash
ssh -vNTL 5173:localhost:5173 \
       -L 9005:localhost:9005 \
       -L 9006:localhost:9006 \
       dev@202.162.40.162
```

| Flag | Fungsi |
|------|--------|
| `-L 5173:localhost:5173` | Aplikasi Qwik/Svelte |
| `-L 9005:localhost:9005` | **MinIO S3 API** |
| `-L 9006:localhost:9006` | **MinIO Console UI** |

Setelah forward aktif:
- Console UI: buka http://localhost:9006 (login: `kf13admin` / `kf13password`)
- API: aplikasi akses via `http://localhost:9005`

## 3. Environment Variables

Di `apps/platform/.env.local`:

```env
STORAGE_ENDPOINT="http://localhost:9005"
STORAGE_REGION="us-east-1"
STORAGE_ACCESS_KEY="kf13admin"
STORAGE_SECRET_KEY="kf13password"
STORAGE_BUCKET="kf13-assets"
STORAGE_PUBLIC_URL="http://localhost:9005/kf13-assets"
```

## 4. Usage di Kode

### Pattern 1: Presigned Upload (recommended untuk user upload)

```typescript
import { getUploadUrl, generateFileKey } from "~/lib/storage";
import { z } from "zod";

const uploadSchema = z.object({
  filename: z.string().min(1),
  contentType: z.string().regex(/^image\/(jpeg|png|webp)$/, "Hanya gambar"),
  category: z.enum(["avatars", "posts", "projects"]),
});

export const useGetUploadUrl = routeAction$(async (data, req) => {
  const session = await getAuth().api.getSession({
    headers: req.request.headers,
  });
  if (!session?.user) throw req.redirect(302, "/login");

  const parsed = uploadSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const key = generateFileKey(
    session.user.id,
    parsed.data.category,
    parsed.data.filename,
  );

  const { url, publicUrl } = await getUploadUrl(
    key,
    parsed.data.contentType,
    300, // 5 menit
  );

  return { success: true, key, presignedUrl: url, publicUrl };
});

// Di komponen Qwik:
//  1. Panggil useGetUploadUrl action dengan metadata file
//  2. Dapatkan presignedUrl
//  3. Upload langsung dari browser:
//     await fetch(presignedUrl, { method: "PUT", body: file, headers: { "Content-Type": file.type } });
//  4. Simpan key/publicUrl ke database
```

### Pattern 2: Server-side Upload (untuk file generated server-side)

```typescript
import { uploadFile, getFileUrl, deleteFile, generateFileKey } from "~/lib/storage";

// Upload dari server (misal: generate thumbnail, export data)
const result = await uploadFile(
  generateFileKey(userId, "exports", "data.json"),
  JSON.stringify(data),
  "application/json",
);

// Get signed URL untuk download temporary
const url = await getFileUrl("avatars/user123/profile.jpg", 3600);

// Delete file
await deleteFile("avatars/user123/old-image.jpg");
```

## 5. Production

Ganti endpoint/credentials/bucket di `.env.production` — tanpa perubahan kode:

```env
# Supabase Storage
STORAGE_ENDPOINT="https://xxx.supabase.co/storage/v1/s3"

# Cloudflare R2 (no egress fees)
STORAGE_ENDPOINT="https://xxx.r2.cloudflarestorage.com"

# AWS S3
STORAGE_ENDPOINT="https://s3.amazonaws.com"
```
