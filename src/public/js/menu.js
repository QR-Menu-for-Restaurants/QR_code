document.addEventListener("DOMContentLoaded", function () {
    const likeIcons = document.querySelectorAll(".like-icon");
    const cartIcons = document.querySelectorAll(".cart-icon");

    likeIcons.forEach(likeIcon => {
        likeIcon.addEventListener("click", function () {
            console.log("Like icon clicked!");
            this.classList.toggle("bxs-heart");
            this.classList.toggle("bx-heart");
            this.classList.toggle("active");
        });
    });

    cartIcons.forEach(cartIcon => {
        cartIcon.addEventListener("click", function () {
            this.classList.toggle("added");
        });
    });
});
