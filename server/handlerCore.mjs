import { defaultContext } from "./contexts/default.mjs";
import { findPlaceContext } from "./contexts/findPlaceContext.mjs";
import { weatherContext } from "./contexts/weatherContext.mjs";

export const handlerCore = () => {
  let readyDataMessage = {
    owner: "BOT",
    messageType: "message",
    message: "",
    buttons: [],
    payload: [],
  };
  let result = {};

  function handle(msg, context, history) {
    msg.context = context;

    switch (msg.context) {
      case "default":
        result = defaultContext(readyDataMessage, msg, context, history);
        break;
      case "search_place":
        result = findPlaceContext(readyDataMessage, msg, context);
        break;
      case "weather":
        result = weatherContext(readyDataMessage, msg, context);
        break;
      case "faq":
      default:
        result = {
          owner: "BOT",
          message: "Запрос не корректен",
          messageType: "TEXT",
          payload: [],
          context: "default",
          buttons: [
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
          ],
        };
        break;
    }

    return {
      readyDataMessage: result.readyDataMessage,
      newContext: result.context,
    };
  }

  return handle;

  //   if (message.includes("Случайное место") || message.includes("случайно")) {
  //     readyDataMessage.message = "* Вывод случайного места *";
  //     readyDataMessage.buttons = [
  //       {
  //         title: "Оценить место",
  //         command: "Оценить",
  //       },
  //       {
  //         title: "Поделиться",
  //         command: "Поделиться",
  //       },
  //     ];
  //   }

  //   if (message.includes("История запросов")) {
  //     readyDataMessage.message = "Историю запросов как-то вывести";
  //   }

  //   if (message.includes("Оценить")) {
  //     readyDataMessage.message = "Введите оценку от 0 до 5";
  //     readyDataMessage.buttons = [
  //       {
  //         title: "0",
  //         command: "0",
  //       },
  //       {
  //         title: "1",
  //         command: "1",
  //       },
  //       {
  //         title: "2",
  //         command: "2",
  //       },
  //       {
  //         title: "3",
  //         command: "3",
  //       },
  //       {
  //         title: "4",
  //         command: "4",
  //       },
  //       {
  //         title: "5",
  //         command: "5",
  //       },
  //     ];
  //   }

  //   if (message.includes("Часто задаваемые вопросы")) {
  //     readyDataMessage.message = "Тут ответы на вопросы";
  //   }

  //   return readyDataMessage;
};
