FROM node:21-alpine3.18 as vite-app

WORKDIR /app
COPY . .

RUN ["npm", "i"]

ENTRYPOINT ["npm", "run", "start"]