import instance from './axiosClient.js'

export const geolocation = async (latitude, longitude) => {
	const data = await instance.get(
		`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&lang=ru&apiKey=${import.meta.env.VITE_GEOAPI_KEY}`,
		{ withCredentials: false }
	)

	return data
}
