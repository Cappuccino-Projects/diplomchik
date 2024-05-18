import instance from './axiosClient.js'

export const geolocation = async (latitude, longitude) => {
	// return fetch(
	// 	`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&lang=ru&apiKey=${import.meta.env.VITE_GEOAPI_KEY}`,
	// )
	// 	.then((response) => response.json())
	// 	.then((result) => result)
	// 	.catch((error) => console.error('Error:', error))
	const data = await instance.get(
		`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&lang=ru&apiKey=${import.meta.env.VITE_GEOAPI_KEY}`,
		{ withCredentials: false }
	)

	return data
}
