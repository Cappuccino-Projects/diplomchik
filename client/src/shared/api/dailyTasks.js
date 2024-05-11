const getAll = async () => {
	return [
		{
			TaskId: 1,
			TaskName: 'Зеленая трава',
			TaskImage: 'grass.png',
			TaskBackgroundColor: '#BDFDB2',
			TaskText: 'Пройти 5.000 шагов',
			TaskProgress: '1.341 / 5.000',
			TaskIsCompleted: false
		},
		{
			TaskId: 2,
			TaskName: 'Сюда нам надо',
			TaskImage: 'trophy.png',
			TaskBackgroundColor: '#FFF9B5',
			TaskText: 'Посетить рекомендуемое место',
			TaskProgress: 'Выполнено',
			TaskIsCompleted: true
		},
		{
			TaskId: 3,
			TaskName: 'Ваше мнение важно для нас',
			TaskImage: 'heart.png',
			TaskBackgroundColor: '#FDD4D4',
			TaskText: 'Оставить оценку на карте',
			TaskProgress: 'Выполнено',
			TaskIsCompleted: true
		}
	]
}

export const dailyTaskApi = { getAll }
