const getAll = async () => {
	return [
		{
			ItemId: 1,
			ItemName: 'Веселье',
			ItemImage: 'frame1.png',
			ItemCategory: 'Avatar Frame',
			ItemBackgroundColor: '#BDFDB2',
			ItemPrice: 5000,
			ItemObtained: true
		},
		{
			ItemId: 2,
			ItemName: 'Весна',
			ItemImage: 'frame2.png',
			ItemCategory: 'Avatar Frame',
			ItemBackgroundColor: '#B6F8E7',
			ItemPrice: 500,
			ItemObtained: true
		},
		{
			ItemId: 3,
			ItemName: 'Времена года',
			ItemImage: 'frame2.png',
			ItemCategory: 'Avatar Frame',
			ItemBackgroundColor: '#B6F8E7',
			ItemPrice: 5000,
			ItemObtained: true
		},
		{
			ItemId: 4,
			ItemName: 'Весна',
			ItemImage: 'frame2.png',
			ItemCategory: 'Avatar Frame',
			ItemBackgroundColor: '#B6F8E7',
			ItemPrice: 500,
			ItemObtained: false
		},
		{
			ItemId: 5,
			ItemName: 'Времена года',
			ItemImage: 'frame2.png',
			ItemCategory: 'Avatar Frame',
			ItemBackgroundColor: '#B6F8E7',
			ItemPrice: 5000,
			ItemObtained: false
		},
		{
			ItemId: 11,
			ItemName: 'Темная',
			ItemImage: 'grass.png',
			ItemCategory: 'Character',
			ItemBackgroundColor: '#212121',
			ItemPrice: 200,
			ItemObtained: false
		},
		{
			ItemId: 10,
			ItemName: 'Светлая',
			ItemImage: 'trophy.png',
			ItemCategory: 'Character',
			ItemBackgroundColor: '#F1F1F1',
			ItemPrice: 200,
			ItemObtained: true
		},
		
	]
}

export const shopApi = { getAll }
