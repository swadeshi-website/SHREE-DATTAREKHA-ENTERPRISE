/* script.js
  Full site logic:
  - PRODUCTS data includes GITS and SAWAI items (from the images you provided)
  - Cart stored in localStorage (key: sde_cart_v1)
  - Orders stored in localStorage (key: sde_orders_v1)
  - Placing an order saves order to local storage, triggers xlsx download (SheetJS) and opens WhatsApp to +919503984711
  - Brand selection, add to cart, qty controls implemented
*/

/* ---------------- CONFIG: product lists ---------------- */
const BRANDS = {
  'GITS': [
    { id:'GITS-001', name: 'Basundi Mix 125 G', price: 99 },
    { id:'GITS-002', name: 'Dahi Vada Mix 200 G', price: 110 },
    { id:'GITS-003', name: 'Idli Mix 200 G', price: 80 },
    { id:'GITS-004', name: 'Khamman Dhokla Mix 180 G', price: 75 },
    { id:'GITS-005', name: 'Khatta Dhokla Mix 200 G', price: 75 },
    { id:'GITS-006', name: 'Kheer Mix Rice 100 G', price: 75 },
    { id:'GITS-007', name: 'Rabadi Mix 100 G', price: 99 },
    { id:'GITS-008', name: 'Rava Dosa Mix 200 G', price: 80 },
    { id:'GITS-009', name: 'Rava Idali Mix 200 G', price: 80 },
    { id:'GITS-010', name: 'Kheer Mix Vermicelli 100 G', price: 75 },
    { id:'GITS-011', name: 'Sonpapadi 250 G', price: 75 },
    { id:'GITS-012', name: 'Dosa Mix 200 G Stand Up', price: 80 },
    { id:'GITS-013', name: 'Gulab Jamun Stand Up 200 G', price: 125 },
    { id:'GITS-014', name: 'Gulab Jamun Mix 500 G Pouch', price: 245 },
    { id:'GITS-015', name: 'Gulab Jamun Mix 100 G Pouch', price: 85 },
    { id:'GITS-016', name: 'Gulab Jamun 225 G Can', price: 65 },
    { id:'GITS-017', name: 'Gulab Jamun 500 G Can', price: 125 },
    { id:'GITS-018', name: 'Rasgulla 500 G Can', price: 125 },
    { id:'GITS-019', name: 'Ghee 1 Ltr Jar', price: 755 },
    { id:'GITS-020', name: 'Ghee 100 ml Jar', price: 99 },
    { id:'GITS-021', name: 'Ghee 200 ml Jar', price: 175 },
    { id:'GITS-022', name: 'Ghee 500 ml Jar', price: 385 },
    { id:'GITS-023', name: 'Ghee 20 ml Pouch', price: 20 },
    // add more if present...
  ],
  'SAWAI': [
    { id:'SAWAI-001', name: 'Bharali Wangi', price: 30 },
    { id:'SAWAI-002', name: 'Shev Bhaji', price: 30 },
    { id:'SAWAI-003', name: 'Pavbhaji', price: 30 },
    { id:'SAWAI-004', name: 'Kolhapuri Misal', price: 30 },
    { id:'SAWAI-005', name: 'Nashik Misal', price: 30 },
    { id:'SAWAI-006', name: 'Puneri Misal', price: 30 },
    { id:'SAWAI-007', name: 'Veg Biryani', price: 30 },
    { id:'SAWAI-008', name: 'Fish Fry', price: 30 },
    { id:'SAWAI-009', name: 'Fish Rassa', price: 30 },
    { id:'SAWAI-010', name: 'Anda Rassa', price: 30 },
    { id:'SAWAI-011', name: 'Chicken Biryani', price: 30 },
    { id:'SAWAI-012', name: 'Chicken Rassa Kolhapuri', price: 30 },
    { id:'SAWAI-013', name: 'Chicken Rassa Malvani', price: 30 },
    { id:'SAWAI-014', name: 'Chicken Rassa Khandeshi', price: 30 },
    { id:'SAWAI-015', name: 'Chicken Sukkha', price: 30 },
    { id:'SAWAI-016', name: 'Mutton Biryani', price: 30 },
    { id:'SAWAI-017', name: 'Mutton Rassa Kolhapuri', price: 30 },
    { id:'SAWAI-018', name: 'Mutton Rassa Khandeshi', price: 30 },
    { id:'SAWAI-019', name: 'Mutton Sukkha', price: 30 },
    { id:'SAWAI-020', name: 'Dhangari Mutton Kalwan', price: 30 },
    { id:'SAWAI-021', name: 'Kolhapuri Thecha 30/-', price: 30 },
    { id:'SAWAI-022', name: 'Kolhapuri Thecha 17/-', price: 17 },
    { id:'SAWAI-023', name: 'Javas Chutney', price: 50 },
    { id:'SAWAI-024', name: 'Karala Chutney', price: 50 },
    { id:'SAWAI-025', name: 'Shengdana Chutney', price: 50 },
    { id:'SAWAI-026', name: 'Lasun Chutney', price: 50 },
    { id:'SAWAI-027', name: 'Kal Watan', price: 25 },
    { id:'SAWAI-028', name: 'Lal Watan', price: 25 },
    { id:'SAWAI-029', name: 'Kanda Lasun 15 Gm', price: 10 },
    { id:'SAWAI-030', name: 'Kanda Lasun 200 Gm', price: 63 },
    { id:'SAWAI-031', name: 'Kala Masala 20 Gm', price: 10 },
    { id:'SAWAI-032', name: 'Kala Masala 200 Gm', price: 120 },
    { id:'SAWAI-033', name: 'Chicken Rassa Saoji', price: 30 },
    { id:'SAWAI-034', name: 'Mutton Rassa Saoji', price: 30 },
    { id:'SAWAI-035', name: 'Chicken Rassa Varhadi', price: 30 },
    { id:'SAWAI-036', name: 'Mutton Rassa Varhadi', price: 30 },
    { id:'SAWAI-037', name: 'Kanda Lasun 500 Gm', price: 120 },
    { id:'SAWAI-038', name: 'Red Chilli 200 Gm', price: 120 },
    { id:'SAWAI-039', name: 'Haldi Powder 200 Gm', price: 110 },
    { id:'SAWAI-040', name: 'Dhana Powder 200 Gm', price: 85 },
    { id:'SAWAI-041', name: 'Goda Masala 200 Gm', price: 86 },
    { id:'SAWAI-042', name: 'Mango Pickle 200 Gm Jar', price: 65 },
    // add more if needed...
  ]
};

/* ---------------- Storage keys ---------------- */
const LS_CART = 'sde_cart_v1';
const LS_ORDERS = 'sde_orders_v1';

/* ---------------- utility ---------------- */
const $ = id => document.getElementById(id);
function saveCart(cart){ localStorage.setItem(LS_CART, JSON.stringify(cart||{})); }
function loadCart(){ return JSON.parse(localStorage.getItem(LS_CART) || '{}'); }
function saveOrders(arr){ localStorage.setItem(LS_ORDERS, JSON.stringify(arr||[])); }
function loadOrders(){ return JSON.parse(localStorage.getItem(LS_ORDERS) || '[]'); }
function toast(msg){
  const t = document.createElement('div'); t.textContent = msg;
  Object.assign(t.style, {position:'fixed',right:'18px',bottom:'18px',background:'#d4af37',color:'#000',padding:'10px 14px',borderRadius:'8px',fontWeight:800,zIndex:9999});
  document.body.appendChild(t); setTimeout(()=> t.style.opacity = '0',2000); setTimeout(()=> t.remove(),2400);
}

/* ---------------- render brand products ---------------- */
function showBrand(brandKey){
  const container = $('productsContainer');
  const title = $('brandTitle');
  if(!BRANDS[brandKey]) { container.innerHTML = '<div class="muted">No products</div>'; return; }
  title.innerHTML = `<h2 style="margin:0 0 10px 0">${brandKey} Products</h2>`;
  container.innerHTML = '';
  BRANDS[brandKey].forEach(p=>{
    const card = document.createElement('div'); card.className = 'card';
    card.innerHTML = `
      <img src="images/placeholder.jpg" alt="${p.name}">
      <div class="title">${p.name}</div>
      <div class="price">₹ ${p.price}</div>
      <div class="controls-row">
        <div class="qty">
          <button onclick="decreaseQty('${p.id}')">-</button>
          <input id="qty_${p.id}" value="1" style="width:48px;text-align:center;border-radius:6px;padding:6px;background:transparent;border:1px solid rgba(255,255,255,0.04);color:#fff">
          <button onclick="increaseQty('${p.id}')">+</button>
        </div>
        <button class="add-btn" onclick="addToCart('${p.id}')">Add to Cart</button>
      </div>
    `;
    container.appendChild(card);
  });
}

/* qty controls for product cards */
function increaseQty(pid){
  const el = $(`qty_${pid}`); if(!el) return; el.value = Math.max(1, Number(el.value||1)+1);
}
function decreaseQty(pid){
  const el = $(`qty_${pid}`); if(!el) return; el.value = Math.max(1, Number(el.value||1)-1);
}

/* find product object by id */
function findProduct(pid){
  for(const b in BRANDS){
    const found = BRANDS[b].find(x=>x.id === pid);
    if(found) return found;
  }
  return null;
}

/* add to cart behaviour */
function addToCart(pid){
  const qEl = $(`qty_${pid}`);
  const qty = qEl ? Math.max(1, Number(qEl.value||1)) : 1;
  const cart = loadCart();
  cart[pid] = (cart[pid] || 0) + qty;
  saveCart(cart);
  toast('Added to cart');
  renderCart(); // update if cart page open
}

/* ---------------- render cart on order page ---------------- */
function renderCart(){
  const cont = $('cartContainer');
  if(!cont) return;
  const cart = loadCart(); const keys = Object.keys(cart);
  if(keys.length === 0){ cont.innerHTML = `<div class="muted">Cart is empty. Add products from Products page.</div>`; return; }
  let total = 0; let html = `<div class="cart-wrap">`;
  keys.forEach(pid => {
    const prod = findProduct(pid);
    if(!prod) return;
    const qty = Number(cart[pid]||0);
    const sub = qty * prod.price; total += sub;
    html += `<div class="cart-row">
      <img src="images/placeholder.jpg" alt="${prod.name}">
      <div style="flex:1">
        <div style="font-weight:800">${prod.name}</div>
        <div class="muted">${prod.id} • ${prod.brand || ''}</div>
        <div style="margin-top:8px;display:flex;align-items:center;gap:8px">
          <div class="qty-controls">
            <button onclick="changeQty('${pid}', ${Math.max(0, qty-1)})">-</button>
            <input style="width:56px;text-align:center;border-radius:6px;padding:6px;background:transparent;border:1px solid rgba(255,255,255,0.04);color:#fff" value="${qty}" onchange="changeQty('${pid}', Number(this.value))">
            <button onclick="changeQty('${pid}', ${qty+1})">+</button>
          </div>
          <div style="margin-left:auto;font-weight:900;color:var(--gold)">₹ ${sub.toFixed(2)}</div>
        </div>
      </div>
      <div><button class="btn-outline" onclick="removeFromCart('${pid}')">Remove</button></div>
    </div>`;
  });
  html += `<div style="padding:12px;display:flex;justify-content:space-between;align-items:center">
      <div style="font-weight:900">Total: ₹ ${total.toFixed(2)}</div>
      <div style="display:flex;gap:8px">
        <button class="btn-outline" onclick="saveOrderOnly()">Save Only</button>
        <button class="btn-primary" onclick="handlePlaceOrder()">Place Order & WhatsApp</button>
      </div>
    </div>`;
  html += `</div>`;
  cont.innerHTML = html;
}

/* change qty in cart */
function changeQty(pid, qty){
  const cart = loadCart();
  if(qty <= 0) delete cart[pid];
  else cart[pid] = qty;
  saveCart(cart);
  renderCart();
}

/* remove from cart */
function removeFromCart(pid){ const cart = loadCart(); delete cart[pid]; saveCart(cart); renderCart(); }

/* save order only (local) */
function saveOrderOnly(){
  const cart = loadCart(); if(Object.keys(cart).length === 0) return toast('Cart empty');
  const items = [];
  for(const pid in cart){
    const prod = findProduct(pid);
    if(!prod) continue;
    items.push({ id: prod.id, name: prod.name, price: prod.price, qty: cart[pid], subtotal: prod.price * cart[pid] });
  }
  const order = { id:'ORD-'+Date.now(), createdAt: new Date().toISOString(), buyer:{}, items, total: items.reduce((s,i)=>s+i.subtotal,0) };
  const orders = loadOrders(); orders.push(order); saveOrders(orders); saveCart({}); renderCart(); toast('Order saved locally');
}

/* ---------------- Handle place order: collect form, save XLSX, open WhatsApp ---------------- */
function handlePlaceOrder(){
  const cart = loadCart(); if(Object.keys(cart).length === 0) return toast('Cart empty');
  const shopName = ($('shopName') && $('shopName').value.trim()) || '';
  const buyerName = ($('buyerName') && $('buyerName').value.trim()) || '';
  const buyerPhone = ($('buyerPhone') && $('buyerPhone').value.trim()) || '';
  const gstNumber = ($('gstNumber') && $('gstNumber').value.trim()) || '';
  const orderDate = ($('orderDate') && $('orderDate').value) || '';
  const orderTime = ($('orderTime') && $('orderTime').value) || '';
  const orderDay = ($('orderDay') && $('orderDay').value) || '';
  const address = ($('deliveryAddress') && $('deliveryAddress').value.trim()) || '';
  const note = ($('buyerNote') && $('buyerNote').value.trim()) || '';

  if(!shopName) return alert('Please enter Shop Name (required)');
  if(!buyerPhone) return alert('Please enter Buyer Phone (required)');

  // build items
  const items = [];
  let total = 0;
  for(const pid in cart){
    const prod = findProduct(pid);
    if(!prod) continue;
    const qty = Number(cart[pid] || 0);
    const subtotal = prod.price * qty;
    total += subtotal;
    items.push({ id: prod.id, name: prod.name, price: prod.price, qty, subtotal });
  }

  // order object
  const order = {
    id: 'ORD-'+Date.now(),
    createdAt: new Date().toISOString(),
    shopName, buyerName, buyerPhone, gstNumber, orderDate, orderTime, orderDay, address, note,
    items, total
  };

  // save to local orders
  const orders = loadOrders(); orders.push(order); saveOrders(orders);

  // create XLSX file for this order and auto-download
  try {
    const rows = [];
    order.items.forEach(it => {
      rows.push({
        'Order ID': order.id,
        'Date': order.orderDate || order.createdAt,
        'Time': order.orderTime || '',
        'Shop Name': order.shopName,
        'Buyer Name': order.buyerName,
        'Buyer Phone': order.buyerPhone,
        'GST': order.gstNumber || '',
        'Address': order.address || '',
        'Product ID': it.id,
        'Product Name': it.name,
        'Qty': it.qty,
        'Unit Price': it.price,
        'Subtotal': it.subtotal,
        'Order Total': order.total
      });
    });
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Order');
    const fname = `${order.id}_${(order.shopName||'shop').replace(/\s+/g,'_')}.xlsx`;
    XLSX.writeFile(wb, fname);
  } catch (e) {
    console.error('XLSX export error', e);
  }

  // Build WhatsApp message
  const lines = [];
  lines.push(`🧾 Order ID: ${order.id}`);
  lines.push(`🏪 Shop: ${order.shopName}`);
  if(order.shopName) lines.push(`Contact Person: ${order.buyerName}`);
  lines.push(`📞 Phone: ${order.buyerPhone}`);
  if(order.gstNumber) lines.push(`GST: ${order.gstNumber}`);
  if(order.orderDate) lines.push(`📅 Date: ${order.orderDate} ${order.orderDay || ''}`);
  if(order.orderTime) lines.push(`⏱ Time: ${order.orderTime}`);
  if(order.address) lines.push(`📍 Address: ${order.address}`);
  lines.push('');
  lines.push('--- Items ---');
  order.items.forEach(it => {
    lines.push(`${it.name} • ID:${it.id} • Qty:${it.qty} • ₹${it.subtotal.toFixed(2)}`);
  });
  lines.push('');
  lines.push(`Total: ₹ ${order.total.toFixed(2)}`);
  if(order.note) lines.push(`Note: ${order.note}`);
  lines.push('', 'Please confirm availability & ETA.');

  const waMessage = lines.join('\n');
  // open WhatsApp
  const phone = '919503984711'; // number digits only
  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(waMessage)}`;
  window.open(waUrl, '_blank');

  // clear cart & notify
  saveCart({});
  renderCart();
  toast('Order placed — WhatsApp opened & Excel downloaded.');
}

/* ---------------- Admin functions ---------------- */
function renderOrdersAdmin(){
  const el = $('ordersTable'); if(!el) return;
  const orders = loadOrders();
  if(!orders.length){ el.innerHTML = '<div class="muted">No saved orders.</div>'; return; }
  let html = '';
  orders.slice().reverse().forEach(o=>{
    html += `<div class="order-item">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div style="font-weight:900">${o.id}</div>
        <div class="muted">${new Date(o.createdAt).toLocaleString()}</div>
      </div>
      <div class="muted">${o.shopName} • ${o.buyerPhone}</div>
      <div style="margin-top:8px">`;
    o.items.forEach(it => {
      html += `<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px dashed rgba(255,255,255,0.03)"><div>${it.name} x${it.qty}</div><div>₹ ${it.subtotal.toFixed(2)}</div></div>`;
    });
    html += `<div style="margin-top:8px;font-weight:900">Total: ₹ ${o.total.toFixed(2)}</div>`;
    html += `</div></div>`;
  });
  el.innerHTML = html;
}

function exportOrdersToXLSX(){
  const orders = loadOrders(); if(!orders.length) return alert('No orders to export');
  const rows = [];
  orders.forEach(o=>{
    o.items.forEach(it => {
      rows.push({
        'Order ID': o.id,
        'Created At': o.createdAt,
        'Shop Name': o.shopName,
        'Buyer Name': o.buyerName,
        'Buyer Phone': o.buyerPhone,
        'GST': o.gstNumber,
        'Date': o.orderDate,
        'Time': o.orderTime,
        'Address': o.address,
        'Product ID': it.id,
        'Product Name': it.name,
        'Qty': it.qty,
        'Unit Price': it.price,
        'Subtotal': it.subtotal,
        'Order Total': o.total
      });
    });
  });
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Orders');
  const fname = `orders_export_${new Date().toISOString().slice(0,19).replace(/[:T]/g,'-')}.xlsx`;
  XLSX.writeFile(wb, fname);
}

function clearAllOrders(){
  if(!confirm('Clear all saved orders? This cannot be undone.')) return;
  saveOrders([]); renderOrdersAdmin(); toast('All orders cleared');
}

/* ---------------- init UI on DOM ready ---------------- */
document.addEventListener('DOMContentLoaded', ()=>{
  // Show GITS by default if products page loaded
  if($('productsContainer')) showBrand('GITS');
  // Render cart on order page
  renderCart();
  // Admin orders
  renderOrdersAdmin();
  // Wire admin buttons if exist
  if($('exportBtn')) $('exportBtn').onclick = exportOrdersToXLSX;
  if($('clearBtn')) $('clearBtn').onclick = clearAllOrders;
  if($('refreshBtn')) $('refreshBtn').onclick = renderOrdersAdmin;
});
