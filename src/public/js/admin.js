function openEditModal(id, name, description, price) {
  console.log("keldi");

  document.getElementById("editId").value = id;
  document.getElementById("editName").value = name;
  document.getElementById("editDescription").value = description;
  document.getElementById("editPrice").value = +price;
  document.getElementById("editForm").action = `/foods/update/${id}`;
  document.getElementById("editModal").style.display = "flex";
}


function closeModal() {
  document.getElementById("editModal").style.display = "none";
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});

async function deleteFood(id) {
  if (!confirm("Rostdan ham o‘chirmoqchimisiz?")) return;

  const foodElement = document.getElementById(`foods-${id}`);
  foodElement.classList.add("deleting");

  setTimeout(async () => {
    try {
      const response = await fetch(`/foods/delete/${id}`, { method: 'DELETE' });

      if (response.ok) {
        foodElement.remove();  
        alert("Taom o‘chirildi!");
      } else {
        alert("Xatolik yuz berdi!");
        foodElement.classList.remove("deleting");
      }
    } catch (error) {
      console.error("Xatolik:", error);
      alert("Server bilan bog‘lanishda xatolik!");
      foodElement.classList.remove("deleting");
    }
  }, 300);
}
