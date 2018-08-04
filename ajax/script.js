$(document).ready(function () {

    var appId = '8264281041147d9a5ec6fcb61f798642',
        url = 'https://api.openweathermap.org/data/2.5/forecast?q=Zaporizhzhia&units=metric&lang=ua&APPID=' + appId,
        request = $.ajax({
            url: url,
            method: "GET",
            dataType: "json"
        }),
        $city = $('#city'),
        $cityDetails = $('#cityDetails'),
        $weather = $('#weather');

    request.done(function(msg) {
        console.log(msg);
        display(msg);
    });

    request.fail(function( jqXHR, textStatus ) {
        alert( "Request failed: " + textStatus );
    });

    function display(msg) {
        var cityData = msg.city;

        $city.text(cityData.name);
        $cityDetails.text('Country: ' + cityData.country + ' ' + " coords: " + cityData.coord.lon + ' / ' + cityData.coord.lat);

        var weather = msg.list;
        var weatherHtml = '';

        for(var i = 0; i < weather.length; i++) {
            weatherHtml += '<p>' + weather[i].dt_txt + ' ' + weather[i].main.temp + '&deg;C' + ' ';
            weatherHtml += '<img src="http://openweathermap.org/img/w/'+ weather[i].weather[0].icon + '.png" alt="' + weather[i].weather[0].description + '"></p>';
        }

        $weather.html(weatherHtml);
    }

});