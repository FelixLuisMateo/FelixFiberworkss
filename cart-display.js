function getCart() {
    // Robust: always return an object
    let cart = {};
    try {
        cart = JSON.parse(localStorage.getItem('cart')) || {};
        if (typeof cart !== "object" || Array.isArray(cart) || cart === null) cart = {};
    } catch (e) {
        cart = {};
    }
    return cart;
}
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}
function updateCartCount() {
    const cart = getCart();
    let count = 0;
    Object.values(cart).forEach(item => count += item.qty);
    let countDisplay = count > 999 ? "999+" : count;
    document.querySelectorAll('#cart-count').forEach(e => e.textContent = countDisplay);
}
function renderCartTable() {
    const cart = getCart();
    const tbody = document.getElementById('cart-table-body');
    const emptyMsg = document.getElementById('cart-empty-msg');
    tbody.innerHTML = '';
    let items = Object.values(cart);

    if (!items.length) {
        emptyMsg.textContent = "Your cart is empty.";
        document.getElementById("cart-table").style.display = "none";
        document.getElementById("pay-btn").style.display = "none";
        document.getElementById("voucher-form").style.display = "none";
        document.getElementById("summary-subtotal").textContent = "$0.00";
        document.getElementById("summary-grandtotal").textContent = "$0.00";
        return;
    }
    document.getElementById("cart-table").style.display = "";
    document.getElementById("pay-btn").style.display = "";
    document.getElementById("voucher-form").style.display = "";
    emptyMsg.textContent = "";

    items.forEach(item => {
        // Patch the image path for safety, in case old or wrong paths are stored
        let imgSrc = item.img;
        if (!imgSrc.startsWith('../')) {
            imgSrc = 'Images/' + imgSrc.split('/').pop();
        }
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${imgSrc}" alt="${item.name}" style="width:60px;height:auto;"></td>
            <td class="product-name">${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <div class="cart-qty-row">
                    <button class="qty-btn" data-id="${item.id}" data-delta="-1">-</button>
                    <span class="cart-qty">${item.qty}</span>
                    <button class="qty-btn" data-id="${item.id}" data-delta="1">+</button>
                </div>
            </td>
            <td>$${(item.price * item.qty).toFixed(2)}</td>
            <td><button class="remove-btn" data-id="${item.id}" title="Remove">&#10005;</button></td>
        `;
        tbody.appendChild(tr);
    });

    // Quantity and Remove buttons
    document.querySelectorAll('.qty-btn').forEach(btn => {
        btn.onclick = function () {
            const id = btn.dataset.id;
            const delta = parseInt(btn.dataset.delta);
            let cart = getCart();
            if (cart[id]) {
                cart[id].qty += delta;
                if (cart[id].qty < 1) cart[id].qty = 1;
                saveCart(cart);
                renderCartTable();
                updateSummary();
                updateCartCount();
            }
        }
    });
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.onclick = function () {
            const id = btn.dataset.id;
            let cart = getCart();
            delete cart[id];
            saveCart(cart);
            renderCartTable();
            updateSummary();
            updateCartCount();
        }
    });
}

function updateSummary() {
    const cart = getCart();
    let subtotal = 0;
    let items = Object.values(cart);
    items.forEach(item => {
        subtotal += item.price * item.qty;
    });

    // Discount: 10% off if subtotal >= $100
    let discount = 0, discountLabel = '';
    if (subtotal >= 100) {
        discount = subtotal * 0.10;
        discountLabel = "10% off orders $100+";
        document.getElementById("summary-discount-row").style.display = "";
        document.getElementById("summary-discount-label").textContent = discountLabel;
        document.getElementById("summary-discount").textContent = `-$${discount.toFixed(2)}`;
    } else {
        document.getElementById("summary-discount-row").style.display = "none";
    }

    // Voucher: AYIN10 gives $10 off if subtotal >= 50
    let voucherDiscount = 0, voucherLabel = '', voucherMsg = '';
    let voucher = localStorage.getItem("voucher") || "";
    if (voucher.toUpperCase() === "AYIN10" && subtotal >= 50) {
        voucherDiscount = 10;
        voucherLabel = "Voucher 'AYIN10'";
        document.getElementById("summary-voucher-row").style.display = "";
        document.getElementById("summary-voucher-label").textContent = voucherLabel;
        document.getElementById("summary-voucher").textContent = `-$${voucherDiscount.toFixed(2)}`;
    } else {
        document.getElementById("summary-voucher-row").style.display = "none";
    }

    let grandTotal = subtotal - discount - voucherDiscount;
    if (grandTotal < 0) grandTotal = 0;

    document.getElementById("summary-subtotal").textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("summary-grandtotal").textContent = `$${grandTotal.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', () => {
    renderCartTable();
    updateSummary();
    updateCartCount();
});