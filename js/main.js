document.addEventListener('DOMContentLoaded', function() {
  renderItems();
});

function openCreateForm() {
  const createForm = document.getElementById('createForm');
  createForm.style.display = 'block';
}

window.openCreateForm = openCreateForm;
window.createNewItem = createNewItem;


