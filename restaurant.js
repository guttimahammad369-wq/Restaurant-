// Externalized JavaScript from index.htm

function showOrder(event) {
  event.preventDefault(); // prevent page refresh

  const name = document.getElementById("name").value;
  const mobile = document.getElementById("mobile").value;
  const email = document.getElementById("email").value;
  const dish = document.getElementById("dish").value;
  const quantity = document.getElementById("quantity").value;

  const scriptURL = "https://script.google.com/macros/s/AKfycbyeRkz05MM4sGZKjAKQHNK_mmAYqBdAeO5nBA8U4FCaTExm_nNNmvmzyyLWspNk2ZuZMw/exec";

  const orderData = { name, mobile, email, dish, quantity };

  fetch(scriptURL, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(orderData),
  })
    .then(() => {
      alert(`Thank you, ${name}! 🍽️\n\nYour order for "${dish}" (${quantity}) has been received!\nWe’ll contact you at ${mobile} or ${email}. `);
      document.querySelector(".order-form").reset();
    })
    .catch((error) => {
      alert("❌ Something went wrong. Please try again!");
      console.error("Error:", error);
    });
}

// EmailJS Script
(function() {
  emailjs.init("YOUR_PUBLIC_KEY_HERE"); // Replace with your actual EmailJS Public Key
})();

// Contact form handler
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const serviceID = "YOUR_SERVICE_ID_HERE";
  const templateID = "YOUR_TEMPLATE_ID_HERE";

  emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      alert("✅ Message sent successfully!");
      document.getElementById("contactForm").reset();
    }, (err) => {
      alert("❌ Failed to send message. Please try again.");
      console.error("EmailJS Error:", err);
    });
});

// Book table button behavior
var bookBtn = document.getElementById('bookTableBtn');
if (bookBtn) {
  bookBtn.addEventListener('click', function() {
    var orderEl = document.getElementById('order');
    if (orderEl) orderEl.scrollIntoView({ behavior: 'smooth' });
  });
}

// Ensure showOrder is globally available (form onsubmit still uses showOrder(event) in markup)
window.showOrder = showOrder;

// Attach submit listener to order form (moved from inline onsubmit)
var orderFormEl = document.querySelector('.order-form');
if (orderFormEl) {
  orderFormEl.addEventListener('submit', function(e) {
    showOrder(e);
  });
}
