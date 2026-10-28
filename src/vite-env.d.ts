export {};

declare global {
  interface ViteTypeOptions {
    strictImportMetaEnv: unknown;
  }

  interface ImportMetaEnv {
    readonly VITE_SITE_URL?: string;
  }
}
