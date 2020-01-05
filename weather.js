const weather = document.querySelector(".js-weather");

const API_KEY = "df7d14f7a12fb32e0c1d144650114d00";
const COORDS = "coords";

function getWhether(lat, lng) {
	fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=${API_KEY}&units=metric`
	)
		.then(function(response) {
			return response.json();
		})
		.then(function(json) {
			const temperature = json.main.temp;
			const place = json.name;
			weather.innerText = `${temperature} @ ${place}`;
		});
}
function saveCooords(coordsObj) {
	localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}
function handleGeoSuccess(position) {
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	const coordsObj = {
		latitude,
		longitude
	};
	saveCooords(coordsObj);
	getWhether(latitude, longitude);
}

function handleGeoError() {
	console.log("cant access geo location ");
}

function askForCoords() {
	navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}
function loadCoords() {
	const loadedCoords = localStorage.getItem(COORDS);
	if (loadedCoords === null) {
		askForCoords();
	} else {
		const parseCoords = JSON.parse(loadedCoords);
		getWhether(parseCoords.latitude, parseCoords.longitude);
	}
}

function init() {
	loadCoords();
}
init();
