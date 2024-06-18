export const uploadFile = async (file) => {
	const formData = new FormData()
	formData.append('file', file)
	
	// добавил параметр fileName для именования файла
	const fileName = file?.name.replace(/\.[^/.]+$/, "").replace(' ', '_')
	const response = await fetch(
		`${import.meta.env.VITE_API_DOMAIN}/api/files/upload?fileName=${fileName}`,
		{
			method: 'POST',
			body: formData
		}
	)

	if (response.ok) {
		const data = await response.json()
		return data.name
	}
}
