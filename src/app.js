//local default display city and date
let displayCity = document.querySelector("#display-city");
let displayDate = document.querySelector("#display-date");
let localTime = moment.tz.guess();

let cityName = localTime.replace("_", " ").split("/")[1];
let cityDate = moment().tz(localTime).format("dddd, MMMM Do YYYY");

displayCity.innerHTML = cityName;
displayDate.innerHTML = cityDate;

//changing country in select
let selectCountry = document.querySelector("#country");
