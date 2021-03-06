const PubSub = require('../helpers/pub_sub.js');
const ListView = require('./list_view.js');

const CountryView = function (container) {
  this.container = container;
};
CountryView.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:selected-country-ready', (evt) => {
    this.clearCountry();
    this.render(evt.detail);
  });
};

CountryView.prototype.render = function (country) {
  const countryName = this.createElement('h2', country.name);
  this.container.appendChild(countryName);

  const regionTitle = this.createElement('h3', 'Region:');
  this.container.appendChild(regionTitle);

  const countryRegion = this.createElement('p', country.region);
  this.container.appendChild(countryRegion);

  const capitalTitle = this.createElement('h3', 'Capital City:');
  this.container.appendChild(capitalTitle);

  const capitalCity = this.createElement('p', country.capital);
  this.container.appendChild(capitalCity);


  const countryLanguagesListView = new ListView(this.container);
  countryLanguagesListView.render('Languages', country.languages, 'name');

  const countryBorderingCountriesListView = new ListView(this.container);
  countryBorderingCountriesListView.render('Bordering Countries', country.borderingCountries, 'name');

  const countryPopulationTitle = this.createElement('h3', 'Country Population:');
  this.container.appendChild(countryPopulationTitle);

  const countryPopulation = this.createElement('p', country.population);
  this.container.appendChild(countryPopulation);

};

CountryView.prototype.createElement = function (elementType, text) {
  const element = document.createElement(elementType);
  element.textContent = text;
  return element;
};

CountryView.prototype.clearCountry = function () {
  this.container.innerHTML = '';
};

module.exports = CountryView;
