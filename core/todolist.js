import { setItem, getItems, updateItem, deleteItem } from './repository.js';

const store = {
  updateIndex: 0,
};

export default function todoList() {
  const setTodoList = () => {
    const $title = document.querySelector('.title');
    const $date = document.querySelector('.date');
    const $time = document.querySelector('.time');
    const $button = document.querySelector('.submit');

    if (!$title.value.length) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (!$date.value.length) {
      alert('날짜를 입력해주세요.');
      return;
    }

    const timeFormat = /^([01][0-9]|2[0-3]):([0-5][0-9])$/;
    if (!timeFormat.test($time.value)) {
      alert('시간을 올바르게 입력해주세요.');
      return;
    }

    const params = {
      title: $title.value,
      date: $date.value,
      time: $time.value,
      index: store.updateIndex || new Date().getTime(),
    };

    !store.updateIndex ? setItem(params) : updateItem(params);
    store.updateIndex = 0;
    $button.innerHTML = '입력';

    getTodoList();

    $title.value = '';
    $date.value = '';
    $time.value = '';
  };

  const getTodoList = () => {
    const list = getItems().sort((a, b) => {
      if (a.index > b.index) return 1;
      if (a.index === b.index) return 0;
      if (a.index < b.index) return -1;
    });
    const $todoList = document.querySelector('.todo__list');
    const template = `
      ${list.map(({ title, date, time, index }) => `
        <li data-index="${index}">
          <p>${title}</p>
          <p>${date} ${time}</p>
          <button class="update" type="button">수정</button>
          <button class="delete" type="button">삭제</button>
        </li>
      `).join('')}
    `;

    $todoList.innerHTML = template;
  };

  const getUpdateItem = (index) => {
    const list = getItems();
    const [ updateItem ] = list.filter((item) => item.index === index );

    document.querySelector('.title').value = updateItem.title;
    document.querySelector('.date').value = updateItem.date;
    document.querySelector('.time').value = updateItem.time;
    document.querySelector('.submit').innerHTML = '수정';

    store.updateIndex = index;
  };

  const deleteTodoList = (index) => {
    if (!confirm('삭제하시겠습니까?')) return;

    deleteItem(index);
    getTodoList();
  };

  return {
    setTodoList,
    getTodoList,
    getUpdateItem,
    deleteTodoList,
  };
};
