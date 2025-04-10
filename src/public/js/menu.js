document.addEventListener("DOMContentLoaded", function () {
    const orderBtns = document.querySelectorAll(".order-btn");
    const orderModals = document.querySelectorAll(".order-modal");
    const orderBtn = document.getElementById("orderBtn");
    const orderDetails = document.getElementById("orderDetails");
    const orderList = document.getElementById("orderList");
    const totalPriceElement = document.getElementById("totalPrice");
    const closeBtn = document.getElementById("closeBtn");

    let orderItems = [];
    let totalPrice = 0;

    // Buyurtma oynasini ochish
    orderBtn.addEventListener("click", function () {
        if (orderItems.length > 0) {
            orderDetails.style.display = "block";
            renderOrderDetails();
        } else {
            alert("Siz hali buyurtma bermadingiz!");
        }
    });

    // Buyurtma oynasini yopish
    closeBtn.addEventListener("click", function () {
        orderDetails.style.display = "none";
    });

    // Buyurtmaga qo‘shish funksiyasi
    function addToOrder(foodName, price, count) {
        orderItems.push({ name: foodName, price: price, count: count });
        totalPrice += price * count;
    }

    // Buyurtmalar ro‘yxatini chiqarish
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

    // Har bir taom uchun modal va hisoblashlar
    orderBtns.forEach((btn, index) => {
        const modal = orderModals[index];
        const minusBtn = modal.querySelector(".minus-btn");
        const plusBtn = modal.querySelector(".plus-btn");
        const countElement = modal.querySelector(".count");
        const confirmBtn = modal.querySelector(".confirm-btn");

        let count = 1;
        countElement.textContent = count;

        // Modal ochilishi
        btn.addEventListener("click", function () {
            count = 1;
            countElement.textContent = count;
            modal.classList.add("active");
        });

        // + bosilganda
        plusBtn.addEventListener("click", function () {
            count++;
            countElement.textContent = count;
        });

        // - bosilganda
        minusBtn.addEventListener("click", function () {
            if (count > 1) {
                count--;
                countElement.textContent = count;
            }
        });

        // Tasdiqlash tugmasi
        confirmBtn.addEventListener("click", function () {
            modal.classList.remove("active");

            const foodCard = modal.closest('.food-item');
            const foodName = foodCard.querySelector('.food-info h3').textContent;
            const price = parseFloat(foodCard.querySelector('.food-info .price').textContent.replace('$', ''));

            addToOrder(foodName, price, count);
        });
    });

    // Modal tashqarisiga bosilganda yopish
    window.addEventListener("click", function (event) {
        orderModals.forEach(modal => {
            if (event.target === modal) {
                modal.classList.remove("active");
            }
        });
    });
});

// Scrollda nav sticky bo‘lishi
window.addEventListener("scroll", function () {
    const nav = document.querySelector(".category-nav");
    const header = document.querySelector(".header");
    const headerHeight = header ? header.offsetHeight : 0;

    if (window.scrollY > headerHeight) {
        nav.classList.add("sticky");
    } else {
        nav.classList.remove("sticky");
    }
});
