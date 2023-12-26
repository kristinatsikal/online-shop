function getItems() {
    return JSON.parse(localStorage.getItem('items')) || [];
  }
  
  function setItems(items) {
    localStorage.setItem('items', JSON.stringify(items));
  }
  
  function renderItems(filteredItems) {
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = ''; 
  
    const items = filteredItems || getItems();
  
    items.forEach((item, index) => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - $${item.price}`;
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.onclick = () => openEditForm(index);
      li.appendChild(editButton);
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = () => confirmDeleteItem(index);
      li.appendChild(deleteButton);
  
      itemList.appendChild(li);
    });
  }
  
  function openEditForm(index) {
    const items = getItems();
    const item = items[index];
  
    const itemName = prompt('Enter new name:', item.name);
    const itemPrice = prompt('Enter new price:', item.price);
  
    if (itemName !== null && itemPrice !== null) {
      items[index] = { name: itemName, price: parseFloat(itemPrice) };
      setItems(items);
      renderItems();
    }
  }
  

  function confirmDeleteItem(index) {
    const confirmation = confirm('Are you sure you want to delete this item?');
  
    if (confirmation) {
      deleteItem(index);
    }
  }
  

  function deleteItem(index) {
    const items = getItems();
    items.splice(index, 1);
    setItems(items);
    renderItems();
  }
  

  function createNewItem() {
    const itemName = document.getElementById('itemName').value;
    const itemPrice = document.getElementById('itemPrice').value;
  
    if (itemName && itemPrice) {
      const newItem = { name: itemName, price: parseFloat(itemPrice) };
      const items = getItems();
      items.push(newItem);
      setItems(items);
      renderItems();
  
      document.getElementById('itemName').value = '';
      document.getElementById('itemPrice').value = '';
  
      document.getElementById('createForm').style.display = 'none';
    } else {
      alert('Please enter both name and price.');
    }
  }
  
  function sortItems(parameter) {
    const items = getItems();
  
    items.sort((a, b) => {
      if (a[parameter] < b[parameter]) return -1;
      if (a[parameter] > b[parameter]) return 1;
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
  
  const newItem = { name: itemName, price: parseFloat(itemPrice), imgSrc: 'path/to/image.jpg' };
  li.innerHTML = `
  <img src="${item.imgSrc}" alt="${item.name}" style="max-width: 100%;">
  <p>${item.name} - $${item.price}</p>
  <button class="edit" onclick="editItem(${item.id})">Edit</button>
  <button class="delete" onclick="deleteItem(${item.id})">Delete</button>
`;
