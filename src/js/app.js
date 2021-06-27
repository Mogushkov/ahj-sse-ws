import Chat from './Chat';

const ws = new WebSocket('wss://ahj-sse-ws-serv.herokuapp.com');
const chat = new Chat(document.querySelector('.container'));

const form = document.querySelector('.form');
const textarea = document.querySelector('.textarea');
let nickname = null;

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (ws.readyState === 1) {
    const body = { type: 'authorization', name: form.name.value };
    ws.send(JSON.stringify(body));
  }
});

textarea.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const body = {
      type: 'message', user: nickname, time: chat.getDate(), message: textarea.value,
    };
    ws.send(JSON.stringify(body));
    textarea.value = '';
  }
});

ws.onmessage = (response) => {
  const data = JSON.parse(response.data);

  if (data.type === 'authorization') {
    if (!data.name) {
      document.querySelector('.mistake').classList.add('active');
    } else {
      nickname = data.name;
      form.name.value = '';
      document.querySelector('.modal').classList.add('hidden');
      document.querySelector('.chat').classList.remove('hidden');
    }
  }

  if (data.type === 'message') {
    const { user, time, message } = data;
    if (user === nickname) {
      chat.addMessage('you', time, message);
    } else {
      chat.addMessage(user, time, message);
    }
  }

  if (!data.type) {
    chat.users.innerHTML = '';
    data.forEach((elem) => {
      if (elem === nickname) {
        chat.addUser('You');
      } else {
        chat.addUser(elem);
      }
    });
  }
};

window.onbeforeunload = () => {
  const body = { type: 'disconnect', name: nickname };
  ws.send(JSON.stringify(body));
  ws.close();
};
