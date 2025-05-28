// Voucher form logic for cart-page only
document.addEventListener('DOMContentLoaded', function() {
  const voucherForm = document.getElementById('voucher-form');
  const voucherInput = document.getElementById('voucher-code');
  const voucherMsg = document.getElementById('voucher-message');
  if (voucherForm) {
    voucherForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const code = voucherInput.value.trim();
      if (!code) {
        voucherMsg.textContent = "Please enter a voucher code.";
        localStorage.removeItem("voucher");
        updateSummary();
        return;
      }
      if (code.toUpperCase() === "AYIN10") {
        localStorage.setItem('voucher', code.toUpperCase());
        voucherMsg.textContent = "Voucher applied! $10 off on orders $50+.";
      } else {
        voucherMsg.textContent = "Invalid voucher code.";
        localStorage.removeItem("voucher");
      }
      updateSummary();
    });
  }

  // Payment button demo
  const payBtn = document.getElementById('pay-btn');
  if (payBtn) {
    payBtn.addEventListener('click', function() {
      alert("Thank you for your purchase! (Payment handling not implemented in this demo.)");
    });
  }
});// Voucher form logic for cart-page only
document.addEventListener('DOMContentLoaded', function() {
  const voucherForm = document.getElementById('voucher-form');
  const voucherInput = document.getElementById('voucher-code');
  const voucherMsg = document.getElementById('voucher-message');
  if (voucherForm) {
    voucherForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const code = voucherInput.value.trim();
      if (!code) {
        voucherMsg.textContent = "Please enter a voucher code.";
        localStorage.removeItem("voucher");
        updateSummary();
        return;
      }
      if (code.toUpperCase() === "AYIN10") {
        localStorage.setItem('voucher', code.toUpperCase());
        voucherMsg.textContent = "Voucher applied! $10 off on orders $50+.";
      } else {
        voucherMsg.textContent = "Invalid voucher code.";
        localStorage.removeItem("voucher");
      }
      updateSummary();
    });
  }

  // Payment button demo
  const payBtn = document.getElementById('pay-btn');
  if (payBtn) {
    payBtn.addEventListener('click', function() {
      alert("Thank you for your purchase! (Payment handling not implemented in this demo.)");
    });
  }
});