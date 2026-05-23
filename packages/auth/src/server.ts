import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

let authInstance: ReturnType<typeof betterAuth> | null = null;

export function createAuth(config: {
  db: ReturnType<typeof drizzleAdapter> extends infer T ? T : never;
  origin: string;
  secret: string;
  githubClientId?: string;
  githubClientSecret?: string;
}) {
  if (authInstance) return authInstance;

  const isDev = config.origin?.includes('localhost');

  authInstance = betterAuth({
    baseURL: config.origin,
    secret: config.secret,
    database: config.db as Parameters<typeof betterAuth>[0]['database'],
    emailAndPassword: {
      enabled: true,
      autoSignIn: true,
      minPasswordLength: 8,
      maxPasswordLength: 128
    },
    socialProviders: {
      github: config.githubClientId && config.githubClientSecret ? {
        clientId: config.githubClientId,
        clientSecret: config.githubClientSecret,
        enabled: true
      } : undefined
    },
    session: {
      expiresIn: 30 * 24 * 60 * 60,
      updateAge: 24 * 60 * 60,
      cookieCache: { enabled: true, maxAge: 5 * 60 }
    },
    advanced: {
      cookiePrefix: 'kf13',
      crossSubDomainCookies: {
        enabled: !isDev,
        domain: isDev ? undefined : '.klubfisika.or.id'
      },
      defaultCookieAttributes: {
        secure: !isDev,
        httpOnly: true,
        sameSite: 'lax'
      }
    },
    trustedOrigins: [
      config.origin || 'http://localhost:5173',
      'https://index.klubfisika.or.id',
      'https://platform.klubfisika.or.id'
    ]
  });

  return authInstance;
}

export function getAuth() {
  if (!authInstance) throw new Error('Auth not initialized. Call createAuth() first.');
  return authInstance;
}
