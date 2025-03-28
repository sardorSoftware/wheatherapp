const apiKey = '9b6443b156497c72285f4140f81ac178'
const searchBtn = document.getElementById('search-btn')
const cityInput = document.getElementById('city-input')
const suggestions = document.getElementById('suggestions')
const userWeather = document.getElementById('user-weather')
const weatherInfo = document.querySelector('.weather-info')


async function getUserLocationWeather(lat, lon) {
	try {
		const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
		const response = await fetch(url)
		const data = await response.json()

		document.getElementById('user-city').textContent = `📍 ${data.name}`
		document.getElementById('user-temp').textContent = `🌡️ ${data.main.temp}°C`
		document.getElementById('user-desc').textContent =
			`🌥️ ${data.weather[0].description}`
		document.getElementById('user-icon').src =
			`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
		userWeather.classList.remove('hidden')
	} catch (error) {
		console.error('Foydalanuvchining ob-havosi olinmadi', error)
	}
}


searchBtn.addEventListener('click', async () => {
	const city = cityInput.value.trim()
	if (!city) return alert('Iltimos, davlat nomini kiriting!')

	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
	const response = await fetch(url)
	const data = await response.json()

	document.getElementById('city-name').textContent = `📍 ${data.name}`
	document.getElementById('temperature').textContent = `🌡️ ${data.main.temp}°C`
	document.getElementById('description').textContent =
		`🌥️ ${data.weather[0].description}`
	weatherInfo.classList.remove('hidden')
})


navigator.geolocation.getCurrentPosition(
	pos => getUserLocationWeather(pos.coords.latitude, pos.coords.longitude),
	error => console.error('Geolokatsiya rad etildi', error)
)
getPopularCitiesWeather()
