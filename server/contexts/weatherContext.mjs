import {getWeather} from './../utils/index.mjs'

export const weatherContext = (readyDataMessage, msg, context) => {
  context = "default";
  readyDataMessage.message = "Погода в Димитровград: сегодня солнечно +7, завтра облачно +8";
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
