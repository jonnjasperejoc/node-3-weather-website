const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url =
        ("https://api.darksky.net/forecast/504a1ef97089ee2092b52dec561a9b0e/" + latitude + "," + longitude);
    request({
        url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            const temperature = body.currently.temperature;
            const precipProbability = body.currently.precipProbability;
            const summary = body.daily.data[0].summary;
            callback("undefined", summary + " It is currently " + convertToCelcius(temperature) + " degrees out. The high today is " + convertToCelcius(body.daily.data[0].temperatureHigh) + " with a low of " + convertToCelcius(body.daily.data[0].temperatureLow) + " There is a " + precipProbability + "% chance of rain.");
        }
    });
}

const convertToCelcius = (temperature) => Math.round((temperature - 32) * (5 / 9));

module.exports = forecast;