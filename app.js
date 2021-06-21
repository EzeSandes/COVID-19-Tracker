const getJSON = function (url, errorMsg = `Something went wrong`) {
   return fetch(url).then(response => {
      if (!response.ok)
         throw new Error(`${errorMsg} (${response.status})`);

      return response.json();
   });
};


// const api = fetch(`https://disease.sh/v3/covid-19/countries/Argentina?strict=true`);

// console.log(api);
// api.then(res => {
//    console.log(res)
//    res.json().then(data => console.log(data));
// });


/******************  Get visitor's location *****************/

const getCOVIDdata = function (country) {
   getJSON(`https://disease.sh/v3/covid-19/countries/${country}?strict=true`).then(data => {

      const { cases: totalCases, deaths: totalDeaths, todayCases, todayDeaths, recovered, active } = data;

      console.log(totalCases, totalDeaths);
   });
};


const getPosition = function () {
   return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
   });
};

const whereAmI = function () {
   getPosition().then(pos => {
      const { latitude: lat, longitude: long } = pos.coords;
      return fetch(`https://geocode.xyz/${lat},${long}?geoit=json`);

   }).then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);

      return res.json();

   }).then(data => {
      getCOVIDdata(data.country);
   }).catch(error => console.error(`${error.message} !!`));
};

// whereAmI();

