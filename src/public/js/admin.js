function openEditModal(id, name, description, imageUrl, price, category) {
    document.getElementById("editId").value = id;
    document.getElementById("editName").value = name;
    document.getElementById("editDescription").value = description;
    document.getElementById("editImage").value = imageUrl;
    document.getElementById("editPrice").value = price;
    document.getElementById("editCategory").value = category;
  
    document.getElementById("editForm").action = `/foods/update/${id}`;
    document.getElementById("editModal").style.display = "flex";
  }
  
  function closeModal() {
    document.getElementById("editModal").style.display = "none";
  }
  