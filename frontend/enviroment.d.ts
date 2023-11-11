export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API: string;
      NEXT_PUBLIC_SPOTIFY_CLIENT_ID: string;
      NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET: string;
      NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN: string;
      NEXT_PUBLIC_UMAMI_DOMAIN: string;
      NEXT_PUBLIC_UMAMI_KEY: string;
      UMAMI_USER: string;
      UMAMI_PASS: string;
    }
  }
}
