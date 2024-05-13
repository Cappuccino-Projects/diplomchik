const getAll = async () => {
	return [
		{
			TaskId: 3,
			TaskName: 'Ваше мнение важно для нас',
			TaskImage: 'review-mission-icon.png',
			TaskBackgroundColor: '#FDD4D4',
			TaskText: 'Оставить оценку на карте',
			TaskProgress: 'Выполнено',
			TaskIsCompleted: true
		},
		{
			TaskId: 2,
			TaskName: 'Сюда нам надо',
			TaskImage: 'trophy-mission-icon.png',
			TaskBackgroundColor: '#FFF9B5',
			TaskText: 'Посетить рекомендуемое место',
			TaskProgress: 'Выполнено',
			TaskIsCompleted: true
		},
		{
			TaskId: 1,
			TaskName: 'Зеленая трава',
			TaskImage: 'grass-mission-icon.png',
			TaskBackgroundColor: '#BDFDB2',
			TaskText: 'Пройти 5.000 шагов',
			TaskProgress: '1.341 / 5.000',
			TaskIsCompleted: false
		}
	]
}

export const dailyTaskApi = { getAll }
