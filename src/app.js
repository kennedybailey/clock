//local default display city and date
let displayCity = document.querySelector("#display-city");
let displayDate = document.querySelector("#display-date");
let localTime = moment.tz.guess();
let currentTimeZone = localTime;
let cityName = localTime.replace("_", " ").split("/")[1];
let cityDate = moment().tz(localTime).format("LLLL");

displayCity.innerHTML = cityName;
displayDate.innerHTML = cityDate;

//default clock
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.9;
setInterval(drawClock, 1000);

function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius, currentTimeZone);
}

function drawFace(ctx, radius) {
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.strokeStyle = "#000";
  ctx.lineWidth = radius * 0.01;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.07, 0, 2 * Math.PI);
  ctx.fillStyle = "#333";
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  var ang;
  var num;
  ctx.font = radius * 0.15 + "px arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  for (num = 1; num < 13; num++) {
    ang = (num * Math.PI) / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius, currentTimeZone) {
  var hour = moment().tz(currentTimeZone).hour();
  var minute = moment().tz(currentTimeZone).minute();
  var second = moment().tz(currentTimeZone).second();
  //hour
  hour = hour % 12;
  hour =
    (hour * Math.PI) / 6 +
    (minute * Math.PI) / (6 * 60) +
    (second * Math.PI) / (360 * 60);
  drawHand(ctx, hour, radius * 0.5, radius * 0.03, "#000");
  //minute
  minute = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);
  drawHand(ctx, minute, radius * 0.8, radius * 0.03, "#000");
  // second
  second = (second * Math.PI) / 30;
  drawHand(ctx, second, radius * 0.9, radius * 0.01, "#9abc9a");
}

function drawHand(ctx, pos, length, width, color) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.strokeStyle = color;
  //ctx.lineCap = "round";
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}

//changing country in select
function changeCountry(event) {
  if (event.target.value === "toronto") {
    displayCity.innerHTML = event.target.value;
    currentTimeZone = "America/Toronto";
  } else if (event.target.value === "paris") {
    displayCity.innerHTML = event.target.value;
    currentTimeZone = "Europe/Paris";
  } else if (event.target.value === "brisbane") {
    displayCity.innerHTML = event.target.value;
    currentTimeZone = "Australia/Brisbane";
  } else if (event.target.value === "local") {
    currentTimeZone = localTime;
    cityName = localTime.replace("_", " ").split("/")[1];
    displayCity.innerHTML = cityName;
  }
  displayDate.innerHTML = moment().tz(currentTimeZone).format("LLLL");
}

let selectCountry = document.querySelector("#country");
selectCountry.addEventListener("change", changeCountry);
