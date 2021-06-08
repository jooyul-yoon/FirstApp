const weather = document.querySelector(".js-weather")

const API_KEY = "27f6f86b52d5236f2a32ed85bd7d93df"
const COORDS = "coords"

async function getWeather(lat, lon) {
	const postResponse = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
	const post = await postResponse.json();
	const temperature = Math.floor(post.main.temp);
	const place = post.name;
  weather.innerText = `${temperature}°C @ ${place}`;
}

function saveCoords(coordsObj){
	localStorage.setItem(COORDS, JSON.stringify(coordsObj));
} 

function handleGeoSuccess(position){
	const latitude = position.coords.latitude;
	const longitde = position.coords.longitude;
	const coordsObj = {
		latitude,
		longitde
	};
	saveCoords(coordsObj);
}

function handleGeoError(){
	console.log("Can't access your geolocation.")
}

function askForCoords() {
	console.log("hep")
	navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoordes(){
	const loadedCoords = localStorage.getItem(COORDS);
	if(loadedCoords === null){
		askForCoords();
	} else {
		const parsedCoords = JSON.parse(loadedCoords);
		getWeather(parsedCoords.latitude, parsedCoords.longitde);
	}
}

function init(){
	loadCoordes();
}

init();