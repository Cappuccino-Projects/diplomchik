# GitFlow

- клонируем репо:
```
https://github.com/Cappuccino-Projects/diplomchik.git
```

- создаём свою ветку (dev-{никнейм})
```
git checkout -b dev-{ник_нейм} master
```

- добавляем изменения
```
git add .
```

- коммитим изменения
```
git commit -m "Сообщение"
```

- пушим
```
git push origin dev-{ник_нейм}
```

- заходим в github и делаем pull request, github проверит можно ли мержить, если да делаем merge

- ждём когда изменения соберутся

# ✨Локальная разработка

- клонируем репо
```
https://github.com/Cappuccino-Projects/diplomchik.git
```

- вбиваем в консоль
```
docker compose -f docker-compose.dev.yaml -p pomoiki up -d --build
```

- ждём когда проект соберётся

## url для локальной разработки:
api - http://localhost:8099/api<br/>
swagger - http://localhost:8099/swagger/index.html<br/>
frontend - http://localhost:8099/<br/>

Сделал letnull19a<br/>
телега: @letnull19a<br/>
вк: @letnull19a<br/>