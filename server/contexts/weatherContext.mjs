import { getWeather } from './../utils/index.mjs'

export const weatherContext = async (readyDataMessage, msg, context) => {
  context = "default";

  const { payload } = msg
  const { lat, lon } = payload

  readyDataMessage.message = await getWeather(lat, lon);
  readyDataMessage.inlineButtons = []
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
  ];

  return { readyDataMessage: readyDataMessage, context: context };
};
