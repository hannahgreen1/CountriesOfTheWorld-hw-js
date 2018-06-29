const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const Countries = function (url) {
  this.url = url;
  this.countries = [];
};

Countries.prototype.getData = function () {
  const request = new Request(this.url);
  request.get(data => this.handleData(data));
};

Countries.prototype.bindEvents = function () {
  PubSub.subscribe('SelectView:change', (evt) => {
    selectedIndex = evt.detail;
    const selectedCountry = this.countries[selectedIndex];
    this.addBorderingCountries(selectedCountry);
    PubSub.publish('Countries:selected-country-ready', selectedCountry);
    console.log(selectedIndex);
  });
};

Countries.prototype.handleData = function (data) {
  this.countries = data;
  PubSub.publish('Countries:countries-data-ready', this.countries);
};

Countries.prototype.addBorderingCountries = function (country) {
  country.borderingCountries = this.getBorderingCountries(country);
};

Countries.prototype.getBorderingCountries = function (country) {
  const borderingCountryCodes = this.borderingCountryCodes(country);
  const borderingCountries = this.borderingCountries(borderingCountryCodes);
  return borderingCountries;
};

Countries.prototype.borderingCountryCodes = function (country) {
  return country.borders;
};

Countries.prototype.borderingCountries = function (borderingCountryCodes) {
  const borderingCountries = borderingCountryCodes.map((countryCode) => {
    return this.countryByCode(countryCode);
  });
  return borderingCountries;
};

Countries.prototype.countryByCode = function (code) {
  return this.countries.find((country) => {
    return country.alpha3Code === code;
  });
};

module.exports = Countries;
