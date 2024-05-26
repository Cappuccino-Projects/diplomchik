export const findPlaceContext = async (readyDataMessage, msg, context) => {
  const { message } = msg;

  if (message === "По названию") {
    readyDataMessage.message = 'Введите название'
    readyDataMessage.inlineButtons = []
    readyDataMessage.buttons = []
    context = "search_by_type";
  }

  if (message === "По типу") { 

    const types = await (await fetch(`${process.env.BACKEND_API}/placeType`)).json();

    const y = (name) => { return {title: name, command: name} }

    readyDataMessage.message = 'Введите Тип'
    readyDataMessage.inlineButtons = Array.isArray(types) ? types.map(i => y(i.name)) : []
    readyDataMessage.buttons = []
    context = "search_by_type";
  }

  if (message === "По рейтингу") {
    readyDataMessage.message = 'Введите рейтинг'
    readyDataMessage.inlineButtons = [
      {
        title: "Отлично",
        command: "Отлично",
      },
      {
        title: "Хорошо",
        command: "Хорошо",
      },
      {
        title: "Удовлетворительно",
        command: "Удовлетворительно",
      },
      {
        title: "Ужасно",
        command: "Ужасно",
      }
    ];
    context = "search_by_type";
  }

  return { readyDataMessage: readyDataMessage, context: context };
};
