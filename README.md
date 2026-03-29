# TaskFlow — frontend

Görev panosu arayüzü: **React 19**, **Tailwind CSS**, **CRACO**, Radix tabanlı bileşenler.

Bu klasörü başka bir projeye kopyalayarak aynı arayüzü kullanabilirsiniz.

## Hızlı başlangıç

```bash
cd frontend
copy .env.example .env
npm install
npm start
```

Windows’ta `copy`, macOS/Linux’ta `cp .env.example .env` kullanın.

`npm install` için ek bayrak gerekmez; proje kökünde `.npmrc` ile uyumluluk ayarlıdır.

## Yapılandırma

1. **`src/config/appShell.js`** — Uygulama adı, logo, `storage.prefix`, örnek kategoriler ve sidebar metni.
2. **`.env`** (`.env.example` dosyasından kopyalayın):
   - `REACT_APP_NAME` — başlık
   - `REACT_APP_STORAGE_PREFIX` — `localStorage` öneki (ve `id`)
   - `REACT_APP_LOGO_URL` — header görseli
   - `REACT_APP_API_URL` — backend kök adresi (sonunda `/` yok); `src/lib/api.js` içinde kullanılır

Görev verisi şu an tarayıcıda (`localStorage`) tutulur. API bağlamak için `src/components/Dashboard.jsx` içindeki state’i kendi isteklerinizle değiştirin; URL için `import { getApiBaseUrl, apiUrl } from '@/config'` kullanabilirsiniz (`src/config/index.js` bunları `api.js` üzerinden dışa aktarır).

## Komutlar

| Komut | Açıklama |
|--------|----------|
| `npm start` | Geliştirme sunucusu |
| `npm run build` | Üretim derlemesi |
| `npm run lint` | ESLint (`eslint.config.mjs`) |
| `npm test` | Testler |

## Notlar

- `storage.prefix` veya `REACT_APP_STORAGE_PREFIX` değişince eski `localStorage` verisi okunmaz.
- Gizli anahtarları `.env` içinde tutun; bu dosya `.gitignore` ile repoya eklenmez. Paylaşılan varsayılanlar için `.env.example` kullanın.
