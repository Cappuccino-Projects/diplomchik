export const getWeather = async (lat, lon) => {
	if (process.env.WEATHER_API_KEY === undefined)
		throw new Error('WEATHER_API_KEY is undefined')

	const result = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&lang=ru`
	)

	const jsonFormat = await result.json()

	const resultData = {
		weather: jsonFormat.weather[0].description,
		temp: (jsonFormat.main.temp - 273.15).toString().substring(0, 5),
		feels_like: (jsonFormat.main.feels_like - 273.15).toString().substring(0, 5),
		temp_min: (jsonFormat.main.temp_min - 273.15).toString().substring(0, 5),
		temp_max: (jsonFormat.main.temp_max - 273.15).toString().substring(0, 5),
		humidity: jsonFormat.main.humidity,
		wind_speed: jsonFormat.wind.speed
	}

	console.log(jsonFormat)

	const resultMessage = `Информация о погоде (по цельсию):
${resultData.weather}
Текущая: ${resultData.temp}
По ощущениям: ${resultData.feels_like}
От ${resultData.temp_min} до ${resultData.temp_max}
Скорость ветра ${resultData.wind_speed} км/ч
Влажность воздуха: ${resultData.humidity} г/м³`

	return resultMessage
}
