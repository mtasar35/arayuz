/**
 * Backend bağlantısı eklerken buradan başlayın.
 * `.env` içinde REACT_APP_API_URL tanımlayın (ör. http://localhost:8000).
 */
export function getApiBaseUrl() {
  const raw = process.env.REACT_APP_API_URL;
  if (raw == null || String(raw).trim() === "") {
    return "";
  }
  return String(raw).replace(/\/$/, "");
}

export function apiUrl(path) {
  const base = getApiBaseUrl();
  const p = path.startsWith("/") ? path : `/${path}`;
  if (!base) {
    return p;
  }
  return `${base}${p}`;
}
