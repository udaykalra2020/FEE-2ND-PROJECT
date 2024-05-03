
function getWeather(city){
	if (city) {
		response = fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=932bb81b0aa37e297a52991b19f5f815")
			.then(response => response.json())
			.then(data => {
				var formattedData=formatWeather(data);
				document.getElementById("weather-data").innerHTML=formattedData;
				document.getElementById('cityname').value="";
			})
			.catch(error => {
				var error='\
				<div class="alert alert-danger" role = "alert" > \
					City not found! \
					<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> \
				</div>'
				document.getElementById('error').innerHTML=error;
			});	
	}
	else{
		var error = '\
		<div class="alert alert-danger" role = "alert" > \
			You must enter a city name! \
			<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> \
		</div>'
		document.getElementById('error').innerHTML=error;
	}
}

function formatWeather(data){
	return "<h3>Current Weather for " + data.name + ", " + data.sys.country + "</h3>" + 
			"<p>Weather: " + data.weather[0].main+ "</p>" + 
			"<p>Weather Description: " + data.weather[0].description +"<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'/>" + "</p>" + 
			"<p>Temperature: " + data.main.temp + "&deg;C</p>" + 
			"<p>Pressure: " + data.main.pressure + "hPa</p>" + 
			"<p>Humidity: " + data.main.humidity + "%</p>" + 
			"<p>Min Temperature: " + data.main.temp_min + "&deg;C</p>" + 
			"<p>Max Temperature: " + data.main.temp_max + "&deg;C</p>" + 
			"<p>Wind Speed: " + data.wind.speed + "m/s</p>";
}


function getForecast(city, days) {
	if (city) {
		response = fetch("http://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&cnt=" + days + "&units=metric&appid=d610395e85b50074b834a0234b0776db")
		.then(response => response.json())
		.then(data => {
			var formattedData=formatForecast(data);
			document.getElementById("forecast").innerHTML=formattedData;
			document.getElementById('cityname').value="";
			document.getElementById('days').value=""
		})
		.catch(error => {
			var error='\
			<div class="alert alert-danger" role = "alert" > \
				City not found! \
				<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> \
			</div>'
			document.getElementById('error').innerHTML=error;
		});	
	}
	else {
		var error = '\
		<div class="alert alert-danger" role = "alert" > \
			You must enter a valid city name and Number of day should be greater than 0 and less than or equal to 16. \
			<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> \
		</div>'
		document.getElementById('error').innerHTML=error;
	}
}

function formatForecast(data){
	var table="";
	for (var i = 0; i < data.list.length; i++) {
		table += "<tr>";
		table += "<td><img src='http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png'/></td>";
		table += "<td>" + data.list[i].weather[0].main + "</td>";
		table += "<td>" + data.list[i].weather[0].description + "</td>";
		table += "<td>" + data.list[i].temp.morn + "&deg;C</td>";
		table += "<td>" + data.list[i].temp.night + "&deg;C</td>";
		table += "<td>" + data.list[i].temp.min + "&deg;C</td>";
		table += "<td>" + data.list[i].temp.max + "&deg;C</td>";
		table += "<td>" + data.list[i].pressure + "hPa</td>";
		table += "<td>" + data.list[i].humidity + "%</td>";
		table += "<td>" + data.list[i].speed + "m/s</td>";
		table += "</tr>";
	}
	return table;
}

