/* ==========================================
   FOOD DATA
========================================== */

const foods = [

    {
        id: 1,
        name: "Margherita Pizza",
        category: "main",
        price: 249,
        rating: 4.5,
        description: "Classic pizza with fresh tomatoes, mozzarella and basil",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 2,
        name: "Chicken Burger",
        category: "main",
        price: 199,
        rating: 4.3,
        description: "Juicy chicken patty with fresh lettuce and cheese",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 3,
        name: "Chicken Biryani",
        category: "main",
        price: 279,
        rating: 4.7,
        description: "Aromatic basmati rice with tender chicken",
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 4,
        name: "White Sauce Pasta",
        category: "main",
        price: 229,
        rating: 4.4,
        description: "Creamy and cheesy pasta with herbs",
        image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 5,
        name: "French Fries",
        category: "starters",
        price: 99,
        rating: 4.2,
        description: "Crispy golden french fries with special dip",
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 6,
        name: "Garlic Bread",
        category: "starters",
        price: 129,
        rating: 4.4,
        description: "Toasted bread with garlic and herbs",
        image: "garlic.jpg"
    },

    {
        id: 7,
        name: "Chocolate Brownie",
        category: "desserts",
        price: 169,
        rating: 4.6,
        description: "Warm brownie with vanilla ice cream",
        image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 8,
        name: "Mojito",
        category: "drinks",
        price: 119,
        rating: 4.3,
        description: "Refreshing mint lime drink",
        image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=600&q=80"
    }

];


/* ==========================================
   VARIABLES
========================================== */

let cart = [];

let currentCategory = "all";

const foodContainer =
    document.getElementById("foodContainer");

const cartContainer =
    document.getElementById("cartContainer");

const cartCount =
    document.getElementById("cartCount");

const cartItems =
    document.getElementById("cartItems");

const subtotal =
    document.getElementById("subtotal");

const total =
    document.getElementById("total");

// ==========================================
// FOOD DETAILS MODAL
// ==========================================

const foodModal =
    document.getElementById("foodModal");

const modalImage =
    document.getElementById("modalImage");

const modalName =
    document.getElementById("modalName");

const modalCategory =
    document.getElementById("modalCategory");

const modalRating =
    document.getElementById("modalRating");

const modalDescription =
    document.getElementById("modalDescription");

const modalPrice =
    document.getElementById("modalPrice");

const modalQuantity =
    document.getElementById("modalQuantity");

const modalMinus =
    document.getElementById("modalMinus");

const modalPlus =
    document.getElementById("modalPlus");

const modalAddCart =
    document.getElementById("modalAddCart");

const modalClose =
    document.getElementById("modalClose");

let selectedFood = null;

let selectedQuantity = 1;


/* ==========================================
   DISPLAY FOOD
========================================== */

function displayFoods(foodList) {

    foodContainer.innerHTML = "";

    if (foodList.length === 0) {

        foodContainer.innerHTML = `
            <div style="
                grid-column: 1/-1;
                text-align:center;
                padding:50px;
                color:#888;
            ">
                <i class="fa-solid fa-face-sad-tear"
                   style="font-size:40px;">
                </i>

                <h3>No food found</h3>

                <p>Try another search.</p>
            </div>
        `;

        return;
    }


    foodList.forEach(food => {

        const card = document.createElement("div");

        card.className = "food-card";


        card.innerHTML = `

            <img
                src="${food.image}"
                alt="${food.name}"
                class="food-image"
            >

            <div class="food-details">

                <h3>${food.name}</h3>

                <p class="description">
                    ${food.description}
                </p>

                <div class="rating">

                    <i class="fa-solid fa-star"></i>

                    ${food.rating}

                </div>

                <div class="food-bottom">

                    <span class="price">
                        ₹${food.price}
                    </span>

                    <button
                        class="add-btn"
                        onclick="addToCart(${food.id})"
                    >

                        <i class="fa-solid fa-cart-shopping"></i>

                        Add to Cart

                    </button>

                </div>

            </div>

        `;

        foodContainer.appendChild(card);

        // Open food details when card is clicked
card.addEventListener("click", function(event) {

    // Don't open modal when Add to Cart button is clicked
    if (event.target.closest(".add-btn")) {
        return;
    }

    openFoodModal(food.id);

});

    });

}


/* ==========================================
   ADD TO CART
========================================== */

function addToCart(id) {

    const existingItem =
        cart.find(item => item.id === id);


    if (existingItem) {

        existingItem.quantity++;

    } else {

        const food =
            foods.find(item => item.id === id);

        cart.push({

            ...food,

            quantity: 1

        });

    }

    updateCart();

}


/* ==========================================
   UPDATE CART
========================================== */

function updateCart() {

    cartContainer.innerHTML = "";


    if (cart.length === 0) {

        cartContainer.innerHTML = `

            <div class="empty-cart">

                <i class="fa-solid fa-cart-shopping"></i>

                <h3>Your cart is empty</h3>

                <p>
                    Add delicious food to your cart!
                </p>

            </div>

        `;

    }


    cart.forEach(item => {

        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <div class="cart-item-info">

                <button
                    class="remove-item"
                    onclick="removeFromCart(${item.id})"
                >
                    <i class="fa-solid fa-trash"></i>
                </button>

                <h4>
                    ${item.name}
                </h4>

                <div class="cart-price">
                    ₹${item.price}
                </div>


                <div class="quantity">

                    <button
                        onclick="changeQuantity(${item.id}, -1)"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(${item.id}, 1)"
                    >
                        +
                    </button>

                </div>

            </div>

        `;


        cartContainer.appendChild(cartItem);

    });


    calculateTotal();

}


/* ==========================================
   CHANGE QUANTITY
========================================== */

function changeQuantity(id, change) {

    const item =
        cart.find(item => item.id === id);

    if (!item) return;


    item.quantity += change;


    if (item.quantity <= 0) {

        cart =
            cart.filter(item => item.id !== id);

    }


    updateCart();

}


/* ==========================================
   REMOVE ITEM
========================================== */

function removeFromCart(id) {

    cart =
        cart.filter(item => item.id !== id);

    updateCart();

}


/* ==========================================
   CALCULATE TOTAL
========================================== */

function calculateTotal() {

    let subtotalValue = 0;

    let itemCount = 0;


    cart.forEach(item => {

        subtotalValue +=
            item.price * item.quantity;

        itemCount +=
            item.quantity;

    });


    cartCount.textContent =
        itemCount;

    cartItems.textContent =
        itemCount;


    subtotal.textContent =
        `₹${subtotalValue}`;


    let delivery = 0;


    if (subtotalValue > 0) {

        delivery = 40;

    }


    total.textContent =
        `₹${subtotalValue + delivery}`;

}


/* ==========================================
   CATEGORY FILTER
========================================== */

const categoryButtons =
    document.querySelectorAll(".category");


categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        currentCategory =
            button.dataset.category;


        filterFoods();

    });

});


/* ==========================================
   SEARCH
========================================== */

const searchInput =
    document.getElementById("searchInput");

const menuSearch =
    document.getElementById("menuSearch");


function filterFoods() {

    const searchText =
        menuSearch.value.toLowerCase();


    let filteredFoods = foods.filter(food => {

        const matchesCategory =
            currentCategory === "all" ||
            food.category === currentCategory;


        const matchesSearch =
            food.name
                .toLowerCase()
                .includes(searchText);


        return matchesCategory &&
               matchesSearch;

    });


    displayFoods(filteredFoods);

}


/* NAVBAR SEARCH */

searchInput.addEventListener("input", () => {

    menuSearch.value =
        searchInput.value;

    filterFoods();

});


/* MENU SEARCH */

menuSearch.addEventListener("input", () => {

    searchInput.value =
        menuSearch.value;

    filterFoods();

});


/* ==========================================
   CLEAR CART
========================================== */

document
    .getElementById("clearCart")
    .addEventListener("click", () => {

        cart = [];

        updateCart();

    });


/* ==========================================
   CHECKOUT
========================================== */

document
    .getElementById("checkout")
    .addEventListener("click", () => {

        if (cart.length === 0) {

            alert(
                "Your cart is empty. Please add some food!"
            );

            return;

        }


        alert(
            "Thank you! Your order has been placed successfully."
        );

    });


/* ==========================================
   DARK MODE
========================================== */

document
    .getElementById("themeButton")
    .addEventListener("click", () => {

        document.body.classList.toggle("dark");


        const icon =
            document.querySelector(
                "#themeButton i"
            );


        if (
            document.body.classList.contains("dark")
        ) {

            icon.className =
                "fa-solid fa-sun";

        } else {

            icon.className =
                "fa-solid fa-moon";

        }

    });


/* ==========================================
   ORDER NOW
========================================== */

document
    .querySelector(".order-btn")
    .addEventListener("click", () => {

        document
            .getElementById("menu")
            .scrollIntoView({
                behavior: "smooth"
            });

    });


// ==========================================
// OPEN FOOD MODAL
// ==========================================

function openFoodModal(id) {

    selectedFood =
        foods.find(food => food.id === id);

    if (!selectedFood) return;

    selectedQuantity = 1;

    // Set modal information

    modalImage.src =
        selectedFood.image;

    modalImage.alt =
        selectedFood.name;

    modalName.textContent =
        selectedFood.name;

    modalCategory.textContent =
        formatCategory(selectedFood.category);

    modalRating.textContent =
        selectedFood.rating;

    modalDescription.textContent =
        selectedFood.description;

    modalPrice.textContent =
        `₹${selectedFood.price}`;

    modalQuantity.textContent =
        selectedQuantity;

    // Show modal

    foodModal.classList.add("show");

    document.body.style.overflow = "hidden";
}


// ==========================================
// CATEGORY NAME
// ==========================================

function formatCategory(category) {

    if (category === "main") {
        return "Main Course";
    }

    if (category === "starters") {
        return "Starters";
    }

    if (category === "desserts") {
        return "Desserts";
    }

    if (category === "drinks") {
        return "Drinks";
    }

    return category;

}


// ==========================================
// CLOSE MODAL
// ==========================================

function closeFoodModal() {

    foodModal.classList.remove("show");

    document.body.style.overflow = "";

    selectedFood = null;

}


// ==========================================
// CLOSE BUTTON
// ==========================================

modalClose.addEventListener("click", () => {

    closeFoodModal();

});


// ==========================================
// CLICK OUTSIDE MODAL
// ==========================================

foodModal.addEventListener("click", (event) => {

    if (event.target === foodModal) {

        closeFoodModal();

    }

});


// ==========================================
// ESCAPE KEY
// ==========================================

document.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        foodModal.classList.contains("show")
    ) {

        closeFoodModal();

    }

});


// ==========================================
// MODAL QUANTITY +
// ==========================================

modalPlus.addEventListener("click", () => {

    selectedQuantity++;

    modalQuantity.textContent =
        selectedQuantity;

});


// ==========================================
// MODAL QUANTITY -
// ==========================================

modalMinus.addEventListener("click", () => {

    if (selectedQuantity > 1) {

        selectedQuantity--;

        modalQuantity.textContent =
            selectedQuantity;

    }

});


// ==========================================
// MODAL ADD TO CART
// ==========================================

modalAddCart.addEventListener("click", () => {

    if (!selectedFood) return;


    const existingItem =
        cart.find(item => item.id === selectedFood.id);


    if (existingItem) {

        existingItem.quantity +=
            selectedQuantity;

    } else {

        cart.push({

            ...selectedFood,

            quantity: selectedQuantity

        });

    }


    updateCart();

    closeFoodModal();

});

/* ==========================================
   INITIAL LOAD
========================================== */

displayFoods(foods);

updateCart();