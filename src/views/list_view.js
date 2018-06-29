const PubSub = require('../helpers/pub_sub.js');

const ListView = function (container) {
  this.container = container;
};

ListView.prototype.render = function (title, data, property) {
  const listTitle = this.createTitle(title);
  this.container.appendChild(listTitle);

  if (this.dataIsEmpty(data)) {
    this.handleNoData();
    return;
  }

  const list = this.createList();
  this.populateList(list, data, property);
  this.container.appendChild(list);
};

ListView.prototype.createTitle = function (title) {
  const h3 = document.createElement('h3');
  h3.textContent = `${title}: `;
  return h3;
};

ListView.prototype.createList = function () {
 return document.createElement('ul');
};

ListView.prototype.populateList = function (list, data, property) {
  data.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.textContent = item[property];
    list.appendChild(listItem);
  });
};

ListView.prototype.dataIsEmpty = function (data) {
  return data.length === 0;
};

ListView.prototype.handleNoData = function (data) {
    const message = document.createElement('p');
    message.textContent = 'None';
    this.container.appendChild(message);
};

module.exports = ListView;
