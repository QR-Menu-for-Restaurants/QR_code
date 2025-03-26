
let currentEditIndex = null;
// function renderFoods() {
//     const foodList = document.getElementById('foodList');
//     foodList.innerHTML = '';
//     foods.forEach((food, index) => {
//         foodList.innerHTML += `
//             <div class="food-item">
//                 <p class="category">${food.category}</p>
//                 <img src="${food.image}" alt="Food Image">
//                 <h2>${food.name}</h2>
//                 <p class="desc">${food.description}</p>
//                 <p class="price">Price: $${food.price}</p>
//                 <div>
//                     <button onclick="openEditModal(${index})" class="update">Update</button>
//                     <button onclick="deleteFood(${index})"class="delete">Delete</button>
//                 </div>
//             </div>`;
//         });
//     }
function addFood() {
    const name = document.getElementById('foodName').value;
    const description = document.getElementById('foodDescription').value;
    const image = document.getElementById('foodImage').value;
    const price = document.getElementById('foodPrice').value;
    const category = document.getElementById('foodCategory').value;
    if (name && description && image && price && category) {
        foods.push({ name, description, image, price });
        document.getElementById('foodName').value = '';
        document.getElementById('foodDescription').value = '';
        document.getElementById('foodImage').value = '';
        document.getElementById('foodPrice').value = '';
        document.getElementById('foodCategory').value = '';
        // renderFoods();
    }
}
function deleteFood(index) {
    foods.splice(index, 1);
    location.reload();
}
function openEditModal(index) {
    currentEditIndex = index;
    document.getElementById('editName').value = foods[index].name;
    document.getElementById('editDescription').value = foods[index].description;
    document.getElementById('editImage').value = foods[index].image;
    document.getElementById('editPrice').value = foods[index].price;
    document.getElementById('editCategory').value = foods[index].category_id;
    document.getElementById('editModal').style.display = 'flex';
}
function saveEdit() {
    foods[currentEditIndex] = {
        name: document.getElementById('editName').value,
        description: document.getElementById('editDescription').value,
        image: document.getElementById('editImage').value,
        price: document.getElementById('editPrice').value,
        category: document.getElementById('editCategory').value
    };
    closeModal();
    renderFoods();
}
function closeModal() {
    document.getElementById('editModal').style.display = 'none';
}