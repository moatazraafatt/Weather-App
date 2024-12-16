
async function search(searchTowen) {
  let x = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=6859b93137624e319d6202133240912&q=${searchTowen}&days=3`
  );
  if (x.ok && x.status < 400) {
    let finalResult = await x.json();
    display1(finalResult.location, finalResult.current),
      display2(finalResult.forecast.forecastday);
  }
}
document.getElementById("search")?.addEventListener("input", (finalResult) => {
  search(finalResult.target.value);
});
var day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
function display1(finalResult, x) {
  if (null != x) {
    var e = new Date(x.last_updated.replace(" ", "T"));
    let forecastContainer = `<div class="today forecast ">
                    <div class="forecast-header d-flex justify-content-between" id="today">
                        <div class="day text-light">${day[e.getDay()]}</div>
                        <div class="date text-light">${
                          e.getDate() + monthNames[e.getMonth()]
                        }</div>
                    </div>
                    <div class="forecast-content" id="current">
                       <div class="location text-light">${
                         finalResult.name
                       }</div>
                        <div class="degree">
                            <div class="num text-light display-3 fw-bolder">
                            ${x.temp_c}
                               <sup>o</sup>
                                C
                            </div>
                            <div class="forecast-icon">
                                <img src="https:${
                                  x.condition.icon
                                }" alt width="90">
                            </div>
                        </div>
                        <div class="custom">${x.condition.text}</div>
                        <span class="ms-3 text-light"><img src="./icon-umberella.png" class="me-1" alt="umberalla">${
                          x.humidity
                        }%</span>
                        <span class="ms-3 text-light"><img src="./icon-wind.png" class="me-1" alt="wind">${
                          x.wind_kph
                        }</span>
                        
                        <span class="ms-3 text-light"><img src="./icon-compass.png" class="me-1" alt="compass">${
                          x.wind_dir
                        }</span>
                    </div>  
                </div>`;
    document.getElementById("forecast").innerHTML = forecastContainer;
  }
}
function display2(finalResult) {
  let forecastContainer = "";
  for (let i = 1; i < finalResult.length; i++)
    forecastContainer += `  <div class="forecast c text-center">
                    <div class="forecast-header ">
                        <div class="day text-light">${
                          day[
                            new Date(
                              finalResult[i].date.replace(" ", "T")
                            ).getDay()
                          ]
                        }</div>
                    </div>
                    <div class="forecast-content">
                     </div> \x3c!-- .forecast-header --\x3e\n

                        <div class="forecast-icon">
                            <img src="https:${
                              finalResult[i].day.condition.icon
                            }" alt width="48">
                        </div>
                        <div class="degree text-light mt-3 display-5 fw-bolder">
                        ${finalResult[i].day.maxtemp_c}
                            <sup>o</sup>
                            c
                        </div>
                        <small class="text-light fs-3 fw-bolder">
                        ${finalResult[i].day.mintemp_c}
                            <sup>o</sup>
                        </small>

                        <div class="custom">${
                          finalResult[i].day.condition.text
                        } </div>
                    </div>
                `;

  document.getElementById("forecast").innerHTML += forecastContainer;
}
search("cairo");
