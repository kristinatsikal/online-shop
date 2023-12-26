document.addEventListener('DOMContentLoaded', function () {
    // Render existing items on page load
    renderItems();
  });
  
  function openCreateForm() {
    const createForm = document.getElementById('createForm');
    createForm.style.display = 'block';
  }
  
  window.openCreateForm = openCreateForm;
  window.createNewItem = createNewItem;
