import { default as qrcode } from 'qr-base64'

export const defaultContext = async (readyDataMessage, msg, context, history) => {
  const { message } = msg;

  if (message === "ping") {
    readyDataMessage.message = "pong";
    context = "default";
  }

  if (message === "По названию") {
    context = "search_place";
  }

  if (message === "Какая сегодня погода?") {
    readyDataMessage.message = "Введите своё местоположение";
    readyDataMessage.inlineButtons = []
    readyDataMessage.buttons = [
      {
        title: "Текущее место",
        command: "Текущее место",
      },
    ];
    context = "weather";
  }

  if (message === "Привет") {
    readyDataMessage.message = "Приветствую! Чем могу помочь?";
    readyDataMessage.inlineButtons = []
    context = "default";
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
    context = "default";
  }
  
  if (message === "История запросов") {
    readyDataMessage.message = "История обращений:\n" + history.reduce((acc, history) => acc + history.message + ", \n", "");
    readyDataMessage.inlineButtons = []
    context = "default";
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
  }
  
  if (message === "Часто задаваемые вопросы" || message === "FAQ") {
    readyDataMessage.inlineButtons = []
    readyDataMessage.message = `1. Для чего нужно приложение?
Для комфортных прогулок по нашему прекрасному городу, быстрого поиска мест, получения обратной связи и игровой форме взаимодействия.
2.  Какие места можно найти с помощью приложения?
Места для отдыха и досуга, лавочки, туалеты, кормушки для птиц, красивые места для фото, мусорные урны, мусорные контейнеры.
3. Почему место, которое я добавил, сразу не появилось на карте?
Чтобы ваше добавленное место или предложенные изменения отобразились на карте, администратор должен принять эти изменения.
4. Что такое фантики?
Это валюта нашего приложения. Зарабатывайте фантики за выполнение ежедневных заданий и обменивайте их на забавные предметы в магазине.
5. Какие предметы можно приобрести в магазине?
Рамки для аватара вашей учетной записи и персонажа, сопровождающего вас на карте.
6. Как использовать купленный предмет?
Необходимо перейти на панель вашего профиля, нажать на кнопку "Инвентарь" и кнопку "Использовать" на приобретенном предмете.

Если этих ответов недостаточно, ознакомьтесь со <a target="_blank" href="/docs/Справка.pdf">справочной информацией</a> о приложении.
    
Щуковская Анастасия Павловна
Email: <a href='mail:grustnyyi@mail.ru'>grustnyyi@mail.ru</a>
Контакт для связи: <a gref='https://t.me/somnicknight'>@somnicknight</a>
`;
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
    context = "default";
  }

  if (message === "Случайное место") {
    const getRandomInt = (max) => {
      return Math.floor(Math.random() * max);
    }

    const places = await (await fetch(`${process.env.BACKEND_API}/place`)).json();
    const types = await (await fetch(`${process.env.BACKEND_API}/placeType`)).json();
    const result = places[getRandomInt(places.length)]
    const placeName = result[0]?.title ?? types.find(t => t.id == result[0]?.typeId)?.name;
    const placeType = types.find(t => t.id == result[0]?.typeId)?.name;
    const placeAddress = result[0]?.address;

    readyDataMessage.message = `Информация о найденном месте\nИмя: ${placeName}\nТип: ${placeType}\nАдрес: ${placeAddress}`;
    readyDataMessage.inlineButtons = [
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

    context = "default";
  }

  if (message === 'Оценить') {
    readyDataMessage.message = "Выберете оценку";
    readyDataMessage.inlineButtons = []
    readyDataMessage.buttons = [
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
    context = "set_rate";
  }

  if (message === 'Поделиться') {
    readyDataMessage.message = `<div style='display: flex; flex-direction: column;'>
    <img src='${qrcode(new Date().toISOString(), {size: 128})}'/>
    <a href='#'>Ссылка на место</a></div>`;
    readyDataMessage.inlineButtons = []
    readyDataMessage.buttons = [];
    context = "default";
  }

  if (
    message === "Хочу найти место" ||
    message === "Место" ||
    message === "Найти место" ||
    message === "Поиск места"
  ) {
    readyDataMessage.message = "Выберите как найти место";
    readyDataMessage.inlineButtons = []
    readyDataMessage.buttons = [
      {
        title: "По названию",
        command: "По названию",
      },
      {
        title: "По типу",
        command: "По типу",
      },
      {
        title: "По рейтингу",
        command: "По рейтингу",
      }
    ];
    context = "search_place";
  }

  return { readyDataMessage: readyDataMessage, context: context };
};
