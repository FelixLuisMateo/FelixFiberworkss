/* ---Contact Form--- */
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contactForm");
    const response = document.getElementById("formResponse");
    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            response.textContent = "Thank you for reaching out! We'll get back to you soon.";
            form.reset();
        });
    }
});