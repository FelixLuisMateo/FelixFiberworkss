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
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = btn.dataset.id;
            const name = btn.dataset.name;
            const price = parseFloat(btn.dataset.price);
            let img = btn.dataset.img;

            // ---- PATCH START: Make image path always correct for cart.html ----
            // Assume cart.html is in /Felix Fiberworks/HTML/ and images are in /Felix Fiberworks/Images/
            // So the correct path is always "Images/filename.jpg"
            if (!img.startsWith('../')) {
                img = 'Images/' + img.split('/').pop();
            }
            // ---- PATCH END ----

            let cart = getCart();
            if (cart[id]) {
                cart[id].qty += 1;
            } else {
                cart[id] = { id, name, price, qty: 1, img };
            }
            saveCart(cart);
            updateCartCount();
            // Redirect to cart.html after adding
            window.location.href = "cart.html";
        });
    });
    updateCartCount();
});