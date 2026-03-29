/**
 * Yeniden kullanılabilir arayüz şablonu — yeni projede öncelikle bu dosyayı düzenleyin.
 *
 * Üretimde aynı değerleri `.env` ile de verebilirsiniz (REACT_APP_NAME, REACT_APP_STORAGE_PREFIX);
 * ortam değişkeni doluysa aşağıdaki varsayılanların üzerine yazar.
 *
 * - branding: başlık, logo, kısa açıklama
 * - storage.prefix: localStorage anahtarları (çakışmayı önler)
 * - layout: sayfa arka planı (Tailwind sınıfları)
 * - demo: ilk açılışta gösterilecek örnek kategoriler
 */

const baseAppShell = {
  /** Tekil kimlik; storage anahtarı için kullanılır */
  id: "taskflow",

  branding: {
    /** Üst başlık */
    name: "TaskFlow",
    /** İsteğe bağlı: header’daki küçük görsel (URL veya boş) */
    logoUrl:
      "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=64&h=64&fit=crop",
    /** Arama kutusu ve benzeri yerlerde kullanılabilir */
    searchPlaceholder: "Görev ara…",
  },

  storage: {
    /** localStorage: `${prefix}:tasks` ve `${prefix}:categories` */
    prefix: "taskflow",
  },

  layout: {
    pageClassName:
      "min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50",
  },

  /** Veri yokken bir kez yüklenecek örnek kategoriler */
  demo: {
    seedCategories: [
      { id: 1, name: "İş", color: "blue" },
      { id: 2, name: "Kişisel", color: "green" },
      { id: 3, name: "Alışveriş", color: "purple" },
      { id: 4, name: "Sağlık", color: "pink" },
    ],
  },

  sidebar: {
    /** Sidebar altı kısa not */
    footerNote: "Görev panosu arayüzü — backend ve .env ile genişletilebilir.",
  },
};

const envName = process.env.REACT_APP_NAME?.trim();
const envPrefix = process.env.REACT_APP_STORAGE_PREFIX?.trim();
const envLogo = process.env.REACT_APP_LOGO_URL?.trim();

export const appShell = {
  ...baseAppShell,
  id: envPrefix || baseAppShell.id,
  branding: {
    ...baseAppShell.branding,
    ...(envName ? { name: envName } : {}),
    ...(envLogo ? { logoUrl: envLogo } : {}),
  },
  storage: {
    prefix: envPrefix || baseAppShell.storage.prefix,
  },
};

export function storageKey(suffix) {
  return `${appShell.storage.prefix}:${suffix}`;
}
