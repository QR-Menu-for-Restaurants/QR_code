document.addEventListener("DOMContentLoaded", function () {
    const orderBtns = document.querySelectorAll(".order-btn");
    const orderModals = document.querySelectorAll(".order-modal");
    const orderBtn = document.getElementById("orderBtn");
    const orderDetails = document.getElementById("orderDetails");
    const orderList = document.getElementById("orderList");
    const totalPriceElement = document.getElementById("totalPrice");

    let orderItems = [];
    let totalPrice = 0;

    document.getElementById('orderBtn').addEventListener('click', function() {
        document.getElementById('orderDetails').style.display = 'block';
    });
    
    document.getElementById('closeBtn').addEventListener('click', function() {
        document.getElementById('orderDetails').style.display = 'none';
    });

    orderBtn.addEventListener("click", function () {
        if (orderItems.length > 0) {
            orderDetails.style.display = "block";
            renderOrderDetails();
        } else {
            alert("Siz hali buyurtma bermadingiz!");
        }
    });

    function addToOrder(foodName, price, count) {
        orderItems.push({ name: foodName, price: price, count: count });
        totalPrice += price * count;
    }

    function renderOrderDetails() {
        orderList.innerHTML = '';
        orderItems.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.count}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>$${(item.price * item.count).toFixed(2)}</td>
            `;
            orderList.appendChild(row);
        });

        totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
    }

    orderBtns.forEach((orderBtn, index) => {
        const modal = orderModals[index];
        const minusBtn = modal.querySelector(".minus-btn");
        const plusBtn = modal.querySelector(".plus-btn");
        const countElement = modal.querySelector(".count");
        const confirmBtn = modal.querySelector(".confirm-btn");

        let count = 1;

        orderBtn.addEventListener("click", function () {
            modal.classList.add("active");
        });

        minusBtn.addEventListener("click", function () {
            if (count > 1) {
                count--;
                countElement.textContent = count;
            }
        });

        plusBtn.addEventListener("click", function () {
            count++;
            countElement.textContent = count;
        });

        confirmBtn.addEventListener("click", function () {
            modal.classList.remove("active");

            const foodName = modal.closest('.food-item').querySelector('.food-info h3').textContent;
            const price = parseFloat(modal.closest('.food-item').querySelector('.food-info .price').textContent.replace('$', ''));

            addToOrder(foodName, price, count);
        });
    });

    window.addEventListener("click", function (event) {
        orderModals.forEach(modal => {
            if (event.target === modal) {
                modal.classList.remove("active");
            }
        });
    });
});
