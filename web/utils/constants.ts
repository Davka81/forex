
export const APP_ENV = (process.env.NEXT_PUBLIC_APP_ENV as "prod" | "local") || "local";

export const JWT_COOKIE_NAME = (() => {
  if (process.env.NEXT_PUBLIC_APP_ENV == "prod") return `erp_jwt`;
  if (process.env.NEXT_PUBLIC_APP_ENV == "dev") return `dev_erp_jwt`;
  return `local_erp_jwt`;
})();

export const BASE_URL = (() => {
  if (process.env.NEXT_PUBLIC_APP_ENV == "prod") return "https://api.snd.mn";
  if (process.env.NEXT_PUBLIC_APP_ENV == "dev") return "https://api.snd.mn";
  return "http://localhost:3000";
})();

export const COOKIE_DOMAIN = (() => {
  if (process.env.NEXT_PUBLIC_APP_ENV == "prod") return "erp.snd.mn";
  if (process.env.NEXT_PUBLIC_APP_ENV == "dev") return "erp.snd.mn";
  return "localhost";
})();

export const GOOGLE_CLIENT_ID = (() => {
  return "802817877613-7hpr5adu9f71aj2jfckiik1sji3b3u9j.apps.googleusercontent.com";
})();