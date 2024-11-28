const products = [
  {
    name: "Waffle with Berries",
    category: "Waffle",
    price: 6.5,
    image: "waffle.svg",
  },
  {
    name: "Vanilla Bean Crème Brûlée",
    category: "Crème Brûlée",
    price: 7.0,
    image: "cremeburulee.svg",
  },
  {
    name: "Macaron Mix of Five",
    category: "Macaron",
    price: 8.0,
    image: "macaron.svg",
  },
  {
    name: "Classic Tiramisu",
    category: "Tiramisu",
    price: 5.5,
    image: "tiramisu.svg",
  },
  {
    name: "Pistachio Baklava",
    category: "Baklava",
    price: 4.0,
    image: "baklava.svg",
  },
  {
    name: "Lemon Meringue Pie",
    category: "Pie",
    price: 5.0,
    image: "pie.svg",
  },
  {
    name: "Red Velvet Cake",
    category: "Cake",
    price: 4.5,
    image: "cake.svg",
  },

  {
    name: "Salted Caramel Brownie",
    category: "Brownie",
    price: 5.5,
    image: "brownie.svg",
  },
  {
    name: "Vanilla Panna Cotta",
    category: "Panna Cotta",
    price: 6.5,
    image: "pannacotta.svg",
  },
];
let totalCartPrice = 0;
let totalCartItems = 0;

const orders = [];

const productList = document.querySelector(".products-grid-container");

function ekranaYaz() {
  for (const product of products) {
    productList.innerHTML += `
        <div class="products-grid-item">
          <div class="image-container">
             <img src="assets/images/${product.image}" alt="">
             <button data-irem="${
               product.name
             }" class="sepete-ekle"><i class="fa-solid fa-cart-plus"></i>Add to cart</button>
          </div>
          <p class="category">${product.category}</p>
          <p class="name">${product.name}</p>
          <p class="price">$${product.price.toFixed(2)}</p>
         
      </div>
      `;
  }

  const sepeteEkleBtns = document.querySelectorAll(".sepete-ekle");
  // console.log(sepeteEkleBtns);
  for (const btn of sepeteEkleBtns) {
    btn.addEventListener("click", sepeteEkle);
  }
}

function listOrders() {
  totalCartPrice = 0;
  totalCartItems = 0;

  let irem = "";
  for (const order of orders) {
    const totalPrice = Number(order.adet * order.price);
    totalCartPrice += totalPrice;
    totalCartItems += order.adet;
    irem += `
      <div class="orders-grid-item">
        <p class="name">${order.name}</p>
        <div class ="price-adet">
         <div class="price-left">
           <p class="adet">${order.adet}x</p>
           <p class="price">@ $${order.price.toFixed(2)}</p>
           <p class ="total-price">$${totalPrice.toFixed(2)} </p
         </div>
        </div>
        <div>
         <button class="deleteBtn" data-irem="${order.name}">x</button>
        </div>
      </div>
    `;
  }

  return irem;
}

function removeOrder() {
  const tiklananUrun = this.dataset.irem;
  const tiklananUrunIndex = orders.findIndex(
    (order) => order.name == tiklananUrun
  );
  // console.log(tiklananUrunIndex)
  orders.splice(tiklananUrunIndex, 1);
  console.log(orders);
  writeOrders();
}

function writeOrders() {
  const listedOrders = listOrders();
  const orderList = document.querySelector(".orders-container");
  orderList.innerHTML = ` 
     <h4 class="cart-title">Your Cart(${totalCartItems})</h4>
     ${listedOrders}
         <hr>
        <div class = "order-total"
        <p>Order Total</p>
        <span>$${totalCartPrice}</span>
        </div>
        <div class="carbon-neutral">
        <img class="tree" src="assets/images/carbon_tree.svg" alt="">
        <p>This is a carbon-neutral delivery</p>
        </div>
         <button class="confirmBtn">Confirm Order</button>

  `;

  const deleteBtns = document.querySelectorAll(".deleteBtn");
  for (const btn of deleteBtns) {
    btn.addEventListener("click", removeOrder);
  }
  const confirmBtn = document.querySelector(".confirmBtn");
  if (confirmBtn) {
    confirmBtn.addEventListener("click", confirmed);
  }
}

ekranaYaz();

function sepeteEkle() {
  const secilenUrun = products.find((x) => x.name == this.dataset.irem);
  const sepettekiUrun = orders.find((order) => order.name == secilenUrun.name);
  console.log(secilenUrun);
  if (sepettekiUrun) {
    sepettekiUrun.adet++;
  } else {
    orders.push({
      name: secilenUrun.name,
      category: secilenUrun.category,
      image: secilenUrun.image,
      price: secilenUrun.price,
      adet: 1,
    });
  }

  writeOrders();
}

const orderConfirmed = document.querySelector(".order-confirmed");
const confirmedCont = document.querySelector(".confirmed-container");


function confirmed() {
  let orderImages = "";
  for (const order of orders) {
    orderImages += `
      <div class="confirm-order-item">
        <div class="order-content">
          <div class="confirm-img">
            <img class="order-image" src="assets/images/${order.image}" alt="${order.name}">
          </div>
          <div class="confirm-details">
            <p class="order-name">${order.name}</p>
            <div class="order-adet-price">
              <p class="order-adet">${order.adet}x</p>
              <p class="order-adet-price">@ $${order.price.toFixed(2)}</p>
            </div>
          </div>
          <div class="order-total-price">
            <p class="order-price">$${(order.adet * order.price).toFixed(2)}</p>
          </div>
        </div>
      </div>
    `;
  }

  confirmedCont.innerHTML = `
    <div class="confirm-header">
      <img src="assets/images/carbon_checkmark-outline.svg" alt="Confirmed">
      <h1>Order <br> Confirmed</h1>
      <p>We hope you enjoy your food!</p>
    </div>
    <div class= "confirm-content-item">
      <div class="confirm-content">
      ${orderImages}
    </div>
    <div class="order-total-confirm"> 
      <p>Order Total</p>
      <span>$${totalCartPrice.toFixed(2)}</span>
    </div>
    </div>
    <button class="closeOrderBtn">Start New Order</button>
  `;

  orderConfirmed.showModal();
  const closeOrderBtn = document.querySelector('.closeOrderBtn');
  closeOrderBtn.addEventListener('click', orderClose);
}

function orderClose() {
  orderConfirmed.close();
}
