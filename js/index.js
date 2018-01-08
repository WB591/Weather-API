var API_KEY = "54d8211b55a55fe455d605d75eb6aa7d";
var cel = false;
var wd;

function displayTemp(fTemp, c) {
  if (c) return Math.round((fTemp - 32) * (5 / 8)) + " C";
  return Math.round(fTemp) + " F";
}

function render(wd, cel) {
  var currentLocation = wd.name;
  var currentWeather = wd.weather[0].description;
  var currentTemp = displayTemp(wd.main.temp, cel);
  var Icon = wd.weather[0].icon;
  var high = wd.main.temp_max;
  var high = wd.main.temp_min;

  $("#currentLocation").html(currentLocation);
  $("#currentTemp").html(currentTemp);
  $("#currentWeather").html(currentWeather);

  var iconSrc = "https://openweathermap.org/img/w/" + Icon + ".png";
  //$('#currentTemp').prepend('<img src = ' + iconSrc + '>');
  $("#icon").html("<img src = " + iconSrc + ">");
}

$(function() {
  var loc;

  $.getJSON("https://ipinfo.io", function(d) {
    console.log("assigning the data...");
    loc = d.loc.split(",");
    console.log(loc);

    $.getJSON(
      "https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=" +
        loc[0] +
        "&lon=" +
        loc[1] +
        "&APPID=" +
        API_KEY,
      function(apiData) {
        wd = apiData;

        render(apiData, cel);

        $("#toggle").click(function() {
          cel = !cel;
          render(wd, cel);
        });
      }
    );
  });
});