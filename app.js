/* ═══════════════════════════════════════════
   GRUB — Shared Utilities & Data
   Used by all pages
═══════════════════════════════════════════ */

// ── MENU DATA ──────────────────────────────
const MENU = [
  {
    id:1,
    name:"Smoky BBQ Burger",
    cat:"burgers",
    image:"images/Smoky_BBQ_Burger.jpg",
    price:249,
    rating:4.8,
    desc:"Double patty, smoked cheddar, caramelized onions",
    badge:"Bestseller"
  },

  {
    id:2,
    name:"Pepperoni Blast",
    cat:"pizza",
    image:"images/pizza1.jpg",
    price:349,
    rating:4.7,
    desc:"Mozzarella, double pepperoni, oregano, chili oil",
    badge:"Spicy"
  },

  {
    id:3,
    name:"Dragon Noodle Bowl",
    cat:"asian",
    image:"images/Dragon_Noodle_Bowl.jpg",
    price:199,
    rating:4.6,
    desc:"Szechuan broth, bok choy, soft egg, crispy shallots",
    badge:null
  },

  {
    id:4,
    name:"Garlic Bread",
    cat:"subs",
    image:"images/garlic1.jpg",
    price:179,
    rating:4.5,
    desc:"Loaded garlic bread with herbs and cheese",
    badge:null
  },

  {
    id:5,
    name:"Margherita Classic",
    cat:"pizza",
    image:"images/Margherita_Classic.jpg",
    price:299,
    rating:4.6,
    desc:"San Marzano tomatoes, fresh basil, buffalo mozzarella",
    badge:"Veg"
  },

  {
    id:6,
    name:"Crispy Fried Chicken",
    cat:"chicken",
    image:"images/Chicken_fry.jpg",
    price:229,
    rating:4.9,
    desc:"Double-fried, nashville spice rub, honey drizzle",
    badge:"New"
  },

  {
    id:7,
    name:"Avocado Smash Wrap",
    cat:"healthy",
    image:"images/Avocado_Smash_Wrap.jpg",
    price:189,
    rating:4.4,
    desc:"Smashed avo, quinoa, roasted veggies, tahini sauce",
    badge:"Veg"
  },

  {
    id:8,
    name:"Truffle Pasta",
    cat:"pasta",
    image:"images/Truffle_Pasta.jpg",
    price:319,
    rating:4.7,
    desc:"Hand-cut tagliatelle, black truffle, parmesan foam",
    badge:"Chef's Pick"
  },

  {
    id:9,
    name:"Double Smash Burger",
    cat:"burgers",
    image:"images/Double_Smash_Burger.jpg",
    price:279,
    rating:4.8,
    desc:"Smash-style, secret sauce, dill pickles, brioche bun",
    badge:null
  },

  {
    id:10,
    name:"Spicy Ramen",
    cat:"asian",
    image:"images/Spicy_Ramen.jpg",
    price:219,
    rating:4.5,
    desc:"Tonkotsu base, chashu pork, bamboo shoots, nori",
    badge:"Spicy"
  },

  {
    id:11,
    name:"BBQ Pulled Pork Sub",
    cat:"subs",
    image:"images/BBQ_Pulled_Pork_Sub.jpg",
    price:209,
    rating:4.6,
    desc:"Slow-cooked pulled pork, coleslaw, BBQ drizzle",
    badge:"Bestseller"
  },

  {
    id:12,
    name:"Açaí Power Bowl",
    cat:"healthy",
    image:"images/Acai_Power_Bowl.webp",
    price:169,
    rating:4.3,
    desc:"Açaí base, granola, banana, chia seeds, honey",
    badge:"Veg"
  },
];

const CATEGORIES = [
  { id:"all",     label:"All",         emoji:"🍽️" },
  { id:"burgers", label:"Burgers",     emoji:"🍔" },
  { id:"pizza",   label:"Pizza",       emoji:"🍕" },
  { id:"asian",   label:"Asian",       emoji:"🍜" },
  { id:"chicken", label:"Chicken",     emoji:"🍗" },
  { id:"subs",    label:"Subs",        emoji:"🥖" },
  { id:"pasta",   label:"Pasta",       emoji:"🍝" },
  { id:"healthy", label:"Healthy",     emoji:"🥗" },
];

// ── LOCAL STORAGE HELPERS ──────────────────
const LS = {
  get: (k, fallback=null) => {
    try { const v = localStorage.getItem('grub_'+k); return v ? JSON.parse(v) : fallback; }
    catch { return fallback; }
  },
  set: (k, v) => { try { localStorage.setItem('grub_'+k, JSON.stringify(v)); } catch {} },
  del: (k)    => { try { localStorage.removeItem('grub_'+k); } catch {} },
};

// ── CART HELPERS ───────────────────────────
const Cart = {
  get: ()         => LS.get('cart', []),
  save: (items)   => LS.set('cart', items),
  count: ()       => Cart.get().reduce((s,i) => s + i.qty, 0),
  total: ()       => Cart.get().reduce((s,i) => s + i.price * i.qty, 0),
  add: (item) => {
    const cart = Cart.get();
    const idx = cart.findIndex(c => c.id === item.id);
    if (idx > -1) cart[idx].qty++;
    else cart.push({ ...item, qty: 1 });
    Cart.save(cart);
    Cart.updateBadge();
  },
  remove: (id) => {
    Cart.save(Cart.get().filter(c => c.id !== id));
    Cart.updateBadge();
  },
  updateQty: (id, qty) => {
    if (qty < 1) { Cart.remove(id); return; }
    const cart = Cart.get();
    const idx = cart.findIndex(c => c.id === id);
    if (idx > -1) { cart[idx].qty = qty; Cart.save(cart); }
    Cart.updateBadge();
  },
  clear: () => { Cart.save([]); Cart.updateBadge(); },
  updateBadge: () => {
    const badge = document.querySelector('.cart-badge');
    if (badge) { const c = Cart.count(); badge.textContent = c; badge.style.display = c ? 'flex' : 'none'; }
  },
};

// ── AUTH HELPERS ───────────────────────────
const Auth = {
  user: ()       => LS.get('user', null),
  isLoggedIn: () => !!Auth.user(),
  login: (u)    => { LS.set('user', u); },
  logout: ()    => { LS.del('user'); },
};

// ── ORDER HELPERS ──────────────────────────
const Orders = {
  get: ()      => LS.get('orders', []),
  add: (order) => {
    const orders = Orders.get();
    orders.unshift(order);
    LS.set('orders', orders);
  },
};

// ── FORMAT HELPERS ─────────────────────────
const fmt = {
  price: (n) => `₹${n.toLocaleString('en-IN')}`,
  date: (iso) => new Date(iso).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }),
  time: (iso) => new Date(iso).toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' }),
};

// ── TOAST ──────────────────────────────────
function toast(msg, type='info', duration=3000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const icons = { success:'✅', error:'❌', info:'🔔' };
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<span>${icons[type]||'🔔'}</span><span>${msg}</span>`;
  container.appendChild(el);
  setTimeout(() => {
    el.style.animation = 'toastOut 0.3s ease forwards';
    setTimeout(() => el.remove(), 300);
  }, duration);
}

// ── NAV INJECTION ──────────────────────────
function injectNav(activePage) {
  const pages = [
    { href:'index.html',    label:'Home'     },
    { href:'menu.html',     label:'Menu'     },
    { href:'about.html',    label:'About'    },
    { href:'tracking.html', label:'Tracking' },
  ];

  const cartCount = Cart.count();
  const user = Auth.user();

  const nav = document.createElement('nav');
  nav.innerHTML = `
    <a class="nav-logo" href="index.html">GRUB<span>.</span></a>
    <div class="nav-links">
      ${pages.map(p=>`
        <a class="nav-link ${p.href===activePage?'active':''}" href="${p.href}">${p.label}</a>
      `).join('')}
    </div>
    <div class="nav-right">
      <button class="nav-cart" onclick="window.location='cart.html'">
        🛒 Cart
        <span class="cart-badge" style="display:${cartCount?'flex':'none'}">${cartCount}</span>
      </button>
      <button class="nav-user" onclick="window.location='${user?'#user-menu':'login.html'}'" title="${user?user.name:'Login'}">
        ${user ? user.name[0].toUpperCase() : '👤'}
      </button>
    </div>
  `;
  document.body.prepend(nav);
}

// ── FOOD CARD BUILDER ──────────────────────
function buildFoodCard(item) {

  const div = document.createElement('div');

  div.className = 'card food-card';

  div.innerHTML = `
  
    <div class="food-img-wrap">

      ${item.badge ? `<span class="food-badge">${item.badge}</span>` : ''}

      <img src="${item.image}" alt="${item.name}" class="food-img">

    </div>

    <div class="card-body">

      <div class="food-name heading">
        ${item.name}
      </div>

      <div class="food-desc muted">
        ${item.desc}
      </div>

      <div class="food-footer">

        <div>
          <div class="food-price">
            ${fmt.price(item.price)}
          </div>

          <div class="food-rating">
            ⭐ ${item.rating}
          </div>
        </div>

        <button class="add-btn" onclick="addToCart(${item.id})">
          +
        </button>

      </div>

    </div>
  `;

  return div;
}

function addToCart(id) {
  const item = MENU.find(m => m.id === id);
  if (!item) return;
  Cart.add(item);
  toast(`${item.name} added to cart!`, 'success');
}