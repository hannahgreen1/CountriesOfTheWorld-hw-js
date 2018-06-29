const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const Countries = function (url) {
  this.url = url;
  this.countries = [];
};
