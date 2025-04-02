
function openEditModal(id, name) {
    document.getElementById('editId').value = id;
    document.getElementById('editName').value = name;
    document.getElementById('editForm').action = `/categories/update/${id}`;
    const modal = document.getElementById('editModal');
    modal.classList.add('show');
    setTimeout(() => modal.style.display = 'flex', 10);
}

function closeModal() {
    const modal = document.getElementById('editModal');
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300);
}

async function deleteCategory(id) {
    if (!confirm("Rostdan ham o‘chirmoqchimisiz?")) return;

    const categoryElement = document.getElementById(`category-${id}`);
    categoryElement.classList.add("deleting");

    setTimeout(async () => {
        try {
            const response = await fetch(`/categories/${id}`, { method: 'DELETE' });

            if (response.ok) {
                categoryElement.remove();
                alert("Kategoriya o‘chirildi!");
            } else {
                alert("Xatolik yuz berdi!");
                categoryElement.classList.remove("deleting");
            }
        } catch (error) {
            console.error("Xatolik:", error);
            alert("Server bilan bog‘lanishda xatolik!");
            categoryElement.classList.remove("deleting");
        }
    }, 300);
}