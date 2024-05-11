const getAll = async () => {
	return [
		{
			PlaceId: 1,
			PlaceName: 'Пр. Ганненкова Автостроителей и не только 1 А',
			PlaceImage: 'place1.jpg',
			PlaceInfo:
				'Очень классное место, куда можно сходить, а можно не ходить. Травка зеленая, но только летом',
			PlaceRating: 3
		},
		{
			PlaceId: 2,
			PlaceName: 'Сенная 28',
			PlaceImage: 'place2.jpg',
			PlaceInfo: 'Да, я бы сейчас поел конечно',
			PlaceRating: '5 конечно'
		},
		{
			PlaceId: 3,
			PlaceName: 'Лавки',
			PlaceImage: 'place2.jpg',
			PlaceInfo:
				'Очень классное место, куда можно сходить, а можно не ходить. Травка зеленая, но только летом',
			PlaceRating: 3
		},
		{
			PlaceId: 4,
			PlaceName: 'Лавки',
			PlaceImage: 'place2.jpg',
			PlaceInfo:
				'Очень классное место, куда можно сходить, а можно не ходить. Травка зеленая, но только летом',
			PlaceRating: 3
		},
		{
			PlaceId: 5,
			PlaceName: 'Лавки',
			PlaceImage: 'place.jpg',
			PlaceInfo:
				'Очень классное место, куда можно сходить, а можно не ходить. Травка зеленая, но только летом',
			PlaceRating: 3
		}
	]
}

export const locationApi = { getAll }
