FROM huecker.io/library/node:21-alpine3.18 as vite-app

WORKDIR /app
COPY . .

RUN ["npm", "i"]

EXPOSE 3000

ENTRYPOINT ["npm", "run", "start"]