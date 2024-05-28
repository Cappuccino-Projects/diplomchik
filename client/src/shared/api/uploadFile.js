export const uploadFile = async (file) => {
	const formData = new FormData()
	formData.append('files', file)

	const response = await fetch(
		`${import.meta.env.VITE_API_DOMAIN}/api/files/upload`,
		{
			method: 'POST',
			body: formData
		}
	)

	if (response.ok) {
		const data = await response.json()
		return data.files[0].fileName
	}
}
