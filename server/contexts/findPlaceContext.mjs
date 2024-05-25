export const findPlaceContext = async (readyDataMessage, msg, context) => {
  const { message } = msg;

  const places = await (await fetch(`${process.env.BACKEND_API}/place`)).json();

  const types = await (await fetch(`${process.env.BACKEND_API}/placeType`)).json();

  const lowerCaseMessage = message.toLowerCase();

  const result = places.filter(
    p => p.id == message ||
    ~(p.title ?? "").toLowerCase().indexOf(lowerCaseMessage) ||
    p.typeId == (types.find(f => f.name.toLowerCase() == lowerCaseMessage) ?? { id: 0 }).id
  ).slice(0, 10);

  if (result[0] !== undefined) {
    const placeName = result[0]?.title ?? types.find(t => t.id == result[0]?.typeId)?.name;
    const placeType = types.find(t => t.id == result[0]?.typeId)?.name;
    const placeAddress = result[0]?.address;
    const placeLatitude = result[0].latitude
    const placeLongitude = result[0].longitude
    const readyPlacePosition = placeAddress === null ? `<a href="/${placeLatitude}/${placeLongitude}">Координаты места</a>` : `Адрес: ${placeAddress}`
    const readyPlaceName = placeName === null ? '' : `Имя: ${placeName}\n`

    readyDataMessage.message = `Информация о найденном месте\n${readyPlaceName}Тип: ${placeType}\n` + readyPlacePosition;
  } else {
    readyDataMessage.message = "Извините, такого места не существует"
  }

  readyDataMessage.buttons = [
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

  readyDataMessage.inlineButtons = [
    {
      title: 'Поделиться',
      command: 'Поделиться'
    }
  ]

  context = "default";

  return { readyDataMessage: readyDataMessage, context: context };
};
