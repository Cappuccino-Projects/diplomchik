import { defaultContext } from "./contexts/default.mjs";
import { findPlaceContext } from "./contexts/findPlaceContext.mjs";
import { weatherContext } from "./contexts/weatherContext.mjs";

export const handlerCore = async () => {
  let readyDataMessage = {
    owner: "BOT",
    messageType: "message",
    message: "",
    buttons: [],
    payload: [],
  };
  let result = {};

  async function handle(msg, context, history) {
    msg.context = context;

    switch (msg.context) {
      case "default":
        result = await defaultContext(readyDataMessage, msg, context, history);
        break;
      case "search_place":
        result = await findPlaceContext(readyDataMessage, msg, context);
        break;
      case "weather":
        result = await weatherContext(readyDataMessage, msg, context);
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
};
