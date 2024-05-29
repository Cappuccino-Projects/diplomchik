export const findByRatingContext = async (readyDataMessage, msg, context) => {
  const { message } = msg;

  const places = await (await fetch(`${process.env.BACKEND_API}/place`)).json();
    
    const types = await (await fetch(`${process.env.BACKEND_API}/placeType`)).json();
    
    const lowerCaseMessage = message.toLowerCase();
    
    const result = places.filter(
    p => p.id == message ||
    ~(p.title ?? "").toLowerCase().indexOf(lowerCaseMessage) ||
    p.typeId == (types.find(f => f.name.toLowerCase() == lowerCaseMessage) ?? { id: 0 }).id
  ).slice(0, 5);

  const r = result.map((o, index) => {

    const y = {}

    if (o !== undefined) {
      const placeName = result[index]?.title ?? types.find(t => t.id == result[index]?.typeId)?.name;
      const placeType = types.find(t => t.id == result[0]?.typeId)?.name;
      const placeAddress = result[index]?.address;
      const placeLatitude = result[index].latitude
      const placeLongitude = result[index].longitude
      const readyPlacePosition = placeAddress === null ? `<a href="/${placeLatitude}/${placeLongitude}">Координаты места</a>` : `Адрес: ${placeAddress}`
      const readyPlaceName = placeName === null ? '' : `Имя: ${placeName}\n`
      
      y.message = `Информация о найденном месте\n${readyPlaceName}Тип: ${placeType}\n` + readyPlacePosition;
    } else {
      y.message = "Извините, такого места не существует"
    }
    
    y.buttons = [
      {
        title: "Хочу найти место",
        command: "Найти место",
      },
      {
        title: "Какая сегодня погода?",
        command: "Какая сегодня погода?",
      },
      {
        title: "FAQ",
        command: "Часто задаваемые вопросы",
      },
      {
        title: "Случайное место",
        command: "Случайное место",
      },
      {
        title: "История запросов",
        command: "История запросов",
      },
      {
        title: "Поделиться местом",
        command: "Поделиться",
      },
    ];
    
    y.inlineButtons = [
      {
        title: 'Поделиться местом',
        command: 'Поделиться'
      },
      {
        title: 'Посмотреть на карте',
        command: 'На карте'
      },
      {
        title: 'Оценить место',
        command: 'Оценить'
      }
    ]

    return y
  })
  
  context = "default";

  return { readyDataMessage: r, context: context };
};
