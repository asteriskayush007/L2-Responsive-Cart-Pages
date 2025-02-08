document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("cart-items");
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("total");

    // Given JSON API Response
    const cartData = {
        
            "original_total_price": 750000,
            "items": [
                {
                    "id": 49839206859071,
                    "quantity": 1,
                    "title": "Asgaard Sofa",
                    "price": 25000000,
                    "discounted_price": 20000000,
                    "total_discount": 5000000,
                    "product_description": "The Asgaard sofa offers unparalleled comfort and style...",
                    "image": "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/Asgaardsofa3.png?v=1728384481"
                },
                {
                    "id": 49839206859072,
                    "quantity": 2,
                    "title": "Nordic Lounge Chair",
                    "price": 15000000,
                    "discounted_price": 12000000,
                    "total_discount": 3000000,
                    "product_description": "A comfortable Nordic-style lounge chair for your living room.",
                    "image": "Nordic Lounge Chair.png"
                },
                {
                    "id": 49839206859073,
                    "quantity": 1,
                    "title": "Modern Coffee Table",
                    "price": 10000000,
                    "discounted_price": 8000000,
                    "total_discount": 2000000,
                    "product_description": "A sleek modern coffee table for your home.",
                    "image": "Modern Coffee Table.png"
                },
                {
                    "id": 49839206859074,
                    "quantity": 1,
                    "title": "King Size Bed",
                    "price": 40000000,
                    "discounted_price": 35000000,
                    "total_discount": 5000000,
                    "product_description": "A spacious and elegant king-size bed for restful sleep.",
                    "image": "https://png.pngtree.com/png-vector/20240914/ourmid/pngtree-opulent-comfort-the-luxurious-king-size-bed-png-image_13830344.png"
                }
            ],
            "currency": "INR",
            "items_subtotal_price": 75000000      
    };

    function renderCartItems(items) {
        cartItemsContainer.innerHTML = ""; // Clear previous content

        items.forEach((item, index) => {
            const row = document.createElement("tr");
            row.classList.add("cart-row");

            row.innerHTML = `
                <td class="cart-item"><img src="${item.image}" alt="${item.title}" /></td>
                <td>${item.title}</td>
                <td>${item.product_description}</td>
                <td class="item-price">₹${(item.price / 100).toFixed(2)}</td>
                <td class="item-discount">-₹${(item.total_discount / 100).toFixed(2)}</td>
                <td>
                    <input type="number" value="${item.quantity}" class="quantity-input" min="1" data-index="${index}" />
                </td>
                <td class="item-subtotal">₹${((item.discounted_price / 100) * item.quantity).toFixed(2)}</td>
                <td class="delete-icon" data-index="${index}">🗑️</td>
            `;

            cartItemsContainer.appendChild(row);
        });

        addEventListeners();
        updateCartTotal();
    }

    function addEventListeners() {
        document.querySelectorAll(".quantity-input").forEach(input => {
            input.addEventListener("input", function () {
                const index = this.getAttribute("data-index");
                if (this.value < 1) this.value = 1;
                cartData.items[index].quantity = parseInt(this.value);
                updateSubtotal(index);
                updateCartTotal();
            });
        });

        document.querySelectorAll(".delete-icon").forEach(icon => {
            icon.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                cartData.items.splice(index, 1);
                renderCartItems(cartData.items);
            });
        });
    }

    function updateSubtotal(index) {
        const item = cartData.items[index];
        const row = cartItemsContainer.children[index];
        const subtotal = (item.discounted_price / 100) * item.quantity;
        row.querySelector(".item-subtotal").textContent = `₹${subtotal.toFixed(2)}`;
    }

    function updateCartTotal() {
        let total = 0;
        cartData.items.forEach(item => {
            total += (item.discounted_price / 100) * item.quantity;
        });

        subtotalElement.textContent = `₹${total.toFixed(2)}`;
        totalElement.textContent = `₹${total.toFixed(2)}`;
    }

    renderCartItems(cartData.items);
});
