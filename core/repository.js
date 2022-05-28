const DEFAULT_STORAGE = 'todoList';

const getItems = () => JSON.parse(localStorage.getItem(DEFAULT_STORAGE) || '[]');
const setItem = (item) => {
  const items = getItems();
  const updateItems = [...items, item];

  localStorage.setItem(DEFAULT_STORAGE, JSON.stringify(updateItems));
};
const updateItem = (updateItem) => {
  const items = getItems();
  const itemIndex = items.findIndex((item) => item.index === updateItem.index);

  items[itemIndex] = updateItem;
  localStorage.setItem(DEFAULT_STORAGE, JSON.stringify(items));
};
const deleteItem = (index) => {
  const items = getItems();

  const updateItems = items.filter((item) => item.index !== index);
  localStorage.setItem(DEFAULT_STORAGE, JSON.stringify(updateItems));
};

export { getItems, setItem, updateItem, deleteItem };
