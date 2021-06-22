const countryUser = document.querySelector('.country-name');
const countryFlag = document.querySelector('.country-flag');
const activeCasesNum = document.getElementById('active-cases-num');
const todayCasesNum = document.getElementById('today-cases-num');
const todayDeathsNum = document.getElementById('today-deaths-num');
const totalCasesNum = document.getElementById('total-cases-num');
const totalDeathsNum = document.getElementById('total-deaths-num');
const totalRecoveredNum = document.getElementById('recovered-num');


const getJSON = function (url, errorMsg = `Something went wrong`) {
   return fetch(url).then(response => {
      if (!response.ok)
         throw new Error(`${errorMsg} (${response.status})`);

      return response.json();
   });
};

const numberWithCommas = function (x) {
   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/******************  Get visitor's location *****************/

const renderCOVIDdata = function (country) {
   getJSON(`https://disease.sh/v3/covid-19/countries/${country}?strict=true`).then(data => {

      const { cases: totalCases, deaths: totalDeaths, countryInfo, todayCases, todayDeaths, recovered, active } = data;

      countryUser.innerText = country;
      countryFlag.src = `${countryInfo.flag}`;
      activeCasesNum.innerText = numberWithCommas(active);
      todayCasesNum.innerText = numberWithCommas(todayCases);
      todayDeathsNum.innerText = numberWithCommas(todayDeaths);
      totalCasesNum.innerText = numberWithCommas(totalCases);
      totalDeathsNum.innerText = numberWithCommas(totalDeaths);
      totalRecoveredNum.innerText = numberWithCommas(recovered);
   });
};


const getPosition = function () {
   return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
   });
};

const getCountryUser = function () {
   getPosition().then(pos => {
      const { latitude: lat, longitude: long } = pos.coords;
      // return fetch(`https://geocode.xyz/${lat},${long}?geoit=json`);
      return fetch(`https://nominatim.geocoding.ai/reverse.php?lat=${lat}&lon=${long}&format=jsonv2`);

   }).then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);

      return res.json();

   }).then(data => {
      renderCOVIDdata(data.address.country);
   }).catch(error => console.error(`${error.message} !!`));
};

/****** Render data of User's country****/
getCountryUser();

/**************** TESTS by country ***** */
// (Add another one or Uncomment for what you want and comment 'getCountryUser()')

// renderCOVIDdata('Germany');
// renderCOVIDdata('Argentina');
// renderCOVIDdata('Spain');
// renderCOVIDdata('USA');
// renderCOVIDdata('England');
