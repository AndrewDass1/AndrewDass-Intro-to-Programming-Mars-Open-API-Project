// Get Form data
let getForm = document.getElementsByTagName("form");
// console.log(getForm);

// Get submitbutton from form
let getFormFirstSubmitButton = document.getElementById("firstSubmitButtonForForm");

// This uses a promise so that's why it returns the data
getFormFirstSubmitButton.addEventListener("click", forFormFirstSubmitButton); 

// This will add the city name onto the HTML page after the user enters it in the textbox
let cityNameTitleTag = document.getElementById("cityNameTitle");

// Declare other variables to display information on HTML page after fetch data is ran
let insertWeatherImage = document.getElementById("insertImageForWeather");
let weatherDescription = document.getElementById("weatherDescription");
let displayTemperatures = document.getElementById("displayTemperatures");

// More variables declared after GETTING first fetch
let getCityDataFromWebsite;
let cityLatitude;
let cityLongitude;

// More variables declared after GETTING second fetch
let getCityStatistics;
let temperature;
let weatherCode;


function forFormFirstSubmitButton(event) {
    event.preventDefault();
    let cityName = getForm[0].enterCity.value;
    let capitalizeCityName = ""; //Clears out previous data if it is in the function

    for (let i = 0; i<cityName.length; i++){
        if (i == 0) {
            capitalizeCityName += cityName[i].toUpperCase();
        }
        else if (i>=1) {
            if (cityName[i] != " " && cityName[i-1] == " ") {
                capitalizeCityName += cityName[i].toUpperCase();
            }
            else {
                capitalizeCityName += cityName[i];
            }
        }
        else {
            console.log("Error");
            // add error to innerhtml
        }
    }

    // Resetting values if submit button is pressed again
    cityNameTitleTag.innerHTML = "";

    insertWeatherImage.src = "";
    insertWeatherImage.width = 0;
    insertWeatherImage.length = 0;

    weatherDescription.innerHTML = "";
    displayTemperatures.innerHTML = "";

    let insertCityNameToAPIURL = "";

    for (let i = 0; i<cityName.length; i++) {
        if (cityName[i] == " ") {
            insertCityNameToAPIURL += "+";
        }
        else {
            insertCityNameToAPIURL += cityName[i];
        }
    }
    console.log(insertCityNameToAPIURL);
    
    // Get City Name Latitude and Longitude with first fetch
    
    fetch('https://geocoding-api.open-meteo.com/v1/search?name=' + insertCityNameToAPIURL + '&count=10&language=en&format=json')
    .then(response => {return response.json()})
    .then( data => 
        {
            getCityDataFromWebsite = data;
            console.log(getCityDataFromWebsite);
            // cityNameTitleTag.innerHTML = capitalizeCityName + " Weather"; Putting it here, will always return weather when the submit button is hit because it will always fetch the url and run the .then()

            cityLatitude = getCityDataFromWebsite.results[0].latitude;
            cityLongitude = getCityDataFromWebsite.results[0].longitude;

            console.log(cityLatitude);
            console.log(cityLongitude);

            // Second fetch gets weather from first fetch's coordinates
            fetch('https://api.open-meteo.com/v1/forecast?latitude=' + String(cityLatitude) + '&longitude=' + String(cityLongitude) + '&current=temperature_2m,weather_code')
             .then(response => {return response.json()})
             .then( data => 
                {   
                    getCityStatistics = data;
                    cityNameTitleTag.innerHTML = capitalizeCityName + " Weather";
                    console.log(getCityStatistics);

                    temperatureInCelsius = getCityStatistics.current.temperature_2m;

                    temperatureInFarhenheit = 9 / 5 * temperatureInCelsius + 32;

                    weatherCode = getCityStatistics.current.weather_code;
                    // console.log(weatherCode);

                    // console.log(insertWeatherImage);
                    insertWeatherImage.width = 100;
                    insertWeatherImage.length = 100;


                    if (weatherCode == 0){
                        insertWeatherImage.src = "sunny_weather.png";
                        weatherDescription.innerHTML = "Clear Sky";
                    }
                    else if(weatherCode == 1 || weatherCode == 2 || weatherCode == 3){
                        insertWeatherImage.src="partly_cloudy.png";
                        weatherDescription.innerHTML = "Mainly clear, partly cloudy, and overcast";
                    }
                    else if(weatherCode == 45 || weatherCode == 48){
                        insertWeatherImage.src = "foggy_weather.png";
                        weatherDescription.innerHTML = "Fog and depositing rime fog";
                    }
                    else if(weatherCode == 51 || weatherCode == 53 || weatherCode == 55 ) {
                        insertWeatherImage.src = "rain.png";
                        weatherDescription.innerHTML = "Drizzle: Light, moderate and dense intensity";
                    }
                    else if(weatherCode == 56 || weatherCode == 57) {
                        insertWeatherImage.src = "rain.png";
                        weatherDescription.innerHTML = "Freezing Drizzle: Light and dense intensity";
                    }
                    else if(weatherCode == 61 || weatherCode == 63 || weatherCode == 65) {
                        insertWeatherImage.src = "rain.png";
                        weatherDescription.innerHTML = "Rain: Slight, moderate and heavy intensity";
                    }
                    else if(weatherCode == 66 || weatherCode == 67) {
                        insertWeatherImage.src = "rain.png";
                        weatherDescription.innerHTML = "Freezing Rain: Light and heavy intensity";
                    }
                    else if(weatherCode == 71 || weatherCode == 73 || weatherCode == 75) {
                        insertWeatherImage.src = "snowflake.png";
                        weatherDescription.innerHTML = "Snow fall: Slight, moderate, and heavy intensity";
                    }
                    else if(weatherCode == 77){
                        insertWeatherImage.src = "snowflake.png"
                        weatherDescription.innerHTML = "Snow grains";
                    }
                    else if(weatherCode == 80 || weatherCode == 81 || weatherCode == 82) {
                        insertWeatherImage.src = "rain.png";
                        weatherDescription.innerHTML = "Rain showers: Slight, moderate and violent";
                    }
                    else if(weatherCode == 85 || weatherCode == 86) {
                        insertWeatherImage.src = "snowflake.png";
                        weatherDescription.innerHTML = "Snow showers slight and heavy";
                    }
                    else if(weatherCode == 95) {
                        insertWeatherImage.src = "lightning.png";
                        weatherDescription.innerHTML = "Thunderstorm: Slight or moderate";
                    }
                    else if(weatherCode == 96 || weatherCode == 99) {
                        insertWeatherImage.src = "lightning.png";
                        weatherDescription.innerHTML = "Thunderstorm with slight and heavy hail";
                    }
                    else {
                        console.log("Not found");
                    }

                    displayTemperatures.innerHTML = ("Temperature: " + temperatureInCelsius + " C / " + temperatureInFarhenheit + " F ");

                }
            )
             .catch( error => console.log("Error")); 
        }
    )
    .catch( error => console.log("Error"));
    

    // Clear the form console results
    document.getElementById("theForm").reset();
    
}


    // Return City's Data
    // fetch('https://geocoding-api.open-meteo.com/v1/search?name=jersey+city&count=10&language=en&format=json')
    // .then(response => {return response.json()})
    // .then( data => console.log(data))
    // .catch( error => console.log("Error"));  

// 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41'
// https://geocoding-api.open-meteo.com/v1/search?name=jersey+city&count=10&language=en&format=json

// --------------------------------------------------------------------

// Get Coordinates - automatically works because this is a JS function, but the problem with this is, if you host 
// your website on a machine that displays website, it will show the location of the machine I believe

// getLocationCoordinates = document.getElementById("locationAPI");

// navigator.geolocation.getCurrentPosition((position) => {
//     getLocationCoordinates.innerHTML = position.coords.latitude + " " + position.coords.longitude;
// })

// getLocationCoordinates.innerHTML = position.coords.latitude + " " + position.coords.longitude;