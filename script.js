const services = [
  { name: "🧺 Dry Cleaning", price: 200 },
  { name: "🧼 Wash & Fold", price: 100 },
  { name: "🧹 Ironing", price: 30 },
  { name: "👗 Stain Removal", price: 500 },
  { name: "🧥 Leather & Suede Cleaning", price: 999 },
  { name: "👰 Wedding Dress Cleaning", price: 2800 }
];

let cart = [];

const servicesBox = document.getElementById("servicesBox");
const cartItems = document.getElementById("cartItems");
const totalBox = document.getElementById("total");

function displayServices() {
  servicesBox.innerHTML = "";

  services.forEach((service, index) => {
    const isAdded = cart.find(item => item.name === service.name);

    servicesBox.innerHTML += `
      <div class="service-row">
        <span>${service.name} : <b>₹${service.price}.00</b></span>
        <button class="${isAdded ? 'remove' : 'add'}" onclick="${isAdded ? `removeItem(${index})` : `addItem(${index})`}">
          ${isAdded ? "Remove Item ⊖" : "Add Item ⊕"}
        </button>
      </div>
    `;
  });
}

function addItem(index) {
  cart.push(services[index]);
  updateCart();
}

function removeItem(index) {
  cart = cart.filter(item => item.name !== services[index].name);
  updateCart();
}

function updateCart() {
  displayServices();

  if (cart.length === 0) {
    cartItems.innerHTML = `<tr><td colspan="3">No added items</td></tr>`;
    totalBox.innerText = 0;
    return;
  }

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    cartItems.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>₹${item.price}.00</td>
      </tr>
    `;
  });

  totalBox.innerText = total;
}

function scrollToBooking() {
  document.getElementById("services").scrollIntoView({ behavior: "smooth" });
}

function bookNow() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const msg = document.getElementById("msg");

  if (!name || !email || !phone || cart.length === 0) {
    msg.style.color = "red";
    msg.innerText = "Please fill all fields and add at least one service.";
    return;
  }

  const orderDetails = cart.map(item => `${item.name} - ₹${item.price}`).join(", ");

  emailjs.init("YOUR_PUBLIC_KEY");

  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
    user_name: name,
    user_email: email,
    phone_number: phone,
    order_details: orderDetails,
    total_amount: totalBox.innerText
  });

  msg.style.color = "green";
  msg.innerText = "Thank you For Booking the Service We will get back to you soon!";
}

displayServices();