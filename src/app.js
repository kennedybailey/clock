let displayCity = document.querySelector("#display-city");
let localTime = moment.tz.guess();
displayCity.innerHTML = localTime;

let selectCountry = document.querySelector("#country");
