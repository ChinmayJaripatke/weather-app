// Function for the user to enter the city name:

function showCityName() {
    cityName = document.getElementById("city").value;
    console.log(cityName);

    // Selectors:
    let temperatureDegree = document.querySelector(".temperature-degree");
    let temperatureDescription = document.querySelector(".temperature-description");
    let locationName = document.querySelector(".location-name");
    let weatherIcon = document.querySelector(".weather-icon");
    let trip = document.querySelector(".trip");

    const api = `https://api.weatherapi.com/v1/current.json?key= 563ccb8dc2234ebca6e61510210101&q=${cityName}`;

    // Fetching the API:

    fetch(api)
        .then(reponse => {
            return reponse.json(); // Converting the response to a json format.
        })
        .then(data => {
            console.log(data);

            // Detstructuring the objects and displaying the data that we need:
            const { temp_c } = data.current;
            temperatureDegree.textContent = temp_c;

            const { text } = data.current.condition;
            temperatureDescription.textContent = text;

            const { name } = data.location;
            locationName.textContent = name;
            trip.innerHTML = `<button type="button" class="btn btn-lg btn-success"><a href="https://www.makemytrip.com/hotels/${cityName}-hotels.html">Plan a trip to ${cityName} now!</a></button>`


            const { icon } = data.current.condition;
            weatherIcon.innerHTML = `<img src="${icon}" alt="icon-img">`;
        })


}

// Function for user location's weather:

function userLocation() {
    let long;
    let lat;
    let temperatureDegree = document.querySelector(".temperature-degree");
    let temperatureDescription = document.querySelector(".temperature-description");
    let locationName = document.querySelector(".location-name");
    let weatherIcon = document.querySelector(".weather-icon");
    let noLocation = document.querySelector(".no-location");


    // If the location is enabled we call 'getPosSuccess' and if it's not we call 'getPosErr':
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(getPosSuccess, getPosErr);
    } else {
        alert('Enable location!')
    }


    // Function if we get the user's location. We start fetching data from the API.
    function getPosSuccess(position) {

        long = position.coords.longitude;
        lat = position.coords.latitude;


        const proxy = `https://cors-anywhere.herokuapp.com/`;
        const api = `https://api.weatherapi.com/v1/current.json?key= 563ccb8dc2234ebca6e61510210101&q=${lat},${long}`;

        fetch(api)
            .then(reponse => {
                return reponse.json();
            })
            .then(data => {
                console.log(data);

                const { temp_c } = data.current;
                temperatureDegree.textContent = temp_c;

                const { text } = data.current.condition;
                temperatureDescription.textContent = text;

                const { name } = data.location;
                locationName.textContent = name;

                const { icon } = data.current.condition;
                weatherIcon.innerHTML = `<img src="${icon}" alt="icon-img">`;
            })
    }

    // If we don't get the access to the user's location, we alert the user about it:
    function getPosErr(err) {
        switch (err.code) {
            case err.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.");
                noLocation.innerHTML = `<h1>Please enable location and then refresh the page.</h1>`;
                break;
            case err.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.");
                noLocation.innerHTML = `<h1>Please enable location and then refresh the page.</h1>`;
                break;
            case err.TIMEOUT:
                alert("The request to get user location timed out.");
                noLocation.innerHTML = `<h1>Please enable location and then refresh the page.</h1>`;
                break;
            default:
                alert("An unknown error occurred.");
                noLocation.innerHTML = `<h1>Please enable location and then refresh the page.</h1>`;
        }
    }

}




// URL: https://api.weatherapi.com/v1/current.json?key= apiKey&q=London
// URL MMT : https://www.makemytrip.com/hotels/chennai-hotels.html