export const findPlaceContext = await (async (readyDataMessage, msg, context) => {
  const { message } = msg;
  const getAllPlaces = async () => {
    const response = await fetch(`http://places.d3s.ru:8080/api/place`, {
      headers: {
        'accept': '*/*'
      }
    });
    return response.json();
  };

  const getAllPlaceTypes = async () => {
  const response = await fetch(`http://places.d3s.ru:8080/api/placeType`, {
      headers: {
        'accept': '*/*'
      }
    });
    return response.json();
  };

  const places = await getAllPlaces();
  const types = await getAllPlaceTypes();

  const lowerCaseMessage = messages.toLowerCase();

  const result = places.filter(
    p => p.id == message ||
    ~(p.title ?? "").toLowerCase().indexOf(lowerCaseMessage) ||
    p.typeId == (types.find(f => f.name.toLowerCase() == lowerCaseMessage) ?? { id: 0 }).id
  ).slice(0, 10);

  context = "placeDescription";
  readyDataMessage.message = `Информация о найднном месте\nID: ${result[0].id}\nИмя: ${result[0].title ?? types.find(t => t.id == result[0].typeId).name}\nТип: ${types.find(t => t.id == result[0].typeId).name}\nАдрес: ${result[0].address}`;
  result.forEach((p, i, arr) => readyDataMessage.buttons.push({
    title: p.title ?? `${types.find(t => t.id == p.typeId).name} ${p.id}`,
    command: p.id,
  }));

  return { readyDataMessage: readyDataMessage, context: context };
});
