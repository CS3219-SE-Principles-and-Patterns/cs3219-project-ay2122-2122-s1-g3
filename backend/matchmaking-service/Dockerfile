FROM node:14-alpine

WORKDIR /app

COPY ./package*.json .

RUN npm install

COPY . .

EXPOSE 8099

CMD ["npm", "start"]