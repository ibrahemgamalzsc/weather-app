const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const submitSearch = document.getElementById("submit");
const forecastElement = document.getElementById("forecast-wrapper");


async function search(city) {
    let apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${city}&days=3`);
    if (apiResponse.status = 200) {
        let jsonData = await apiResponse.json();
        displayCurrentWeatherInfo(jsonData.location, jsonData.current);
        displayUpcomingWeatherInfo(jsonData.forecast.forecastday);
    }
}

submitSearch.addEventListener("submit", e => {
    search(e.target.value)
});


function displayCurrentWeatherInfo(loctaion, current) {
    if (current != null) {
        var date = new Date(current.last_updated);
        let todayForecast =
            `<div class="today forecast">
                    <div class="forecast-header "  >
                        <div class="day">${days[date.getDay()]}</div>
                            <div class=" date">${date.getDate() + monthNames[date.getMonth()]}</div>
                    </div> 
                    <div class="forecast-content" >
                        <div class="location">${loctaion.name}</div>
                        <div class="degree">
                            <div class="num text-white ">${current.temp_c}<sup>o</sup>C</div>
                            <div class="forecast-icon">
                                <img src="https:${current.condition.icon}" alt="" >
                            </div>
                        </div>
                        <div class=" text-primary mb-1">${current.condition.text}</div>
                      <div class="reads">
                      <span><img src="images/icon-umberella.png" alt="">20%</span>
                      <span><img src="images/icon-wind.png" alt="">18km/h</span>
                      <span><img src="images/icon-compass.png" alt="">East</span>
                      </div>
                    </div>
        </div>`;
        forecastElement.innerHTML = todayForecast
    }
} function displayUpcomingWeatherInfo(anotherForecast) {
    let upcomingForecastElement = "";
    for (let e = 1; e < anotherForecast.length; e++) {
        upcomingForecastElement += `<div class="forecast ">
            <div class="forecast-header">
                <div class="day  text-center">${days[new Date(anotherForecast[e].date).getDay()]}</div>
            </div>   
            <div class="forecast-content  text-center">
                <div class="forecast-icon">
                    <img src="https:${anotherForecast[e].day.condition.icon}" alt="" >
                </div>
               <div>
               <div class="degree text-white">${anotherForecast[e].day.maxtemp_c}<sup>o</sup>C</div>
               <small>${anotherForecast[e].day.mintemp_c}<sup>o</sup></small>
               </div>
                <div class=" text-primary">${anotherForecast[e].day.condition.text}</div>
                </div>
            </div>`;
    }
    forecastElement.innerHTML += upcomingForecastElement
}
search("cairo");