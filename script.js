document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("cart-items");
    const subtotalElement = document.getElementById("subtotal-amount");
    const totalElement = document.getElementById("total-amount");
    const checkoutButton = document.querySelector(".checkout-btn");

    // Fetch data from API
    fetch("https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889")
        .then(response => response.json())
        .then(data => {
            renderCartItems(data.items);
            updateCartTotal();
        })
        .catch(error => console.error("Error fetching cart data:", error));

    function renderCartItems(items) {
        cartItemsContainer.innerHTML = `
        <table>
            <tr>
                <th>Product</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th class="subtotal-header">Subtotal</th>
                <th></th>
            </tr>
        </table>
        `;

        const table = cartItemsContainer.querySelector("table");

        items.forEach(item => {
            const row = document.createElement("tr");
            row.classList.add("cart-row");

            // Convert paise to rupees
            const priceInRupees = (item.presentment_price).toFixed(2);
            const subtotalInRupees = (item.line_price / 100).toFixed(2);

            row.innerHTML = `
                <td class="cart-item">
                    <img src="${item.image}" alt="${item.product_title}" />
                </td>
                <td>${item.product_title}</td>
                <td class="item-price">₹${priceInRupees}</td>
                <td>
                    <input type="number" value="${item.quantity}" class="quantity-input" min="1" />
                </td>
                <td class="item-subtotal">₹${subtotalInRupees}</td>
                <td class="delete-icon" style="cursor:pointer;">🗑️</td>
            `;

            // Quantity change event
            row.querySelector(".quantity-input").addEventListener("input", function () {
                if (this.value < 1) this.value = 1;
                updateSubtotal(row);
                updateCartTotal();
            });

            // Remove item event
            row.querySelector(".delete-icon").addEventListener("click", function () {
                row.remove();
                updateCartTotal();
            });

            table.appendChild(row);
        });
    }

    function updateSubtotal(row) {
        const price = parseFloat(row.querySelector(".item-price").textContent.replace("₹", ""));
        const quantity = row.querySelector(".quantity-input").value;
        const subtotal = price * quantity;
        row.querySelector(".item-subtotal").textContent = `₹${subtotal.toFixed(2)}`;
    }

    function updateCartTotal() {
        let total = 0;
        document.querySelectorAll(".cart-row").forEach(row => {
            const subtotal = parseFloat(row.querySelector(".item-subtotal").textContent.replace("₹", ""));
            total += subtotal;
        });

        subtotalElement.textContent = `₹${total.toLocaleString()}`;
        totalElement.textContent = `₹${total.toLocaleString()}`;
    }

    // Checkout button event
    checkoutButton.addEventListener("click", function () {
        alert("Proceeding to checkout...");
    });
});
