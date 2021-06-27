/* eslint-disable class-methods-use-this */
const moment = require('moment');

export default class Chat {
  constructor(container) {
    this.container = container;
    this.textarea = this.container.querySelector('.textarea');
    this.users = this.container.querySelector('.users__list');
    this.messages = this.container.querySelector('.messages__list');
  }

  addUser(user) {
    const li = document.createElement('li');
    li.classList.add('user__item');
    const imgDiv = document.createElement('div');
    imgDiv.classList.add('img');
    const name = document.createElement('span');
    name.classList.add('user__name');
    name.textContent = user;
    li.append(imgDiv);
    li.append(name);
    this.users.append(li);
  }

  addMessage(user, timestap, message) {
    const li = document.createElement('li');
    li.classList.add('message__item');
    const header = document.createElement('header');
    header.classList.add('message__header');

    if (user === 'you') {
      li.classList.add('message__your');
      header.classList.add('message__header-your');
    }
    const name = document.createElement('span');
    name.classList.add('message__name');
    name.textContent = `${user}, `;
    const time = document.createElement('time');
    time.classList.add('message__time');
    time.textContent = timestap;
    header.append(name);
    header.append(time);
    const div = document.createElement('div');
    div.classList.add('message');
    div.textContent = message;
    li.append(header);
    li.append(div);
    this.messages.append(li);
  }

  getDate() {
    const now = moment();
    const date = now.format('DD.MM.YY hh:mm');
    return date;
  }
}
