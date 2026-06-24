// ============================================================
// ملف جافا سكريبت مستقل لصفحة بوابة البائع (seller.html)
// يقرأ البيانات من localStorage المشترك مع متجر العملاء
// ============================================================

// قوالب SVG الافتراضية للمنتجات
const SVG_TEMPLATES = {
  playstation_console: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="%2307080d"/><g transform="translate(140, 60) scale(0.9)"><path d="M40 0 L0 30 L40 280 L70 280 L90 30 Z" fill="%23c0cad6"/><path d="M80 0 L120 30 L80 280 L50 280 L30 30 Z" fill="%23c0cad6"/><rect x="55" y="80" width="10" height="150" fill="%230043e0"/></g></svg>`,
  xbox_console: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="%2307080d"/><rect x="150" y="80" width="100" height="240" rx="10" fill="%231a1a1a" stroke="%23333" stroke-width="2"/><circle cx="200" cy="200" r="12" fill="%2339ff14"/></svg>`,
  nintendo_console: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="%2307080d"/><rect x="130" y="140" width="140" height="100" rx="10" fill="%231e1e1e" stroke="%23333"/><rect x="90" y="130" width="30" height="120" rx="5" fill="%23e60012"/><rect x="280" y="130" width="30" height="120" rx="5" fill="%2300a0e9"/></svg>`,
  generic: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="%2307080d"/><circle cx="200" cy="200" r="100" fill="none" stroke="%2300f0ff" stroke-width="4"/><path d="M150 200 L250 200 M200 150 L200 250" stroke="%238a2be2" stroke-width="4"/></svg>`
};

// ============================================================
// متغيرات الحالة
// ============================================================
let products = [];      // قائمة المنتجات
let orders = [];        // قائمة الطلبيات
let sellers = [];       // قائمة حسابات البائعين
let currentTab = 'orders';  // التبويب النشط
let uploadedProductImage = '';  // صورة المنتج المرفوعة
let uploadedLogoImage = '';     // صورة الشعار المرفوعة

// ============================================================
// تهيئة الصفحة عند التحميل
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // تحميل البيانات من التخزين المحلي المشترك
  loadData();

  // التحقق من حالة الجلسة (هل البائع مسجل دخوله مسبقاً؟)
  const isAuth = sessionStorage.getItem('seller_authenticated') === 'true';
  if (isAuth) {
    showDashboard();
  } else {
    // تحديد الوضع الافتراضي: إنشاء حساب جديد أم تسجيل دخول؟
    showLoginScreen(sellers.length > 0 ? 'login' : 'register');
  }

  // إعداد مستمعي الأحداث
  setupImageUpload();
  setupLogoUpload();

  // تحديث التاريخ والوقت في شريط التحكم
  updateDateTime();
  setInterval(updateDateTime, 60000);

  // عرض الشعار في هيدر صفحة البائع
  renderSellerPageLogo();
});

// ============================================================
// تحميل وحفظ البيانات من التخزين المحلي
// ============================================================
function loadData() {
  // البيانات المشتركة مع صفحة المتجر الرئيسية
  const DEFAULT_PRODUCTS = getDefaultProducts();
  products = JSON.parse(localStorage.getItem('console_store_products')) || DEFAULT_PRODUCTS;
  orders   = JSON.parse(localStorage.getItem('console_store_orders'))   || [];
  
  // تحميل حسابات البائعين والمرحلة الانتقالية للمصادقة المتعددة
  sellers = JSON.parse(localStorage.getItem('console_store_sellers')) || [];
  
  // الهجرة من الحساب الفردي القديم إن وجد
  const oldWa = localStorage.getItem('seller_account_whatsapp');
  const oldPass = localStorage.getItem('seller_account_password');
  if (oldWa && oldPass && sellers.length === 0) {
    sellers.push({
      whatsapp: oldWa,
      password: oldPass,
      status: 'approved',
      isFirst: true,
      registrationDate: new Date().toLocaleDateString('ar-DZ')
    });
    localStorage.setItem('console_store_sellers', JSON.stringify(sellers));
  }
}

function saveData() {
  localStorage.setItem('console_store_products', JSON.stringify(products));
  localStorage.setItem('console_store_orders',   JSON.stringify(orders));
  localStorage.setItem('console_store_sellers',  JSON.stringify(sellers));
}

// ============================================================
// نظام المصادقة: إنشاء حساب + تسجيل دخول بالواتساب
// ============================================================

/**
 * التبديل بين وضع الدخول ووضع إنشاء الحساب
 */
function showAuthMode(mode) {
  const registerForm = document.getElementById('register-form');
  const loginForm    = document.getElementById('login-form');
  const loginBtn     = document.getElementById('tab-login-btn');
  const registerBtn  = document.getElementById('tab-register-btn');
  const title        = document.getElementById('auth-card-title');
  const subtitle     = document.getElementById('auth-card-subtitle');

  if (mode === 'login') {
    // وضع تسجيل الدخول
    registerForm.style.display = 'none';
    loginForm.style.display    = 'block';
    loginBtn.classList.add('active');
    registerBtn.classList.remove('active');
    title.textContent    = 'تسجيل الدخول';
    subtitle.textContent = 'أدخل رقم واتساب حسابك وكلمة المرور';

    // إذا كان هناك حساب محفوظ، اعرض رقمه
    const savedWa = localStorage.getItem('seller_last_logged_in_wa') || localStorage.getItem('seller_account_whatsapp') || (sellers.length > 0 ? sellers[0].whatsapp : '');
    const strip   = document.getElementById('linked-account-strip');
    const waNum   = document.getElementById('linked-wa-number');
    if (savedWa && strip && waNum) {
      strip.style.display   = 'flex';
      waNum.textContent     = '+' + savedWa;
      // ملء الحقل تلقائياً بالرقم المحفوظ
      const loginWaInput = document.getElementById('login-whatsapp');
      if (loginWaInput) loginWaInput.value = savedWa;
    } else if (strip) {
      strip.style.display   = 'none';
    }
  } else {
    // وضع إنشاء حساب جديد
    registerForm.style.display = 'block';
    loginForm.style.display    = 'none';
    loginBtn.classList.remove('active');
    registerBtn.classList.add('active');
    title.textContent    = 'إنشاء حساب البائع';
    subtitle.textContent = 'أنشئ حسابك مرتبطاً برقم واتساب لاستقبال طلبياتك مباشرة';
  }
}

/**
 * إنشاء حساب جديد مرتبط بالواتساب
 */
function registerSeller(event) {
  event.preventDefault();

  const whatsapp = document.getElementById('reg-whatsapp').value.trim();
  const password = document.getElementById('reg-password').value;
  const confirm  = document.getElementById('reg-confirm').value;

  // التحقق من صحة رقم الواتساب
  if (!/^[0-9]{10,15}$/.test(whatsapp)) {
    shakeField('reg-whatsapp');
    showToast('رقم الواتساب غير صحيح! أدخل الأرقام فقط مع رمز الدولة.', 'error');
    return;
  }

  // التحقق من تطابق كلمتي المرور
  if (password !== confirm) {
    shakeField('reg-confirm');
    showToast('كلمتا المرور غير متطابقتين!', 'error');
    return;
  }

  if (password.length < 4) {
    shakeField('reg-password');
    showToast('كلمة المرور يجب أن تكون 4 أحرف على الأقل.', 'error');
    return;
  }

  loadData();

  // التحقق من تكرار الحساب
  if (sellers.some(s => s.whatsapp === whatsapp)) {
    shakeField('reg-whatsapp');
    showToast('رقم الواتساب هذا مسجل بالفعل لفرع آخر!', 'error');
    return;
  }

  const isFirst = sellers.length === 0;
  const newSeller = {
    whatsapp,
    password,
    status: isFirst ? 'approved' : 'pending',
    isFirst,
    registrationDate: new Date().toLocaleDateString('ar-DZ') + ' ' + new Date().toLocaleTimeString('ar-DZ', {hour: '2-digit', minute:'2-digit'})
  };

  sellers.push(newSeller);
  saveData();

  if (isFirst) {
    // الحفاظ على التوافقية القديمة للبائع الأول
    localStorage.setItem('seller_account_whatsapp', whatsapp);
    localStorage.setItem('seller_account_password', password);
    localStorage.setItem('console_store_whatsapp_phone', whatsapp);
    localStorage.setItem('seller_last_logged_in_wa', whatsapp);
    
    sessionStorage.setItem('seller_authenticated', 'true');
    sessionStorage.setItem('seller_current_user', whatsapp);
    
    showDashboard();
    showToast('🎉 تم إنشاء حساب البائع الأول والمسؤول بنجاح! ستصلك الطلبيات على واتساب +' + whatsapp, 'success');
  } else {
    showLoginScreen('login');
    showToast('تم تسجيل الحساب بنجاح! حسابك قيد الانتظار لموافقة البائع الأول قبل التمكن من الدخول. ⏳', 'info');
  }

  document.getElementById('register-form').reset();
}

/**
 * تسجيل الدخول بالواتساب وكلمة المرور
 */
function loginSeller(event) {
  event.preventDefault();

  const whatsapp = document.getElementById('login-whatsapp').value.trim();
  const password = document.getElementById('login-password').value;

  loadData();

  // التحقق من وجود حسابات مسجلة
  if (sellers.length === 0) {
    showToast('لا توجد حسابات مسجلة بعد. يرجى إنشاء الحساب الأول.', 'error');
    showAuthMode('register');
    return;
  }

  // البحث عن الحساب
  const seller = sellers.find(s => s.whatsapp === whatsapp);

  if (!seller) {
    shakeField('login-whatsapp');
    showToast('رقم الواتساب غير مطابق لأي حساب مسجل.', 'error');
    return;
  }

  // مطابقة كلمة المرور
  if (seller.password !== password) {
    shakeField('login-password');
    showToast('كلمة المرور خاطئة! حاول مجدداً.', 'error');
    return;
  }

  // التحقق من حالة القبول
  if (seller.status === 'pending') {
    showToast('حسابك قيد الانتظار لموافقة البائع الأول. ⏳', 'error');
    return;
  }

  // تسجيل الدخول بنجاح
  sessionStorage.setItem('seller_authenticated', 'true');
  sessionStorage.setItem('seller_current_user', whatsapp);
  localStorage.setItem('seller_last_logged_in_wa', whatsapp);
  
  // ربط رقم الواتساب تلقائياً لاستقبال الطلبيات للبائع الحالي النشط
  localStorage.setItem('console_store_whatsapp_phone', whatsapp);

  showDashboard();
  showToast('مرحباً! تم تسجيل الدخول بنجاح 👋', 'success');
}

/**
 * تسجيل الخروج من لوحة التحكم
 */
function logoutSeller() {
  if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
    sessionStorage.removeItem('seller_authenticated');
    showLoginScreen('login');
    showToast('تم تسجيل الخروج بنجاح.', 'info');
  }
}

/**
 * تأثير اهتزاز بصري عند الخطأ
 */
function shakeField(fieldId) {
  const el = document.getElementById(fieldId);
  if (!el) return;
  el.style.borderColor = '#ef4444';
  el.style.animation   = 'shake 0.4s ease';
  setTimeout(() => {
    el.style.borderColor = '';
    el.style.animation   = '';
  }, 500);
}

/**
 * تحديث شريط قوة كلمة المرور
 */
function updatePasswordStrength(val) {
  const bar = document.getElementById('pwd-strength-bar');
  if (!bar) return;

  let strength = 0;
  if (val.length >= 4) strength++;
  if (val.length >= 8) strength++;
  if (/[A-Z]/.test(val) || /[0-9]/.test(val)) strength++;
  if (/[!@#$%^&*]/.test(val)) strength++;

  const widths = ['0%', '30%', '55%', '80%', '100%'];
  const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#16a34a'];
  bar.style.width      = widths[strength];
  bar.style.background = colors[strength];
}

// ============================================================
// إدارة الشاشات (تسجيل دخول / لوحة التحكم)
// ============================================================
function showLoginScreen(mode = 'register') {
  document.getElementById('seller-login-screen').style.display = 'flex';
  document.getElementById('seller-dashboard').style.display   = 'none';
  // تحديد الوضع المطلوب (دخول أم تسجيل)
  showAuthMode(mode);
}

function showDashboard() {
  document.getElementById('seller-login-screen').style.display = 'none';
  document.getElementById('seller-dashboard').style.display   = 'block';
  loadData();

  const currentUserWa = sessionStorage.getItem('seller_current_user') || localStorage.getItem('seller_account_whatsapp');
  const waLabel  = document.getElementById('dash-whatsapp-label');
  const waBadge  = document.getElementById('dash-whatsapp-badge');
  if (waLabel && currentUserWa) {
    waLabel.textContent = '+' + currentUserWa;
    if (waBadge) waBadge.style.display = 'flex';
  }

  // إظهار أو إخفاء تبويب قبول البائعين للبائع الأول فقط
  const currentUser = sellers.find(s => s.whatsapp === currentUserWa);
  const approveMenu = document.getElementById('menu-approve-sellers');
  if (approveMenu) {
    if (currentUser && currentUser.isFirst) {
      approveMenu.style.display = 'flex';
      updatePendingSellersBadge();
    } else {
      approveMenu.style.display = 'none';
    }
  }

  renderStats();
  renderTab(currentTab);
}

function updatePendingSellersBadge() {
  const pendingCount = sellers.filter(s => s.status === 'pending').length;
  const badge = document.getElementById('pending-sellers-badge');
  if (badge) {
    badge.textContent = pendingCount;
    badge.style.display = pendingCount > 0 ? 'inline-block' : 'none';
  }
}

// ============================================================
// التبديل بين التبويبات
// ============================================================
function switchTab(tabName) {
  currentTab = tabName;

  // تحديث الشريط الجانبي
  document.querySelectorAll('.sidebar-menu-item').forEach(item => {
    item.classList.remove('active');
  });
  const activeItem = document.querySelector(`.sidebar-menu-item[onclick*="${tabName}"]`);
  if (activeItem) activeItem.classList.add('active');

  // إخفاء جميع التبويبات
  document.querySelectorAll('.tab-panel').forEach(panel => {
    panel.classList.remove('active');
  });

  // إظهار التبويب المطلوب
  const targetPanel = document.getElementById(`tab-${tabName}`);
  if (targetPanel) targetPanel.classList.add('active');

  // رسم محتوى التبويب
  renderTab(tabName);
}

function renderTab(tabName) {
  loadData();
  if (tabName === 'orders') {
    renderOrders();
  } else if (tabName === 'catalog') {
    renderCatalog();
  } else if (tabName === 'settings') {
    populateSettings();
  } else if (tabName === 'approve-sellers') {
    renderSellersList();
  }
  renderStats();
}

// ============================================================
// إحصائيات سريعة في أعلى اللوحة
// ============================================================
function renderStats() {
  const totalOrders    = orders.length;
  const totalProducts  = products.length;
  const totalRevenue   = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const pendingOrders  = orders.filter(o => o.status === 'pending').length;

  // تحديث شارات العداد في الشريط الجانبي
  const ob = document.getElementById('orders-count-badge');
  const pb = document.getElementById('products-count-badge');
  if (ob) ob.textContent = totalOrders;
  if (pb) pb.textContent = totalProducts;

  const grid = document.getElementById('stats-grid');
  if (!grid) return;

  grid.innerHTML = `
    <div class="stat-card">
      <div class="stat-icon purple"><i class="fas fa-receipt"></i></div>
      <div class="stat-info">
        <h3>${totalOrders}</h3>
        <p>إجمالي الطلبات</p>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon cyan"><i class="fas fa-cubes"></i></div>
      <div class="stat-info">
        <h3>${totalProducts}</h3>
        <p>المنتجات في الكتالوج</p>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon green"><i class="fas fa-money-bill-wave"></i></div>
      <div class="stat-info">
        <h3>${formatPrice(totalRevenue)}</h3>
        <p>إجمالي الإيرادات</p>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon pink"><i class="fas fa-clock"></i></div>
      <div class="stat-info">
        <h3>${pendingOrders}</h3>
        <p>طلبات قيد الانتظار</p>
      </div>
    </div>
  `;
}

// ============================================================
// تبويب الطلبات الواردة
// ============================================================
function renderOrders() {
  const container = document.getElementById('orders-container');
  if (!container) return;

  if (orders.length === 0) {
    container.innerHTML = `
      <div class="orders-empty">
        <i class="fas fa-inbox"></i>
        <h3>لا توجد طلبات بعد</h3>
        <p>ستظهر هنا الطلبيات الواردة من المتجر فور تأكيدها من الزبائن.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = '';

  // عرض الطلبات من الأحدث للأقدم
  [...orders].reverse().forEach(order => {
    const card = document.createElement('div');
    card.className = 'order-card';

    // بناء قائمة المنتجات المطلوبة
    const itemRows = order.items.map(item => `
      <div class="order-item-row">
        <span class="item-name">${item.title_ar || item.title}</span>
        <span class="item-qty">× ${item.quantity}</span>
        <span class="item-price">${formatPrice(item.price * item.quantity)}</span>
      </div>
    `).join('');

    const sellerPhone = localStorage.getItem('console_store_whatsapp_phone') || '213555123456';
    const waMsg = buildWhatsAppMessage(order);
    const waUrl = `https://wa.me/${sellerPhone}?text=${waMsg}`;

    card.innerHTML = `
      <div class="order-card-top">
        <div class="order-meta">
          <span class="order-num">${order.id}</span>
          <span class="order-time"><i class="fas fa-clock" style="margin-inline-end:4px;"></i>${order.date}</span>
        </div>
        <div style="display:flex; align-items:center; gap:10px;">
          <span class="order-status-badge">قيد الانتظار</span>
          <button class="btn-outline-danger" onclick="deleteOrder('${order.id}')" style="font-size:12px; padding:6px 12px;">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
      <div class="order-body">
        <div class="order-field">
          <label><i class="fas fa-user"></i> الزبون</label>
          <p>${order.customer.name} ${order.customer.surname}</p>
        </div>
        <div class="order-field">
          <label><i class="fas fa-phone"></i> الهاتف</label>
          <p><a href="tel:${order.customer.phone}">${order.customer.phone}</a></p>
        </div>
        <div class="order-field">
          <label><i class="fas fa-map-marker-alt"></i> الولاية</label>
          <p>${order.customer.state}</p>
        </div>
        <div class="order-field" style="align-self:center;">
          <a href="${waUrl}" target="_blank" class="btn-whatsapp">
            <i class="fab fa-whatsapp"></i> تواصل واتساب
          </a>
        </div>
      </div>
      <div class="order-items-section">
        <div class="order-items-list">${itemRows}</div>
      </div>
      <div class="order-footer">
        <div class="order-total-line">
          المجموع الكلي:<span>${formatPrice(order.total)}</span>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

// مسح جميع الطلبات
function clearAllOrders() {
  if (orders.length === 0) {
    showToast('لا توجد طلبات لمسحها.', 'info');
    return;
  }
  if (confirm('هل أنت متأكد من مسح جميع الطلبات؟ لا يمكن التراجع عن هذا الإجراء.')) {
    orders = [];
    saveData();
    renderOrders();
    renderStats();
    showToast('تم مسح جميع الطلبات.', 'success');
  }
}

// حذف طلبية محددة
function deleteOrder(orderId) {
  if (confirm('هل أنت متأكد من حذف هذه الطلبية؟')) {
    orders = orders.filter(o => o.id !== orderId);
    saveData();
    renderOrders();
    renderStats();
    showToast('تم حذف الطلبية بنجاح.', 'success');
  }
}

// ============================================================
// تبويب كتالوج المنتجات
// ============================================================
function renderCatalog(searchQuery = '') {
  const grid = document.getElementById('catalog-grid');
  if (!grid) return;

  const label = document.getElementById('products-total-label');

  let filtered = products;
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = products.filter(p =>
      (p.title || '').toLowerCase().includes(q) ||
      (p.title_ar || '').toLowerCase().includes(q)
    );
  }

  if (label) label.textContent = `${filtered.length} من ${products.length} منتج`;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; color:var(--text-muted); padding:50px 20px;">
        <i class="fas fa-search" style="font-size:40px; color:#e5e7eb; display:block; margin-bottom:12px;"></i>
        <p>لا توجد منتجات مطابقة للبحث.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = '';
  filtered.forEach(p => {
    const card = document.createElement('div');
    card.className = 'catalog-product-card';
    card.innerHTML = `
      <div class="catalog-card-img">
        <img src="${p.image || SVG_TEMPLATES.generic}" alt="${p.title_ar || p.title}" loading="lazy">
      </div>
      <div class="catalog-card-body">
        <h4>${p.title_ar || p.title}</h4>
        <div class="catalog-card-footer">
          <span class="catalog-card-price">${formatPrice(p.price)}</span>
          <span class="catalog-card-badge ${p.category}">${categoryLabel(p.category)}</span>
        </div>
        <button class="btn-outline-danger" onclick="deleteProduct('${p.id}')"
          style="margin-top:10px; width:100%; font-size:12px; padding:7px; justify-content:center;">
          <i class="fas fa-trash-alt"></i> حذف المنتج
        </button>
      </div>
    `;
    grid.appendChild(card);
  });
}

// البحث في الكتالوج
function filterCatalogSearch(query) {
  renderCatalog(query);
}

// تسمية الفئة بالعربية
function categoryLabel(cat) {
  const labels = {
    playstation: 'PlayStation',
    xbox: 'Xbox',
    nintendo: 'Nintendo',
    games_subs: 'ألعاب واشتراكات',
    accessories: 'اكسسوارات'
  };
  return labels[cat] || cat;
}

// ============================================================
// إضافة منتج جديد
// ============================================================
function showAddProductModal() {
  const modal = document.getElementById('add-product-modal');
  if (modal) modal.classList.add('active');
}

function closeAddProductModal() {
  const modal = document.getElementById('add-product-modal');
  if (modal) modal.classList.remove('active');

  document.getElementById('add-product-form').reset();
  uploadedProductImage = '';

  // إعادة ضبط واجهة رفع الصور
  const previewDiv = document.getElementById('img-upload-preview');
  const dropZone   = document.getElementById('img-drop-zone');
  const actionBtns = document.getElementById('upload-action-btns');
  const galleryInput = document.getElementById('prod-image-file');
  const cameraInput  = document.getElementById('prod-image-camera');

  if (previewDiv) previewDiv.style.display = 'none';
  if (dropZone)   dropZone.style.display   = '';
  if (actionBtns) actionBtns.style.opacity  = '1';
  if (galleryInput) galleryInput.value = '';
  if (cameraInput)  cameraInput.value  = '';
}

function saveProduct(event) {
  event.preventDefault();

  const title_en = document.getElementById('prod-name-en').value.trim();
  const title_ar = document.getElementById('prod-name-ar').value.trim();
  const price    = parseFloat(document.getElementById('prod-price').value);
  const category = document.getElementById('prod-category').value;
  const type     = document.getElementById('prod-type').value;
  const desc     = document.getElementById('prod-desc').value.trim();

  if (!title_en || !title_ar || isNaN(price) || !category || !type) {
    showToast('يرجى ملء جميع الحقول المطلوبة!', 'error');
    return;
  }

  // اختيار الصورة: المرفوعة أو القالب الافتراضي
  let finalImage = uploadedProductImage;
  if (!finalImage) {
    const key = `${category}_${type === 'console' ? 'console' : type === 'game' ? 'game' : 'console'}`;
    finalImage = SVG_TEMPLATES[key] || SVG_TEMPLATES.generic;
  }

  const newProduct = {
    id: 'prod-' + Date.now(),
    title: title_en,
    title_ar,
    price,
    category,
    type,
    image: finalImage,
    description: desc
  };

  products.push(newProduct);
  saveData();

  closeAddProductModal();
  renderCatalog();
  renderStats();
  showToast('تمت إضافة المنتج بنجاح إلى الكتالوج! ✅', 'success');
}

// حذف منتج من الكتالوج
function deleteProduct(id) {
  if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
    products = products.filter(p => p.id !== id);
    saveData();
    renderCatalog();
    renderStats();
    showToast('تم حذف المنتج بنجاح.', 'success');
  }
}

// ============================================================
// رفع صور المنتجات
// ============================================================
function setupImageUpload() {
  // ==== كل العناصر المطلوبة ====
  const galleryInput = document.getElementById('prod-image-file');
  const cameraInput  = document.getElementById('prod-image-camera');
  const dropZone     = document.getElementById('img-drop-zone');
  const previewDiv   = document.getElementById('img-upload-preview');
  const previewImg   = document.getElementById('img-preview-img');
  const previewName  = document.getElementById('img-preview-name');
  const actionBtns   = document.getElementById('upload-action-btns');

  // ==== دالة مشتركة: قراءة الملف وعرض المعاينة ====
  function handleFile(file) {
    if (!file) return;

    // التحقق من الحجم (أقصاه 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showToast('حجم الصورة كبير جداً! الحد الأقصى 5MB.', 'error');
      return;
    }

    // التحقق من النوع - مرن (بعض الأجهزة ترسل MIME فارغ)
    const isImage = file.type.startsWith('image/') || file.name.match(/\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i);
    if (!isImage) {
      showToast('الرجاء اختيار ملف صورة (JPG، PNG، WEBP...)', 'error');
      return;
    }

    try {
      const reader = new FileReader();
      reader.onerror = () => showToast('فشل قراءة الملف. حاول مجدداً.', 'error');
      reader.onload = (e) => {
        uploadedProductImage = e.target.result;

        // عرض المعاينة
        if (previewImg)  previewImg.src = uploadedProductImage;
        if (previewName) previewName.textContent = file.name || 'صورة محددة';
        if (previewDiv)  previewDiv.style.display = 'block';

        // إخفاء منطقة السحب وتخفيف الأزرار
        if (dropZone)   dropZone.style.display  = 'none';
        if (actionBtns) actionBtns.style.opacity = '0.5';

        showToast('✅ تم تحميل الصورة بنجاح!', 'success');
      };
      reader.readAsDataURL(file);
    } catch (err) {
      showToast('حدث خطأ أثناء معالجة الصورة. حاول مرة أخرى.', 'error');
    }
  }

  // ==== ربط مدخل المعرض ====
  if (galleryInput) {
    galleryInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) handleFile(e.target.files[0]);
    });
  }

  // ==== ربط مدخل الكاميرا ====
  if (cameraInput) {
    cameraInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) handleFile(e.target.files[0]);
    });
  }

  // ==== منطقة السحب والإفلات ====
  if (dropZone) {
    dropZone.style.cursor = 'pointer';

    dropZone.addEventListener('click', () => {
      if (galleryInput) galleryInput.click();
    });

    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', (e) => {
      e.stopPropagation();
      dropZone.classList.remove('drag-over');
    });

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.remove('drag-over');
      const files = e.dataTransfer.files;
      if (files.length > 0) handleFile(files[0]);
    });
  }
}

function removeUploadedImage(event) {
  if (event) { event.stopPropagation(); event.preventDefault(); }
  uploadedProductImage = '';

  // إعادة ضبط المدخلات
  const galleryInput = document.getElementById('prod-image-file');
  const cameraInput  = document.getElementById('prod-image-camera');
  if (galleryInput) galleryInput.value = '';
  if (cameraInput)  cameraInput.value  = '';

  // إخفاء المعاينة وإظهار منطقة الرفع مجدداً
  const previewDiv = document.getElementById('img-upload-preview');
  const dropZone   = document.getElementById('img-drop-zone');
  const actionBtns = document.getElementById('upload-action-btns');

  if (previewDiv) previewDiv.style.display = 'none';
  if (dropZone)   dropZone.style.display   = '';
  if (actionBtns) actionBtns.style.opacity  = '1';
}

// ============================================================
// تبويب الإعدادات
// ============================================================
function populateSettings() {
  // تعبئة رقم الواتساب المحفوظ
  const whatsapp = localStorage.getItem('console_store_whatsapp_phone') || '';
  const wpInput = document.getElementById('seller-whatsapp-phone');
  if (wpInput) wpInput.value = whatsapp;

  // تعبئة إعداد الشعار
  const logoType = localStorage.getItem('console_store_logo_type') || 'default';
  const defaultRadio = document.getElementById('logo-type-default');
  const customRadio  = document.getElementById('logo-type-custom');

  if (logoType === 'custom') {
    if (customRadio) customRadio.checked = true;
    uploadedLogoImage = localStorage.getItem('console_store_logo_custom') || '';
    if (uploadedLogoImage) {
      document.getElementById('logo-upload-placeholder').style.display = 'none';
      const previewDiv = document.getElementById('logo-upload-preview');
      previewDiv.style.display = 'block';
      previewDiv.querySelector('img').src = uploadedLogoImage;
    }
  } else {
    if (defaultRadio) defaultRadio.checked = true;
  }
  toggleLogoTypeInput();
}

function saveSellerSettings(event) {
  event.preventDefault();

  const whatsapp   = document.getElementById('seller-whatsapp-phone').value.trim();
  const logoTypeEl = document.querySelector('input[name="logo-type"]:checked');
  const logoType   = logoTypeEl ? logoTypeEl.value : 'default';

  const currentUserWa = sessionStorage.getItem('seller_current_user');
  loadData();
  const currentSeller = sellers.find(s => s.whatsapp === currentUserWa);

  if (whatsapp && whatsapp !== currentUserWa) {
    // التحقق من أن الرقم الجديد غير مستخدم من حساب آخر
    if (sellers.some(s => s.whatsapp === whatsapp && s.whatsapp !== currentUserWa)) {
      showToast('رقم الواتساب الجديد مستخدم بالفعل من قبل حساب بائع آخر!', 'error');
      return;
    }
    
    if (currentSeller) {
      currentSeller.whatsapp = whatsapp;
      sessionStorage.setItem('seller_current_user', whatsapp);
    }
    localStorage.setItem('console_store_whatsapp_phone', whatsapp);
    
    if (currentSeller && currentSeller.isFirst) {
      localStorage.setItem('seller_account_whatsapp', whatsapp);
    }

    const waLabel = document.getElementById('dash-whatsapp-label');
    const waBadge = document.getElementById('dash-whatsapp-badge');
    if (waLabel) waLabel.textContent = '+' + whatsapp;
    if (waBadge) waBadge.style.display = 'flex';
  }

  // حفظ الشعار
  localStorage.setItem('console_store_logo_type', logoType);

  if (logoType === 'custom') {
    if (uploadedLogoImage) {
      localStorage.setItem('console_store_logo_custom', uploadedLogoImage);
    } else {
      showToast('الرجاء رفع صورة الشعار أولاً!', 'error');
      return;
    }
  } else {
    localStorage.removeItem('console_store_logo_custom');
  }

  // تحديث كلمة المرور إن وجدت
  const newPass     = document.getElementById('new-passcode').value;
  const confirmPass = document.getElementById('confirm-passcode').value;

  if (newPass || confirmPass) {
    if (newPass !== confirmPass) {
      showToast('كلمتا المرور غير متطابقتين!', 'error');
      return;
    }
    if (newPass.length < 4) {
      showToast('كلمة المرور يجب أن تكون 4 أحرف على الأقل.', 'error');
      return;
    }
    if (currentSeller) {
      currentSeller.password = newPass;
    }
    if (currentSeller && currentSeller.isFirst) {
      localStorage.setItem('seller_account_password', newPass);
    }
    document.getElementById('new-passcode').value = '';
    document.getElementById('confirm-passcode').value = '';
  }

  saveData();
  renderSellerPageLogo();
  showToast('تم حفظ الإعدادات بنجاح! ✅', 'success');
}

// ============================================================
// إدارة رفع شعار الموقع
// ============================================================
function setupLogoUpload() {
  const input = document.getElementById('seller-logo-file');
  if (!input) return;

  input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      uploadedLogoImage = evt.target.result;
      document.getElementById('logo-upload-placeholder').style.display = 'none';
      const previewDiv = document.getElementById('logo-upload-preview');
      previewDiv.style.display = 'block';
      previewDiv.querySelector('img').src = uploadedLogoImage;
    };
    reader.readAsDataURL(file);
  });

  const wrapper = document.getElementById('logo-image-upload-wrapper');
  if (wrapper) {
    wrapper.addEventListener('click', () => input.click());
  }
}

function removeLogoPreview(event) {
  if (event) { event.stopPropagation(); event.preventDefault(); }
  uploadedLogoImage = '';
  const input = document.getElementById('seller-logo-file');
  if (input) input.value = '';
  document.getElementById('logo-upload-placeholder').style.display = 'flex';
  document.getElementById('logo-upload-preview').style.display = 'none';
}

function toggleLogoTypeInput() {
  const customRadio = document.getElementById('logo-type-custom');
  const wrapper = document.getElementById('logo-image-upload-wrapper');
  if (customRadio && wrapper) {
    wrapper.style.display = customRadio.checked ? 'flex' : 'none';
  }
}

// رسم شعار الموقع في هيدر صفحة البائع
function renderSellerPageLogo() {
  const logoType   = localStorage.getItem('console_store_logo_type') || 'default';
  const customLogo = localStorage.getItem('console_store_logo_custom');
  const logoEl     = document.getElementById('seller-logo-content');
  if (!logoEl) return;

  if (logoType === 'custom' && customLogo) {
    logoEl.innerHTML = `<img src="${customLogo}" alt="شعار المتجر" style="height:40px; object-fit:contain;">`;
  } else {
    logoEl.innerHTML = `<i class="fas fa-gamepad"></i> <span>كونسول</span><span style="color:var(--neon-cyan);">جيمز</span>`;
  }
}

// ============================================================
// بناء رسالة واتساب للطلب
// ============================================================
function buildWhatsAppMessage(order) {
  let msg = `*طلب جديد من متجر كونسول جيمز* 🎮\n\n`;
  msg += `*رقم الطلب:* ${order.id}\n`;
  msg += `*التاريخ:* ${order.date}\n\n`;
  msg += `*معلومات الزبون:*\n`;
  msg += `- *الاسم:* ${order.customer.name} ${order.customer.surname}\n`;
  msg += `- *الهاتف:* ${order.customer.phone}\n`;
  msg += `- *الولاية:* ${order.customer.state}\n\n`;
  msg += `*المنتجات المطلوبة:*\n`;
  order.items.forEach(item => {
    const title = item.title_ar || item.title;
    msg += `- ${title} [الكمية: ${item.quantity}] = ${formatPrice(item.price * item.quantity)}\n`;
  });
  msg += `\n*المجموع الإجمالي: ${formatPrice(order.total)}*`;
  return encodeURIComponent(msg);
}

// ============================================================
// تنسيق الأسعار
// ============================================================
function formatPrice(amount) {
  return `${Number(amount).toLocaleString('de-DE')} د.ج`;
}

// ============================================================
// نظام الإشعارات (Toast)
// ============================================================
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideInLeft 0.3s reverse forwards';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ============================================================
// تحديث التاريخ والوقت
// ============================================================
function updateDateTime() {
  const el = document.getElementById('dash-datetime');
  if (!el) return;

  const now  = new Date();
  const date = now.toLocaleDateString('ar-DZ', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const time = now.toLocaleTimeString('ar-DZ', { hour: '2-digit', minute: '2-digit' });
  el.textContent = `${date} — ${time}`;
}

// ============================================================
// المنتجات الافتراضية (نفس مجموعة app.js)
// ============================================================
function getDefaultProducts() {
  return [
    {
      id: 'p1',
      title: 'Sony PlayStation 5 Slim Edition',
      title_ar: 'سوني بلايستيشن 5 سليم',
      price: 84000,
      category: 'playstation',
      type: 'console',
      image: SVG_TEMPLATES.playstation_console,
      description: 'استمتع بتحميل فائق السرعة مع SSD فائق السرعة.'
    },
    {
      id: 'p2',
      title: 'Xbox Series X 1TB Console',
      title_ar: 'إكس بوكس سيريس إكس 1 تيرابايت',
      price: 79000,
      category: 'xbox',
      type: 'console',
      image: SVG_TEMPLATES.xbox_console,
      description: 'أسرع وأقوى جهاز Xbox على الإطلاق.'
    },
    {
      id: 'p3',
      title: 'Nintendo Switch OLED Model',
      title_ar: 'نينتندو سويتش نموذج أوليد',
      price: 58000,
      category: 'nintendo',
      type: 'console',
      image: SVG_TEMPLATES.nintendo_console,
      description: 'شاشة OLED نابضة بالحياة مقاس 7 بوصات.'
    },
    {
      id: 'p4',
      title: "Marvel's Spider-Man 2 - PS5",
      title_ar: 'لعبة سبايدرمان 2 - بلايستيشن 5',
      price: 9500,
      category: 'playstation',
      type: 'game',
      image: SVG_TEMPLATES.generic,
      description: 'تأرجح واقفز عبر نيويورك.'
    },
    {
      id: 'p5',
      title: 'Halo Infinite - Xbox',
      title_ar: 'لعبة هيلو إنفينيت - إكس بوكس',
      price: 6500,
      category: 'xbox',
      type: 'game',
      image: SVG_TEMPLATES.generic,
      description: 'تعود سلسلة Halo الأسطورية.'
    },
    {
      id: 'p6',
      title: 'Zelda: Tears of the Kingdom',
      title_ar: 'لعبة زيلدا: تيرز أوف ذا كينغدوم',
      price: 8900,
      category: 'nintendo',
      type: 'game',
      image: SVG_TEMPLATES.generic,
      description: 'مغامرة ملحمية عبر أراضي Hyrule.'
    },
    {
      id: 'p7',
      title: 'PlayStation Plus Premium 12 Months',
      title_ar: 'اشتراك بلايستيشن بلس بريميوم 12 شهر',
      price: 18500,
      category: 'games_subs',
      type: 'game',
      image: SVG_TEMPLATES.generic,
      description: 'مئات الألعاب وتجارب حصرية.'
    },
    {
      id: 'p8',
      title: 'Xbox Game Pass Ultimate 3 Months',
      title_ar: 'اشتراك إكس بوكس جيم باس 3 أشهر',
      price: 6500,
      category: 'games_subs',
      type: 'game',
      image: SVG_TEMPLATES.generic,
      description: 'أكثر من 100 لعبة متاحة.'
    },
    {
      id: 'p9',
      title: 'DualSense Edge Wireless Controller',
      title_ar: 'يد تحكم بلايستيشن 5 برو (دوال سينس)',
      price: 34000,
      category: 'accessories',
      type: 'accessory',
      image: SVG_TEMPLATES.generic,
      description: 'عناصر تحكم مخصصة وقابلة للتعديل.'
    },
    {
      id: 'p10',
      title: 'Xbox Wireless Controller - Carbon Black',
      title_ar: 'يد تحكم إكس بوكس لاسلكية - أسود',
      price: 11500,
      category: 'accessories',
      type: 'accessory',
      image: SVG_TEMPLATES.generic,
      description: 'تصميم محدث لأقصى راحة.'
    }
  ];
}

// ============================================================
// أنيميشن اهتزاز عند خطأ كلمة المرور
// ============================================================
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%       { transform: translateX(-8px); }
    40%       { transform: translateX(8px); }
    60%       { transform: translateX(-5px); }
    80%       { transform: translateX(5px); }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(shakeStyle);

// ============================================================
// تبويب قبول وإدارة البائعين
// ============================================================
function renderSellersList() {
  const tbody = document.getElementById('sellers-list-tbody');
  if (!tbody) return;

  tbody.innerHTML = '';
  
  const sortedSellers = [...sellers].sort((a, b) => {
    if (a.isFirst) return -1;
    if (b.isFirst) return 1;
    return 0;
  });

  if (sortedSellers.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align:center; color:var(--text-muted); padding:30px;">
          لا يوجد بائعون مسجلون بعد.
        </td>
      </tr>
    `;
    return;
  }

  sortedSellers.forEach(s => {
    const tr = document.createElement('tr');
    
    const roleHtml = s.isFirst 
      ? `<span class="role-badge first"><i class="fas fa-crown"></i> البائع الأول (مسؤول)</span>`
      : `<span class="role-badge"><i class="fas fa-store"></i> بائع فرعي</span>`;
      
    const statusHtml = s.status === 'approved'
      ? `<span class="status-badge approved"><i class="fas fa-check-circle"></i> مقبول</span>`
      : `<span class="status-badge pending"><i class="fas fa-clock"></i> قيد الانتظار</span>`;

    let actionHtml = '';
    if (s.isFirst) {
      actionHtml = `<span style="color:var(--text-muted); font-size:12px;">غير مسموح بأي إجراء</span>`;
    } else {
      if (s.status === 'pending') {
        actionHtml = `
          <button class="btn-action-success" onclick="approveSeller('${s.whatsapp}')">
            <i class="fas fa-check"></i> موافقة
          </button>
          <button class="btn-action-danger" onclick="deleteSellerAccount('${s.whatsapp}')" style="margin-inline-start: 6px;">
            <i class="fas fa-times"></i> رفض وحذف
          </button>
        `;
      } else {
        actionHtml = `
          <button class="btn-action-danger" onclick="revokeSeller('${s.whatsapp}')">
            <i class="fas fa-ban"></i> إلغاء الموافقة
          </button>
        `;
      }
    }

    tr.innerHTML = `
      <td data-label="رقم الواتساب" style="padding:16px; font-weight:700; font-family:var(--font-gaming); direction:ltr; text-align:right;">+${s.whatsapp}</td>
      <td data-label="الدور" style="padding:16px;">${roleHtml}</td>
      <td data-label="تاريخ التسجيل" style="padding:16px; font-size:12px; color:var(--text-secondary);">${s.registrationDate || 'غير معروف'}</td>
      <td data-label="الحالة" style="padding:16px;">${statusHtml}</td>
      <td data-label="الإجراءات" style="padding:16px;">${actionHtml}</td>
    `;
    tbody.appendChild(tr);
  });
}

function approveSeller(whatsapp) {
  loadData();
  const seller = sellers.find(s => s.whatsapp === whatsapp);
  if (seller) {
    seller.status = 'approved';
    saveData();
    renderSellersList();
    updatePendingSellersBadge();
    showToast(`تم قبول البائع +${whatsapp} بنجاح! 🎉`, 'success');
  }
}

function revokeSeller(whatsapp) {
  if (confirm(`هل أنت متأكد من إلغاء موافقة البائع +${whatsapp}؟ لن يتمكن من تسجيل الدخول بعد ذلك.`)) {
    loadData();
    const seller = sellers.find(s => s.whatsapp === whatsapp);
    if (seller) {
      seller.status = 'pending';
      saveData();
      renderSellersList();
      updatePendingSellersBadge();
      showToast(`تم إلغاء موافقة البائع +${whatsapp}.`, 'info');
    }
  }
}

function deleteSellerAccount(whatsapp) {
  if (confirm(`هل أنت متأكد من رفض وحذف حساب البائع +${whatsapp} نهائياً؟`)) {
    loadData();
    sellers = sellers.filter(s => s.whatsapp !== whatsapp);
    saveData();
    renderSellersList();
    updatePendingSellersBadge();
    showToast(`تم رفض وحذف حساب البائع +${whatsapp} بنجاح.`, 'success');
  }
}
