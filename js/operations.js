let itemsArray = [
  { name: 'Футболка з довгим рукавом', price: 20, category: 'Футболки' },
  { name: 'Футболка з коротким рукавом', price: 25, category: 'Футболки' },
  { name: 'Джинси', price: 40, category: 'Штани' },
  { name: 'Легінси', price: 30, category: 'Штани' },
  { name: 'Пальто', price: 60, category: 'Верхній одяг' },
  { name: 'Куртка', price: 45, category: 'Верхній одяг' },
  { name: 'Дублянка', price: 70, category: 'Верхній одяг' },
  // і так далі...
];

const itemsKey = 'items';

function getItems() {
  const storedItems = localStorage.getItem(itemsKey);
  return storedItems ? JSON.parse(storedItems) : [];
}

function setItems(items) {
  localStorage.setItem(itemsKey, JSON.stringify(items));
}

function getSelectedItem() {
  // Реалізуйте логіку отримання обраного елемента (ви можете використовувати id, наприклад)
  // Повертаєте елемент для редагування
}

function editItem(item, newName, newPrice) {
  item.name = newName;
  item.price = parseFloat(newPrice);
  setItems(getItems());
  renderItems();
}

function renderItems(filteredItems) {
  const itemsContainer = document.getElementById('itemList');
  const categoryListContainer = document.getElementById('categoryList');

  itemsContainer.innerHTML = '';
  categoryListContainer.innerHTML = '';

  const items = filteredItems || getItems();
  const categories = getCategories(items);

  categories.forEach(category => {
    const li = document.createElement('li');
    li.textContent = category;
    li.onclick = () => filterByCategory(category);
    categoryListContainer.appendChild(li);
  });

  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price}`;

    const editButton = createButton('Edit', () => openEditForm(item));
    li.appendChild(editButton);

    const deleteButton = createButton('Delete', () => confirmDeleteItem(item));
    li.appendChild(deleteButton);

    itemsContainer.appendChild(li);
  });
}

function getCategories(items) {
  const categoriesSet = new Set(items.map(item => item.category));
  return Array.from(categoriesSet);
}

function createButton(text, clickHandler) {
  const button = document.createElement('button');
  button.textContent = text;
  button.onclick = clickHandler;
  return button;
}

function openEditForm(item) {
  const editForm = document.getElementById('editForm');
  document.getElementById('editItemName').value = item.name;
  document.getElementById('editItemPrice').value = item.price;
  editForm.style.display = 'block';
}

function saveEditedItem() {
  const itemName = document.getElementById('editItemName').value;
  const itemPrice = document.getElementById('editItemPrice').value;

  // Отримайте поточний вибраний товар для редагування
  const selectedItem = getSelectedItem();

  // Викличте функцію редагування
  editItem(selectedItem, itemName, itemPrice);

  closeEditForm();
}

function filterByCategory(category) {
  const items = getItems();
  const filteredItems = items.filter(item => item.category === category);
  renderItems(filteredItems);
}

function confirmDeleteItem(item) {
  const confirmation = confirm('Are you sure you want to delete this item?');

  if (confirmation) {
    deleteItem(item);
  }
}

function deleteItem(item) {
  const items = getItems();
  const updatedItems = items.filter(i => !isEqual(i, item));
  console.log('Deleting item:', item);
  setItems(updatedItems);
  renderItems();
}

function isEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

function createNewItem() {
  const itemNameInput = document.getElementById('itemName');
  const itemPriceInput = document.getElementById('itemPrice');
  const itemCategoryInput = document.getElementById('itemCategory');

  const itemName = itemNameInput.value;
  const itemPrice = parseFloat(itemPriceInput.value);
  const itemCategory = itemCategoryInput.value;

  if (itemName && !isNaN(itemPrice) && itemCategory) {
    const newItem = { name: itemName, price: itemPrice, category: itemCategory };
    const items = getItems();
    items.push(newItem);
    setItems(items);
    renderItems();

    itemNameInput.value = '';
    itemPriceInput.value = '';
    itemCategoryInput.value = '';

    document.getElementById('createForm').style.display = 'none';
  } else {
    alert('Please enter name, price, and category.');
  }
}

function sortItems(parameter) {
  const items = getItems();

  items.sort((a, b) => {
    const valueA = typeof a[parameter] === 'number' ? a[parameter] : a[parameter].toLowerCase();
    const valueB = typeof b[parameter] === 'number' ? b[parameter] : b[parameter].toLowerCase();

    if (valueA < valueB) return -1;
    if (valueA > valueB) return 1;
    return 0;
  });

  setItems(items);
  renderItems();
}


function searchItemsByName(name) {
  const items = getItems();

  const filteredItems = items.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));

  renderItems(filteredItems);
}

function calculateTotalSum(parameter) {
  const items = getItems();

  const totalSum = items.reduce((sum, item) => sum + item[parameter], 0);

  alert(`Total ${parameter}: $${totalSum}`);
}
