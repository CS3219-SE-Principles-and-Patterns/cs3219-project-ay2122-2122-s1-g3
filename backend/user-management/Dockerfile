FROM node:14-alpine

WORKDIR /app

COPY ./package*.json .

RUN npm install

COPY src/ .

EXPOSE 4000

CMD ["npm", "start"]