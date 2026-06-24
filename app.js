// قوالب صور المنتجات بصيغة SVG (مضمنة كـ Base64 لضمان التحميل السريع بدون إنترنت ومظهر بصري ممتاز)
const SVG_TEMPLATES = {
  playstation_console: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%"><defs><radialGradient id="psGlow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="%238a2be2" stop-opacity="0.3"/><stop offset="100%" stop-color="%2307080d" stop-opacity="0"/></radialGradient><linearGradient id="psBody" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23ffffff"/><stop offset="100%" stop-color="%238a9ab0"/></linearGradient></defs><rect width="400" height="400" fill="%2307080d"/><circle cx="200" cy="200" r="180" fill="url(%23psGlow)"/><g transform="translate(140, 60) scale(0.9)"><path d="M40 0 L0 30 L40 280 L70 280 L90 30 Z" fill="url(%23psBody)" filter="drop-shadow(0 0 10px rgba(0, 240, 255, 0.4))"/><path d="M80 0 L120 30 L80 280 L50 280 L30 30 Z" fill="url(%23psBody)" filter="drop-shadow(0 0 10px rgba(0, 240, 255, 0.4))"/><path d="M40 30 L80 30 L60 280 Z" fill="%23000000"/><rect x="55" y="80" width="10" height="150" fill="%230043e0" filter="drop-shadow(0 0 8px %230043e0)"/></g></svg>`,

  playstation_game: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%"><rect width="400" height="400" fill="%2307080d"/><rect x="100" y="50" width="200" height="300" rx="10" fill="%230b0e14" stroke="%230043e0" stroke-width="4"/><rect x="100" y="50" width="200" height="60" fill="%230043e0"/><text x="200" y="85" fill="white" font-family="sans-serif" font-weight="bold" font-size="20" text-anchor="middle">PS5</text><circle cx="200" cy="220" r="70" fill="none" stroke="%2300f0ff" stroke-width="8" stroke-dasharray="10 5"/><path d="M170 220 L230 220 M200 190 L200 250" stroke="white" stroke-width="4"/><text x="200" y="320" fill="white" font-family="sans-serif" font-weight="bold" font-size="16" text-anchor="middle">EXCLUSIVE GAME</text></svg>`,

  xbox_console: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%"><defs><radialGradient id="xbGlow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="%2339ff14" stop-opacity="0.25"/><stop offset="100%" stop-color="%2307080d" stop-opacity="0"/></radialGradient></defs><rect width="400" height="400" fill="%2307080d"/><circle cx="200" cy="200" r="180" fill="url(%23xbGlow)"/><g transform="translate(130, 80)"><rect x="20" y="20" width="100" height="200" fill="%231a1a1a" stroke="%23333333" stroke-width="2" filter="drop-shadow(0 10px 20px rgba(0,0,0,0.6))"/><ellipse cx="70" y="20" rx="50" ry="10" fill="%23111111"/><circle cx="70" y="20" r="6" fill="%2339ff14" filter="drop-shadow(0 0 5px %2339ff14)"/><circle cx="70" cy="120" r="12" fill="%23111111"/><path d="M62 120 L78 120 M70 112 L70 128" stroke="%2339ff14" stroke-width="2"/></g></svg>`,

  xbox_game: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%"><rect width="400" height="400" fill="%2307080d"/><rect x="100" y="50" width="200" height="300" rx="10" fill="%230b0e14" stroke="%23107c10" stroke-width="4"/><rect x="100" y="50" width="200" height="60" fill="%23107c10"/><text x="200" y="85" fill="white" font-family="sans-serif" font-weight="bold" font-size="20" text-anchor="middle">XBOX</text><circle cx="200" cy="220" r="60" fill="none" stroke="%2339ff14" stroke-width="6"/><path d="M175 195 L225 245 M175 245 L225 195" stroke="white" stroke-width="6"/><text x="200" y="320" fill="white" font-family="sans-serif" font-weight="bold" font-size="16" text-anchor="middle">HIT GAME</text></svg>`,

  nintendo_console: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%"><defs><radialGradient id="ntGlow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="%23e60012" stop-opacity="0.25"/><stop offset="100%" stop-color="%2307080d" stop-opacity="0"/></radialGradient></defs><rect width="400" height="400" fill="%2307080d"/><circle cx="200" cy="200" r="180" fill="url(%23ntGlow)"/><g transform="translate(90, 130)"><rect x="40" y="10" width="140" height="100" rx="10" fill="%231e1e1e" stroke="%23333" stroke-width="2"/><rect x="55" y="20" width="110" height="80" fill="%23000"/><path d="M0 20 L30 10 L30 110 L0 100 Z" fill="%23e60012" rx="5"/><circle cx="15" cy="40" r="6" fill="white"/><rect x="12" y="70" width="6" height="16" rx="2" fill="white"/><path d="M220 20 L190 10 L190 110 L220 100 Z" fill="%2300a0e9" rx="5"/><circle cx="205" cy="75" r="6" fill="white"/><circle cx="205" cy="35" r="5" fill="%23333"/><circle cx="198" cy="42" r="5" fill="%23333"/><circle cx="212" cy="42" r="5" fill="%23333"/></g></svg>`,

  nintendo_game: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%"><rect width="400" height="400" fill="%2307080d"/><rect x="100" y="50" width="200" height="300" rx="10" fill="%230b0e14" stroke="%23e60012" stroke-width="4"/><rect x="100" y="50" width="200" height="60" fill="%23e60012"/><text x="200" y="85" fill="white" font-family="sans-serif" font-weight="bold" font-size="18" text-anchor="middle">SWITCH</text><polygon points="200,160 250,250 150,250" fill="%23ff3333" stroke="white" stroke-width="4"/><text x="200" y="320" fill="white" font-family="sans-serif" font-weight="bold" font-size="16" text-anchor="middle">SWITCH ADVENTURE</text></svg>`,

  generic: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%"><rect width="400" height="400" fill="%2307080d"/><circle cx="200" cy="200" r="100" fill="none" stroke="%2300f0ff" stroke-width="4"/><path d="M150 200 L250 200 M200 150 L200 250" stroke="%238a2be2" stroke-width="4"/><text x="200" y="340" fill="white" font-family="sans-serif" font-size="16" text-anchor="middle">NEW PRODUCT</text></svg>`
};

// قائمة المنتجات الافتراضية الأولية
const DEFAULT_PRODUCTS = [
  {
    id: "p1",
    title: "Sony PlayStation 5 Slim Edition",
    title_ar: "سوني بلايستيشن 5 سليم",
    price: 84000,
    category: "playstation",
    type: "console",
    image: SVG_TEMPLATES.playstation_console,
    description: "استمتع بتحميل فائق السرعة مع وسيط تخزين ذو حالة ثابتة (SSD) فائق السرعة، وانغماس أعمق مع دعم الملاحظات اللمسية والمشغلات التكيفية والصوت ثلاثي الأبعاد."
  },
  {
    id: "p2",
    title: "Xbox Series X 1TB Console",
    title_ar: "إكس بوكس سيريس إكس 1 تيرابايت",
    price: 79000,
    category: "xbox",
    type: "console",
    image: SVG_TEMPLATES.xbox_console,
    description: "أسرع وأقوى جهاز Xbox على الإطلاق. العب آلاف العناوين من أربعة أجيال من الأجهزة - تبدو جميع الألعاب وتعمل بشكل أفضل على Xbox Series X."
  },
  {
    id: "p3",
    title: "Nintendo Switch OLED Model",
    title_ar: "نينتندو سويتش نموذج أوليد",
    price: 58000,
    category: "nintendo",
    type: "console",
    image: SVG_TEMPLATES.nintendo_console,
    description: "يتميز بشاشة OLED نابضة بالحياة مقاس 7 بوصات، وحامل عريض قابل للتعديل، وقاعدة بها منفذ LAN سلكي، وسعة تخزين داخلية 64 جيجابايت، وصوت محسّن."
  },
  {
    id: "p4",
    title: "Marvel's Spider-Man 2 - PS5",
    title_ar: "لعبة سبايدرمان 2 - بلايستيشن 5",
    price: 9500,
    category: "playstation",
    type: "game",
    image: SVG_TEMPLATES.playstation_game,
    description: "تأرجح واقفز واستخدم أجنحة الويب الجديدة للسفر عبر نيويورك، وبسرعة بدّل بين بيتر باركر ومايلز موراليس."
  },
  {
    id: "p5",
    title: "Halo Infinite - Xbox Series X/S",
    title_ar: "لعبة هيلو إنفينيت - إكس بوكس",
    price: 6500,
    category: "xbox",
    type: "game",
    image: SVG_TEMPLATES.xbox_game,
    description: "تعود سلسلة Halo الأسطورية مع حملة Master Chief الأكثر توسعاً وتجربة مجانية رائدة للعب المتعدد."
  },
  {
    id: "p6",
    title: "The Legend of Zelda: Tears of the Kingdom",
    title_ar: "لعبة زيلدا: تيرز أوف ذا كينغدوم",
    price: 8900,
    category: "nintendo",
    type: "game",
    image: SVG_TEMPLATES.nintendo_game,
    description: "تنتظرك مغامرة ملحمية عبر أراضي وسماء Hyrule في هذا الجزء الثاني للعبة The Legend of Zelda: Breath of the Wild."
  },
  {
    id: "p7",
    title: "PlayStation Plus Premium 12 Months",
    title_ar: "اشتراك بلايستيشن بلس بريميوم 12 شهر",
    price: 18500,
    category: "games_subs",
    type: "game",
    image: SVG_TEMPLATES.playstation_game,
    description: "استمتع بمئات من ألعاب PS5 و PS4 وألعاب PlayStation الكلاسيكية، وتجارب ألعاب محدودة الوقت، والبث السحابي، ومزايا حصرية للأعضاء."
  },
  {
    id: "p8",
    title: "Xbox Game Pass Ultimate 3 Months",
    title_ar: "اشتراك إكس بوكس جيم باس ألتيميت 3 أشهر",
    price: 6500,
    category: "games_subs",
    type: "game",
    image: SVG_TEMPLATES.xbox_game,
    description: "احصل على وصول غير محدود لأكثر من 100 لعبة عالية الجودة للكونسول والكمبيوتر، بما في ذلك الألعاب الصادرة حديثاً من اليوم الأول."
  },
  {
    id: "p9",
    title: "DualSense Edge Wireless Controller - PS5",
    title_ar: "يد تحكم بلايستيشن 5 برو (دوال سينس إيدج)",
    price: 34000,
    category: "accessories",
    type: "accessory",
    image: SVG_TEMPLATES.playstation_console,
    description: "احصل على أفضلية في اللعب مع عناصر تحكم مخصصة، وأزرار قابلة لإعادة التعيين، ومحفزات وعصي قابلة للضبط، وأغطية عصا قابلة للتبديل."
  },
  {
    id: "p10",
    title: "Xbox Wireless Controller - Carbon Black",
    title_ar: "يد تحكم إكس بوكس لاسلكية - أسود كربوني",
    price: 11500,
    category: "accessories",
    type: "accessory",
    image: SVG_TEMPLATES.xbox_console,
    description: "جرب التصميم المحدث لوحدة تحكم Xbox اللاسلكية، والتي تتميز بأسطح منحوتة وهندسة محسنة لتوفير راحة أكبر أثناء اللعب."
  }
];

// الولايات الجزائرية (58 ولاية)
const WILAYAS = [
  { code: "01", name: "Adrar - أدرار" },
  { code: "02", name: "Chlef - الشلف" },
  { code: "03", name: "Laghouat - الأغواط" },
  { code: "04", name: "Oum El Bouaghi - أم البواقي" },
  { code: "05", name: "Batna - باتنة" },
  { code: "06", name: "Béjaïa - بجاية" },
  { code: "07", name: "Biskra - بسكرة" },
  { code: "08", name: "Béchar - بشار" },
  { code: "09", name: "Blida - البليدة" },
  { code: "10", name: "Bouira - البويرة" },
  { code: "11", name: "Tamanrasset - تمنراست" },
  { code: "12", name: "Tébessa - تبسة" },
  { code: "13", name: "Tlemcen - تلمسان" },
  { code: "14", name: "Tiaret - تيارت" },
  { code: "15", name: "Tizi Ouzou - تيزي وزو" },
  { code: "16", name: "Algiers - الجزائر" },
  { code: "17", name: "Djelfa - الجلفة" },
  { code: "18", name: "Jijel - جيجل" },
  { code: "19", name: "Sétif - سطيف" },
  { code: "20", name: "Saïda - سعيدة" },
  { code: "21", name: "Skikda - سكيكدة" },
  { code: "22", name: "Sidi Bel Abbès - سيدي بلعباس" },
  { code: "23", name: "Annaba - عنابة" },
  { code: "24", name: "Guelma - قالمة" },
  { code: "25", name: "Constantine - قسنطينة" },
  { code: "26", name: "Médéa - المدية" },
  { code: "27", name: "Mostaganem - مستغانم" },
  { code: "28", name: "M'Sila - المسيلة" },
  { code: "29", name: "Mascara - معسكر" },
  { code: "30", name: "Ouargla - ورقلة" },
  { code: "31", name: "Oran - وهران" },
  { code: "32", name: "El Bayadh - البيض" },
  { code: "33", name: "Illizi - إليزي" },
  { code: "34", name: "Bordj Bou Arréridj - برج بوعريريج" },
  { code: "35", name: "Boumerdès - بومرداس" },
  { code: "36", name: "El Tarf - الطارف" },
  { code: "37", name: "Tindouf - تندوف" },
  { code: "38", name: "Tissemsilt - تيسمسيلت" },
  { code: "39", name: "El Oued - الوادي" },
  { code: "40", name: "Khenchela - خنشلة" },
  { code: "41", name: "Souk Ahras - سوق أهراس" },
  { code: "42", name: "Tipaza - تيبازة" },
  { code: "43", name: "Mila - ميلة" },
  { code: "44", name: "Aïn Defla - عين الدفلى" },
  { code: "45", name: "Naâma - النعامة" },
  { code: "46", name: "Aïn Témouchent - عين تموشنت" },
  { code: "47", name: "Ghardaïa - غرداية" },
  { code: "48", name: "Relizane - غليزان" },
  { code: "49", name: "El M'Ghair - المغير" },
  { code: "50", name: "El Meniaa - المنيعة" },
  { code: "51", name: "Ouled Djellal - أولاد جلال" },
  { code: "52", name: "Bordj Baji Mokhtar - برج باجي مختار" },
  { code: "53", name: "Béni Abbès - بني عباس" },
  { code: "54", name: "In Salah - عين صالح" },
  { code: "55", name: "In Guezzam - عين قزام" },
  { code: "56", name: "Touggourt - تقرت" },
  { code: "57", name: "Djanet - جانت" },
  { code: "58", name: "Aïn Salah - عين صالح" }
];

// حالة التطبيق العامة
let products = JSON.parse(localStorage.getItem("console_store_products")) || DEFAULT_PRODUCTS;
let cart = JSON.parse(localStorage.getItem("console_store_cart")) || [];
let orders = JSON.parse(localStorage.getItem("console_store_orders")) || [];
let currentView = "home"; // home, playstation, xbox, nintendo, games_subs, accessories, seller
let sellerTab = "orders"; // orders, catalog, settings
let uploadedProductImage = "";
let uploadedLogoImage = ""; // لتخزين الشعار المرفوع

// تحديث قائمة المنتجات من التخزين المحلي لضمان عدم حدوث تعارض أو فقدان البيانات عند الإضافة من قبل البائع
function loadLatestProducts() {
  products = JSON.parse(localStorage.getItem("console_store_products")) || DEFAULT_PRODUCTS;
}

// حفظ البيانات في التخزين المحلي
function saveState() {
  // نقوم بحفظ السلة والطلبيات فقط هنا لتجنب الكتابة الفوقية على التعديلات التي يجريها البائع في الكتالوج
  localStorage.setItem("console_store_cart", JSON.stringify(cart));
  localStorage.setItem("console_store_orders", JSON.stringify(orders));
}

// تنسيق الأسعار بالدينار الجزائري
function formatPrice(amount) {
  const isRtl = document.body.classList.contains("rtl");
  return isRtl
    ? `${amount.toLocaleString('de-DE')} د.ج`
    : `${amount.toLocaleString('en-US')} DA`;
}

// تهيئة وتشغيل التطبيق عند تحميل المستند
document.addEventListener("DOMContentLoaded", () => {
  // التوجيه الافتراضي إلى اللغة العربية
  setLanguage("ar");

  // تعبئة الولايات في قائمة إتمام الطلب
  populateWilayas();

  // الانتقال إلى الواجهة الافتراضية
  navigate(currentView);

  // تحديث وعرض سلة المشتريات
  renderCart();

  // تأثير التظليل في الهيدر عند التمرير لأسفل
  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // إعداد مستمعي تحميل صور المنتجات والشعارات
  setupImageUpload();
  setupLogoUpload();
  renderLogo();

  // ===== تحديث المنتجات تلقائياً عند إضافتها من قِبَل البائع =====
  // الاستماع لتغييرات localStorage من تبويبات أخرى (البائع في seller.html)
  window.addEventListener("storage", (e) => {
    if (e.key === "console_store_products") {
      loadLatestProducts();
      renderProducts();
      showToast("🔄 تم تحديث قائمة المنتجات!", "info");
    }
    if (e.key === "console_store_logo_type" || e.key === "console_store_logo_custom") {
      renderLogo();
    }
  });

  // تحديث المنتجات عند العودة لصفحة المتجر (من تبويب seller)
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      const stored = JSON.parse(localStorage.getItem("console_store_products") || "[]");
      const storedIds = stored.map(p => p.id).join(",");
      const currentIds = products.map(p => p.id).join(",");
      if (storedIds !== currentIds) {
        loadLatestProducts();
        renderProducts();
      }
      renderLogo();
    }
  });
});

// تعبئة قائمة الولايات في نموذج الطلب
function populateWilayas() {
  const select = document.getElementById("checkout-state");
  if (!select) return;

  select.innerHTML = '<option value="" disabled selected data-translate="select_state">اختر الولاية...</option>';

  WILAYAS.forEach(w => {
    const option = document.createElement("option");
    option.value = w.name;
    option.textContent = w.name;
    select.appendChild(option);
  });
}

// نظام الترجمة متعدد اللغات
const TRANSLATIONS = {
  ar: {
    logo_store: "كونسول",
    logo_hub: "جيمز",
    nav_home: "الرئيسية",
    nav_playstation: "بلايستيشن",
    nav_xbox: "إكس بوكس",
    nav_nintendo: "نينتندو",
    nav_games_subs: "ألعاب واشتراكات",
    nav_accessories: "اكسسوارات",
    nav_seller: "بوابة البائع",
    hero_title: "ارتقِ بتجربة <span>الألعاب</span> الخاصة بك",
    hero_desc: "اكتشف أحدث أجهزة ألعاب الفيديو (الكونسول) والألعاب الحصرية بأفضل الأسعار. خدمة سريعة وتوصيل لكافة الولايات.",
    hero_btn_shop: "تسوق الآن",
    hero_btn_seller: "بوابة البائع",
    cat_ps_title: "عالم بلايستيشن",
    cat_ps_desc: "أجهزة PS5 وألعاب حصرية مذهلة",
    cat_xb_title: "قوة إكس بوكس",
    cat_xb_desc: "أقوى كونسول وألعاب Xbox الجبارة",
    cat_nt_title: "مغامرات نينتندو",
    cat_nt_desc: "ألعاب محمولة ومرح عائلي لا ينتهي",
    cat_gs_desc: "اشتراكات ألعاب وبطاقات رقمية",
    cat_ac_desc: "سماعات، أيادي تحكم، وإكسسوارات ممتازة",
    section_featured: "أحدث العروض والمنتجات",
    section_all: "الكل",
    section_consoles: "الأجهزة",
    section_games: "الألعاب والاشتراكات",
    add_to_cart: "أضف للسلة",
    cart_title: "سلة المشتريات",
    cart_empty: "سلة المشتريات فارغة حالياً",
    cart_total: "المجموع الكلي:",
    cart_checkout: "تأكيد الطلبية",
    checkout_title: "إتمام الطلب وتأكيد الشراء",
    checkout_name: "الاسم الشخصي",
    checkout_surname: "اللقب (العائلة)",
    checkout_phone: "رقم الهاتف",
    checkout_state: "الولاية",
    select_state: "اختر الولاية...",
    checkout_confirm: "إرسال وتأكيد الطلبية",
    checkout_cancel: "إلغاء",
    seller_title: "تسجيل دخول البائع",
    seller_desc: "الرجاء إدخال رمز المرور السري للدخول إلى لوحة التحكم (الافتراضي: 1234)",
    seller_pass_placeholder: "أدخل رمز المرور السري",
    seller_login_btn: "دخول",
    seller_dash_title: "لوحة تحكم البائع",
    seller_menu_orders: "الطلبات الواردة",
    seller_menu_catalog: "كتالوج المنتجات",
    seller_menu_settings: "إعدادات المتجر",
    seller_logout: "تسجيل الخروج",
    seller_add_product: "إضافة منتج جديد",
    prod_add_title: "إضافة منتج جديد للكتالوج",
    prod_name_en: "اسم المنتج (بالإنجليزي)",
    prod_name_ar: "اسم المنتج (بالعربي)",
    prod_price: "السعر (بالدينار الجزائري DA)",
    prod_category: "فئة المنتج",
    prod_type: "نوع المنتج",
    prod_type_console: "جهاز كونسول",
    prod_type_game: "لعبة / اشتراك",
    prod_type_accessory: "اكسسوارات",
    prod_desc: "وصف المنتج",
    prod_image: "صورة المنتج",
    prod_image_desc: "اسحب الصورة هنا أو اضغط لرفع ملف",
    prod_save: "حفظ المنتج",
    catalog_col_img: "الصورة",
    catalog_col_name: "الاسم",
    catalog_col_cat: "الفئة",
    catalog_col_price: "السعر",
    catalog_col_action: "الإجراءات",
    order_col_cust: "الزبون",
    order_col_phone: "الهاتف",
    order_col_state: "الولاية",
    order_col_items: "المشتريات",
    order_col_total: "Total",
    order_delete: "حذف الطلب",
    order_status_pending: "قيد الانتظار",
    order_empty: "لا توجد طلبات مسجلة بعد",
    toast_added: "تمت إضافة المنتج إلى السلة بنجاح!",
    toast_checkout_success: "تهانينا! تم تسجيل طلبيتك وجاري تحويلك لواتساب لإكمال الطلب.",
    toast_checkout_empty: "سلتك فارغة! أضف بعض المنتجات أولاً.",
    toast_auth_error: "رمز المرور خاطئ! حاول مجدداً.",
    toast_auth_success: "تم تسجيل الدخول بنجاح.",
    toast_product_added: "تمت إضافة المنتج بنجاح إلى المتجر.",
    toast_product_deleted: "تم حذف المنتج بنجاح من المتجر.",
    toast_order_deleted: "تم حذف الطلبية بنجاح.",
    toast_fill_all: "يرجى ملء جميع الحقول المطلوبة!",
    settings_logo: "شعار الموقع (صورة أو نص)",
    settings_logo_default: "الافتراضي",
    settings_logo_custom: "مخصص (صورة)",
    settings_logo_upload_desc: "اضغط لرفع صورة الشعار",
    settings_whatsapp: "رقم هاتف الواتساب لاستقبال الطلبات",
    settings_whatsapp_help: "الرجاء كتابة الرقم مع رمز الدولة بدون إشارات + أو أصفار في البداية (مثلاً للجزائر: 213xxxxxxxx).",
    settings_save: "حفظ الإعدادات"
  },
  en: {
    logo_store: "CONSOLE",
    logo_hub: "GAMES",
    nav_home: "Home",
    nav_playstation: "PlayStation",
    nav_xbox: "Xbox",
    nav_nintendo: "Nintendo",
    nav_games_subs: "Games & Subs",
    nav_accessories: "Accessories",
    nav_seller: "Seller Portal",
    hero_title: "Level Up Your <span>Gaming</span> Experience",
    hero_desc: "Discover the latest video game consoles and exclusive games at premium prices. Fast service and nationwide shipping.",
    hero_btn_shop: "Shop Now",
    hero_btn_seller: "Seller Panel",
    cat_ps_title: "PlayStation Realm",
    cat_ps_desc: "Ultimate PS5 Consoles & Exclusive Hits",
    cat_xb_title: "Xbox Powerhouse",
    cat_xb_desc: "Most Powerful Consoles & Xbox Games",
    cat_nt_title: "Nintendo Adventures",
    cat_nt_desc: "Portable Gaming & Endless Family Fun",
    cat_gs_desc: "Games Subscriptions & Digital Cards",
    cat_ac_desc: "Headsets, Controllers & Gaming gear",
    section_featured: "Featured & Latest Products",
    section_all: "All",
    section_consoles: "Consoles",
    section_games: "Games & Subs",
    add_to_cart: "Add to Cart",
    cart_title: "Shopping Cart",
    cart_empty: "Your cart is empty",
    cart_total: "Grand Total:",
    cart_checkout: "Checkout & Confirm",
    checkout_title: "Order Details & Checkout",
    checkout_name: "First Name",
    checkout_surname: "Last Name",
    checkout_phone: "Phone Number",
    checkout_state: "State / Wilaya",
    select_state: "Select State...",
    checkout_confirm: "Confirm Order",
    checkout_cancel: "Cancel",
    seller_title: "Seller Login",
    seller_desc: "Please enter the administrative passcode to access dashboard (Default: 1234)",
    seller_pass_placeholder: "Enter admin passcode",
    seller_login_btn: "Login",
    seller_dash_title: "Seller Dashboard",
    seller_menu_orders: "Incoming Orders",
    seller_menu_catalog: "Product Catalog",
    seller_menu_settings: "Store Settings",
    seller_logout: "Logout",
    seller_add_product: "Add New Product",
    prod_add_title: "Add Product to Catalog",
    prod_name_en: "Product Name (English)",
    prod_name_ar: "Product Name (Arabic)",
    prod_price: "Price (DZD / DA)",
    prod_category: "Product Category",
    prod_type: "Product Type",
    prod_type_console: "Console Console",
    prod_type_game: "Game / Subscription",
    prod_type_accessory: "Accessory",
    prod_desc: "Product Description",
    prod_image: "Product Image",
    prod_image_desc: "Drag image here or click to upload file",
    prod_save: "Save Product",
    catalog_col_img: "Image",
    catalog_col_name: "Name",
    catalog_col_cat: "Category",
    catalog_col_price: "Price",
    catalog_col_action: "Action",
    order_col_cust: "Customer",
    order_col_phone: "Phone",
    order_col_state: "State",
    order_col_items: "Items Ordered",
    order_col_total: "Total",
    order_delete: "Delete Order",
    order_status_pending: "Pending",
    order_empty: "No orders placed yet",
    toast_added: "Product added to cart successfully!",
    toast_checkout_success: "Congratulations! Your order has been placed. Redirecting to WhatsApp.",
    toast_checkout_empty: "Your cart is empty! Please add products first.",
    toast_auth_error: "Incorrect passcode! Please try again.",
    toast_auth_success: "Logged in successfully.",
    toast_product_added: "Product added to the store catalog.",
    toast_product_deleted: "Product deleted from the catalog.",
    toast_order_deleted: "Order deleted successfully.",
    toast_fill_all: "Please fill out all required fields!",
    settings_logo: "Site Logo (Image or Text)",
    settings_logo_default: "Default",
    settings_logo_custom: "Custom (Image)",
    settings_logo_upload_desc: "Click to upload logo",
    settings_whatsapp: "WhatsApp Number for Orders",
    settings_whatsapp_help: "Please write number with country code without + or leading zeros (e.g. 213xxxxxxxx).",
    settings_save: "Save Settings"
  }
};

let currentLanguage = "ar";

// تغيير لغة الواجهة ديناميكياً
function setLanguage(lang) {
  currentLanguage = lang;
  if (lang === "ar") {
    document.body.classList.add("rtl");
    document.body.setAttribute("dir", "rtl");
  } else {
    document.body.classList.remove("rtl");
    document.body.removeAttribute("dir");
  }

  // تحديث جميع العناصر التي تحمل الواسم المخصص للترجمة
  document.querySelectorAll("[data-translate]").forEach(elem => {
    const key = elem.getAttribute("data-translate");
    if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
      if (elem.tagName === "INPUT" || elem.tagName === "TEXTAREA") {
        elem.placeholder = TRANSLATIONS[lang][key];
      } else {
        elem.innerHTML = TRANSLATIONS[lang][key];
      }
    }
  });

  // إعادة رسم المكونات لتطبيق اللغات الجديدة
  renderLogo();
  renderProducts();
  renderCart();
  renderSellerDashboard();
}

// التوجيه وعرض الصفحات والأقسام المختلفة
function navigate(viewId) {
  currentView = viewId;

  // إزالة التنشيط من جميع روابط القائمة
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.classList.remove("active");
  });

  // تنشيط الرابط الحالي المختار
  const activeLink = document.querySelector(`.nav-links a[href="#${viewId}"]`);
  if (activeLink) {
    activeLink.classList.add("active");
  }

  // إخفاء جميع أقسام الواجهة
  document.querySelectorAll(".view-section").forEach(sec => {
    sec.classList.remove("active");
  });

  // إظهار القسم المطلوب
  const targetSection = document.getElementById(`${viewId}-view`);
  if (targetSection) {
    targetSection.classList.add("active");
  }

  // فرز وعرض منتجات الأقسام والصفحات المحددة
  if (viewId === "home") {
    renderProducts("all");
  } else if (["playstation", "xbox", "nintendo", "games_subs", "accessories"].includes(viewId)) {
    renderProducts(viewId);
  } else if (viewId === "seller") {
    // التحقق من صحة الجلسة لبوابة البائع
    const isAuth = sessionStorage.getItem("seller_authenticated") === "true";
    const authPanel = document.getElementById("seller-auth-panel");
    const dashPanel = document.getElementById("seller-dashboard-panel");

    if (isAuth) {
      authPanel.style.display = "none";
      dashPanel.style.display = "block";
      renderSellerDashboard();
    } else {
      authPanel.style.display = "block";
      dashPanel.style.display = "none";
    }
  }

  // إغلاق قائمة الموبايل في حالة كانت نشطة
  const nav = document.querySelector("nav");
  if (nav && nav.classList.contains("mobile-active")) {
    nav.classList.remove("mobile-active");
  }

  window.scrollTo(0, 0);
}

// رسم وعرض المنتجات في الشبكة وتصفيتها
function renderProducts(category = "all", subfilter = "all") {
  loadLatestProducts();

  let activeCategory = category;
  if (currentView !== "home" && ["playstation", "xbox", "nintendo", "games_subs", "accessories"].includes(currentView)) {
    activeCategory = currentView;
  }

  let gridId = "catalog-products-grid";
  if (activeCategory !== "all" && ["playstation", "xbox", "nintendo", "games_subs", "accessories"].includes(activeCategory)) {
    gridId = `${activeCategory}-products-grid`;
  }

  const grid = document.getElementById(gridId);
  if (!grid) return;

  // تصفية المنتجات بناءً على التصنيف والنوع
  let filtered = products;

  if (activeCategory !== "all") {
    filtered = filtered.filter(p => p.category === activeCategory);
  }

  if (subfilter !== "all") {
    filtered = filtered.filter(p => p.type === subfilter);
  }

  grid.innerHTML = "";

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px 0;">No products found / لا توجد منتجات</div>`;
    return;
  }

  filtered.forEach(p => {
    const isRtl = currentLanguage === "ar";
    const title = isRtl && p.title_ar ? p.title_ar : p.title;

    let typeLabel = isRtl ? 'جهاز' : 'Console';
    if (p.type === 'game') {
      typeLabel = isRtl ? 'لعبة / اشتراك' : 'Game / Subscription';
    } else if (p.type === 'accessory') {
      typeLabel = isRtl ? 'اكسسوارات' : 'Accessory';
    }

    const card = document.createElement("div");
    card.className = `product-card ${p.category}`;
    card.innerHTML = `
      <div class="product-img-wrapper">
        <span class="product-badge">${typeLabel}</span>
        <img class="product-img" src="${p.image || SVG_TEMPLATES.generic}" alt="${title}">
      </div>
      <div class="product-details">
        <span class="product-category">${p.category}</span>
        <h3 class="product-title">${title}</h3>
        <div class="product-footer">
          <span class="product-price">${formatPrice(p.price)}</span>
          <button class="add-cart-btn" onclick="addToCart('${p.id}')">
            <i class="fas fa-shopping-cart"></i>
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// فلاتر التبويبات في الصفحة الرئيسية
function filterCatalog(type, btn) {
  document.querySelectorAll(".filter-tab").forEach(tab => {
    tab.classList.remove("active");
  });
  btn.classList.add("active");

  renderProducts("all", type);
}

// فتح وإغلاق سلة المشتريات
function toggleCart() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-overlay");
  if (!drawer) return;

  drawer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// إضافة منتج إلى سلة المشتريات
function addToCart(productId) {
  loadLatestProducts();
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      title_ar: product.title_ar,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: 1
    });
  }

  saveState();
  renderCart();
  showToast(TRANSLATIONS[currentLanguage].toast_added, "success");
}

// تحديث كميات المنتجات داخل السلة
function updateCartQty(productId, change) {
  const item = cart.find(item => item.id === productId);
  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    cart = cart.filter(item => item.id !== productId);
  }

  saveState();
  renderCart();
}

// حذف منتج بالكامل من السلة
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveState();
  renderCart();
}

// رسم عناصر السلة وحساب الإجماليات
function renderCart() {
  const itemsContainer = document.getElementById("cart-items-container");
  const cartBadge = document.getElementById("cart-badge");
  const cartCountText = document.getElementById("cart-count-text");
  const cartTotalVal = document.getElementById("cart-total-value");

  if (!itemsContainer) return;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartBadge) {
    cartBadge.textContent = totalItems;
    cartBadge.style.display = totalItems > 0 ? "flex" : "none";
  }
  if (cartCountText) {
    cartCountText.textContent = `(${totalItems})`;
  }

  itemsContainer.innerHTML = "";

  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="cart-empty-message">
        <i class="fas fa-shopping-basket cart-empty-icon"></i>
        <p data-translate="cart_empty">${TRANSLATIONS[currentLanguage].cart_empty}</p>
      </div>
    `;
    if (cartTotalVal) cartTotalVal.textContent = formatPrice(0);
    return;
  }

  let grandTotal = 0;

  cart.forEach(item => {
    const isRtl = currentLanguage === "ar";
    const title = isRtl && item.title_ar ? item.title_ar : item.title;
    const itemTotal = item.price * item.quantity;
    grandTotal += itemTotal;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <div class="cart-item-img-wrapper">
        <img class="cart-item-img" src="${item.image || SVG_TEMPLATES.generic}" alt="${title}">
      </div>
      <div class="cart-item-details">
        <div class="cart-item-title">${title}</div>
        <div class="cart-item-controls">
          <div class="quantity-selector">
            <button class="qty-btn" onclick="updateCartQty('${item.id}', -1)">-</button>
            <span class="qty-val">${item.quantity}</span>
            <button class="qty-btn" onclick="updateCartQty('${item.id}', 1)">+</button>
          </div>
          <span class="cart-item-price">${formatPrice(itemTotal)}</span>
          <button class="remove-item-btn" onclick="removeFromCart('${item.id}')">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    `;
    itemsContainer.appendChild(div);
  });

  if (cartTotalVal) {
    cartTotalVal.textContent = formatPrice(grandTotal);
  }
}

// عرض وإخفاء نافذة إتمام الطلب
function showCheckoutModal() {
  if (cart.length === 0) {
    showToast(TRANSLATIONS[currentLanguage].toast_checkout_empty, "error");
    return;
  }

  toggleCart();

  const modal = document.getElementById("checkout-modal");
  if (modal) modal.classList.add("active");
}

function closeCheckoutModal() {
  const modal = document.getElementById("checkout-modal");
  if (modal) modal.classList.remove("active");

  document.getElementById("checkout-form").reset();
}

// إنشاء رسالة الواتساب المنسقة
function getWhatsAppMessage(order) {
  const isAr = currentLanguage === "ar";
  let msg = "";
  if (isAr) {
    msg += `*طلب جديد من متجر كونسول جيمز* 🎮\n\n`;
    msg += `*رقم الطلب:* ${order.id}\n`;
    msg += `*التاريخ:* ${order.date}\n\n`;
    msg += `*معلومات المشتري:*\n`;
    msg += `- *الاسم الكامل:* ${order.customer.name} ${order.customer.surname}\n`;
    msg += `- *الهاتف:* ${order.customer.phone}\n`;
    msg += `- *الولاية:* ${order.customer.state}\n\n`;
    msg += `*المنتجات المطلوبة:*\n`;
    order.items.forEach(item => {
      const title = item.title_ar ? item.title_ar : item.title;
      msg += `- ${title} [الكمية: ${item.quantity}] (${formatPrice(item.price * item.quantity)})\n`;
    });
    msg += `\n*المجموع الإجمالي:* *${formatPrice(order.total)}*`;
  } else {
    msg += `*New Order from Console Games* 🎮\n\n`;
    msg += `*Order ID:* ${order.id}\n`;
    msg += `*Date:* ${order.date}\n\n`;
    msg += `*Customer Info:*\n`;
    msg += `- *Full Name:* ${order.customer.name} ${order.customer.surname}\n`;
    msg += `- *Phone:* ${order.customer.phone}\n`;
    msg += `- *State/Wilaya:* ${order.customer.state}\n\n`;
    msg += `*Items Ordered:*\n`;
    order.items.forEach(item => {
      msg += `- ${item.title} [Qty: ${item.quantity}] (${formatPrice(item.price * item.quantity)})\n`;
    });
    msg += `\n*Grand Total:* *${formatPrice(order.total)}*`;
  }
  return encodeURIComponent(msg);
}

// تقديم وتأكيد الطلب ثم التوجيه للواتساب
function submitCheckout(event) {
  event.preventDefault();

  const name = document.getElementById("checkout-name").value.trim();
  const surname = document.getElementById("checkout-surname").value.trim();
  const phone = document.getElementById("checkout-phone").value.trim();
  const state = document.getElementById("checkout-state").value;

  if (!name || !surname || !phone || !state) {
    showToast(TRANSLATIONS[currentLanguage].toast_fill_all, "error");
    return;
  }

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // بناء كائن الطلب المخصص
  const order = {
    id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
    date: new Date().toLocaleString(currentLanguage === "ar" ? "ar-DZ" : "en-US"),
    customer: {
      name,
      surname,
      phone,
      state
    },
    items: [...cart],
    total: totalAmount,
    status: "pending"
  };

  // إضافته للوحة تحكم البائع محلياً
  orders.push(order);

  // تفريغ سلة المشتريات
  cart = [];

  // حفظ الحالة
  saveState();
  renderCart();

  // إغلاق النافذة
  closeCheckoutModal();

  // عرض إشعار النجاح
  showToast(TRANSLATIONS[currentLanguage].toast_checkout_success, "success");

  // التوجيه تلقائياً إلى واتساب البائع المخصص في الإعدادات
  const sellerPhone = localStorage.getItem("console_store_whatsapp_phone") || "213555123456";
  const whatsappMsg = getWhatsAppMessage(order);
  const whatsappUrl = `https://wa.me/${sellerPhone}?text=${whatsappMsg}`;

  setTimeout(() => {
    window.open(whatsappUrl, "_blank");
  }, 1500);
}

// مصادقة الدخول لبوابة البائع
function checkSellerAuth(event) {
  event.preventDefault();
  const pass = document.getElementById("seller-passcode").value;

  if (pass === "1234") {
    sessionStorage.setItem("seller_authenticated", "true");
    document.getElementById("seller-passcode").value = "";

    document.getElementById("seller-auth-panel").style.display = "none";
    document.getElementById("seller-dashboard-panel").style.display = "block";

    renderSellerDashboard();
    showToast(TRANSLATIONS[currentLanguage].toast_auth_success, "success");
  } else {
    showToast(TRANSLATIONS[currentLanguage].toast_auth_error, "error");
  }
}

// تسجيل الخروج من لوحة التحكم
function logoutSeller() {
  sessionStorage.removeItem("seller_authenticated");
  navigate("home");
}

// التبديل بين علامات تبويب البائع
function switchSellerTab(tabName) {
  sellerTab = tabName;

  document.querySelectorAll(".seller-menu-item").forEach(item => {
    item.classList.remove("active");
  });

  const activeItem = document.querySelector(`.seller-menu-item[onclick*="${tabName}"]`);
  if (activeItem) activeItem.classList.add("active");

  document.querySelectorAll(".seller-tab-content").forEach(tab => {
    tab.classList.remove("active");
  });

  const targetTab = document.getElementById(`seller-tab-${tabName}`);
  if (targetTab) targetTab.classList.add("active");

  renderSellerDashboard();
}

// عرض محتويات لوحة تحكم البائع
function renderSellerDashboard() {
  const isAuth = sessionStorage.getItem("seller_authenticated") === "true";
  if (!isAuth) return;

  const isRtl = currentLanguage === "ar";

  if (sellerTab === "orders") {
    const container = document.getElementById("seller-orders-container");
    if (!container) return;

    container.innerHTML = "";

    if (orders.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; color: var(--text-muted); padding: 40px 0;">
          <p data-translate="order_empty">${TRANSLATIONS[currentLanguage].order_empty}</p>
        </div>
      `;
      return;
    }

    // عرض الطلبات تنازلياً (الجديد أولاً)
    [...orders].reverse().forEach(order => {
      const card = document.createElement("div");
      card.className = "order-card";

      let itemsRows = "";
      order.items.forEach(item => {
        const itemTitle = isRtl && item.title_ar ? item.title_ar : item.title;
        itemsRows += `
          <tr>
            <td>${itemTitle}</td>
            <td>x${item.quantity}</td>
            <td class="price">${formatPrice(item.price)}</td>
          </tr>
        `;
      });

      card.innerHTML = `
        <div class="order-card-header">
          <div>
            <span class="order-id">${order.id}</span>
            <div class="order-date">${order.date}</div>
          </div>
          <button class="btn-outline-danger" onclick="deleteOrder('${order.id}')" data-translate="order_delete">
            ${TRANSLATIONS[currentLanguage].order_delete}
          </button>
        </div>
        <div class="order-details-grid">
          <div class="order-info-block">
            <h4 data-translate="order_col_cust">${TRANSLATIONS[currentLanguage].order_col_cust}</h4>
            <p>${order.customer.name} ${order.customer.surname}</p>
          </div>
          <div class="order-info-block">
            <h4 data-translate="order_col_phone">${TRANSLATIONS[currentLanguage].order_col_phone}</h4>
            <p><a href="tel:${order.customer.phone}" style="color: var(--neon-purple); text-decoration: underline;">${order.customer.phone}</a></p>
          </div>
          <div class="order-info-block">
            <h4 data-translate="order_col_state">${TRANSLATIONS[currentLanguage].order_col_state}</h4>
            <p>${order.customer.state}</p>
          </div>
        </div>
        <table class="order-items-table">
          <thead>
            <tr>
              <th data-translate="order_col_items">${TRANSLATIONS[currentLanguage].order_col_items}</th>
              <th>الكمية / Qty</th>
              <th data-translate="order_col_total">${TRANSLATIONS[currentLanguage].order_col_total}</th>
            </tr>
          </thead>
          <tbody>
            ${itemsRows}
          </tbody>
        </table>
        <div class="order-card-footer">
          <div class="order-total" data-translate="order_col_total">
            ${TRANSLATIONS[currentLanguage].order_col_total} <span>${formatPrice(order.total)}</span>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  } else if (sellerTab === "catalog") {
    const tbody = document.getElementById("seller-catalog-tbody");
    if (!tbody) return;

    tbody.innerHTML = "";

    products.forEach(p => {
      const pTitle = isRtl && p.title_ar ? p.title_ar : p.title;
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><img class="catalog-img" src="${p.image || SVG_TEMPLATES.generic}" alt=""></td>
        <td class="catalog-title">${pTitle}</td>
        <td><span class="catalog-console-badge ${p.category}">${p.category}</span></td>
        <td class="catalog-price">${formatPrice(p.price)}</td>
        <td>
          <button class="btn-outline-danger" onclick="deleteProduct('${p.id}')">
            <i class="fas fa-trash-alt"></i>
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } else if (sellerTab === "settings") {
    populateSellerSettings();
  }
}

// عرض وإخفاء نموذج إضافة المنتجات
function showAddProductModal() {
  const modal = document.getElementById("add-product-modal");
  if (modal) modal.classList.add("active");
}

function closeAddProductModal() {
  const modal = document.getElementById("add-product-modal");
  if (modal) modal.classList.remove("active");

  document.getElementById("add-product-form").reset();
  uploadedProductImage = "";

  document.getElementById("img-upload-placeholder").style.display = "flex";
  document.getElementById("img-upload-preview").style.display = "none";
}

// إعداد مستمع رفع صور المنتجات وتحويلها لـ Base64
function setupImageUpload() {
  const input = document.getElementById("prod-image-file");
  if (!input) return;

  input.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (evt) {
      uploadedProductImage = evt.target.result;

      document.getElementById("img-upload-placeholder").style.display = "none";
      const previewDiv = document.getElementById("img-upload-preview");
      previewDiv.style.display = "block";
      previewDiv.querySelector("img").src = uploadedProductImage;
    };
    reader.readAsDataURL(file);
  });
}

function removeUploadedImage(event) {
  event.stopPropagation();
  event.preventDefault();
  uploadedProductImage = "";
  document.getElementById("prod-image-file").value = "";
  document.getElementById("img-upload-placeholder").style.display = "flex";
  document.getElementById("img-upload-preview").style.display = "none";
}

// حفظ المنتج الجديد في الكتالوج وتخزينه محلياً
function saveProduct(event) {
  event.preventDefault();

  const title_en = document.getElementById("prod-name-en").value.trim();
  const title_ar = document.getElementById("prod-name-ar").value.trim();
  const price = parseFloat(document.getElementById("prod-price").value);
  const category = document.getElementById("prod-category").value;
  const type = document.getElementById("prod-type").value;
  const desc = document.getElementById("prod-desc").value.trim();

  if (!title_en || !title_ar || isNaN(price) || !category || !type) {
    showToast(TRANSLATIONS[currentLanguage].toast_fill_all, "error");
    return;
  }

  let finalImage = uploadedProductImage;
  if (!finalImage) {
    const templateKey = `${category}_${type}`;
    finalImage = SVG_TEMPLATES[templateKey] || SVG_TEMPLATES.generic;
  }

  const newProduct = {
    id: "prod-" + Date.now(),
    title: title_en,
    title_ar: title_ar,
    price,
    category,
    type,
    image: finalImage,
    description: desc
  };

  products.push(newProduct);
  saveState();

  closeAddProductModal();
  renderProducts();
  renderSellerDashboard();

  showToast(TRANSLATIONS[currentLanguage].toast_product_added, "success");
}

// حذف منتج من الكتالوج
function deleteProduct(id) {
  if (confirm("هل أنت متأكد من حذف هذا المنتج؟ / Delete this product?")) {
    products = products.filter(p => p.id !== id);
    saveState();

    renderProducts();
    renderSellerDashboard();

    showToast(TRANSLATIONS[currentLanguage].toast_product_deleted, "success");
  }
}

// حذف طلبية من قائمة الإدارة
function deleteOrder(orderId) {
  if (confirm("هل أنت متأكد من حذف هذا الطلب؟ / Delete this order?")) {
    orders = orders.filter(o => o.id !== orderId);
    saveState();

    renderSellerDashboard();
    showToast(TRANSLATIONS[currentLanguage].toast_order_deleted, "success");
  }
}

// إعداد مستمع رفع شعار الموقع المخصص
function setupLogoUpload() {
  const input = document.getElementById("seller-logo-file");
  if (!input) return;

  input.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (evt) {
      uploadedLogoImage = evt.target.result;

      document.getElementById("logo-upload-placeholder").style.display = "none";
      const previewDiv = document.getElementById("logo-upload-preview");
      previewDiv.style.display = "block";
      previewDiv.querySelector("img").src = uploadedLogoImage;
    };
    reader.readAsDataURL(file);
  });
}

function removeLogoPreview(event) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }
  uploadedLogoImage = "";
  const input = document.getElementById("seller-logo-file");
  if (input) input.value = "";
  document.getElementById("logo-upload-placeholder").style.display = "flex";
  document.getElementById("logo-upload-preview").style.display = "none";
}

// التحكم بإظهار/إخفاء حقل رفع الصورة عند تبديل نوع الشعار
function toggleLogoTypeInput() {
  const customRadio = document.getElementById("logo-type-custom");
  const wrapper = document.getElementById("logo-image-upload-wrapper");
  if (customRadio && wrapper) {
    wrapper.style.display = customRadio.checked ? "flex" : "none";
  }
}

// تعبئة البيانات المحفوظة في حقول إعدادات البائع
function populateSellerSettings() {
  const whatsapp = localStorage.getItem("console_store_whatsapp_phone") || "213555123456";
  const whatsappInput = document.getElementById("seller-whatsapp-phone");
  if (whatsappInput) whatsappInput.value = whatsapp;

  const logoType = localStorage.getItem("console_store_logo_type") || "default";
  const defaultRadio = document.getElementById("logo-type-default");
  const customRadio = document.getElementById("logo-type-custom");

  if (logoType === "custom") {
    if (customRadio) customRadio.checked = true;
    uploadedLogoImage = localStorage.getItem("console_store_logo_custom") || "";
    if (uploadedLogoImage) {
      document.getElementById("logo-upload-placeholder").style.display = "none";
      const previewDiv = document.getElementById("logo-upload-preview");
      previewDiv.style.display = "block";
      previewDiv.querySelector("img").src = uploadedLogoImage;
    }
  } else {
    if (defaultRadio) defaultRadio.checked = true;
    removeLogoPreview();
  }
  toggleLogoTypeInput();
}

// حفظ إعدادات البائع (الشعار ورقم الواتساب) في التخزين المحلي
function saveSellerSettings(event) {
  event.preventDefault();

  const whatsapp = document.getElementById("seller-whatsapp-phone").value.trim();
  const logoType = document.querySelector('input[name="logo-type"]:checked').value;

  if (!whatsapp) {
    showToast(TRANSLATIONS[currentLanguage].toast_fill_all, "error");
    return;
  }

  localStorage.setItem("console_store_whatsapp_phone", whatsapp);
  localStorage.setItem("console_store_logo_type", logoType);

  if (logoType === "custom") {
    if (uploadedLogoImage) {
      localStorage.setItem("console_store_logo_custom", uploadedLogoImage);
    } else {
      showToast(currentLanguage === "ar" ? "الرجاء رفع صورة الشعار أولاً!" : "Please upload a logo image first!", "error");
      return;
    }
  } else {
    localStorage.removeItem("console_store_logo_custom");
  }

  renderLogo();
  showToast(currentLanguage === "ar" ? "تم حفظ الإعدادات بنجاح!" : "Settings saved successfully!", "success");
}

// رسم وعرض الشعار (المخصص أو الافتراضي) في مكانه المناسب
function renderLogo() {
  const logoType = localStorage.getItem("console_store_logo_type") || "default";
  const customLogo = localStorage.getItem("console_store_logo_custom");
  const headerLogoContent = document.getElementById("logo-content");
  const footerLogoContent = document.getElementById("footer-logo-content");

  if (logoType === "custom" && customLogo) {
    const imgHtml = `<img src="${customLogo}" alt="Logo">`;
    if (headerLogoContent) headerLogoContent.innerHTML = imgHtml;
    if (footerLogoContent) footerLogoContent.innerHTML = imgHtml;
  } else {
    const arStore = TRANSLATIONS[currentLanguage].logo_store || "كونسول";
    const arHub = TRANSLATIONS[currentLanguage].logo_hub || "جيمز";
    const html = `<i class="fas fa-gamepad"></i> <span data-translate="logo_store">${arStore}</span><span style="color: var(--neon-cyan);" data-translate="logo_hub">${arHub}</span>`;
    if (headerLogoContent) headerLogoContent.innerHTML = html;
    if (footerLogoContent) footerLogoContent.innerHTML = html;
  }
}

// نظام إشعارات التنبيه (Toast)
function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "slideInLeft 0.3s reverse forwards";
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4000);
}

// تبديل قائمة الموبايل عند الضغط على زر الهمبرغر
function toggleMobileMenu() {
  const nav = document.querySelector("nav");
  if (nav) {
    nav.classList.toggle("mobile-active");
  }
}
