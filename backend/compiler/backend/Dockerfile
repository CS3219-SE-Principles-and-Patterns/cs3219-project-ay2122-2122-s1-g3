FROM node:14-alpine

WORKDIR /backend

COPY ./package*.json /backend

RUN npm install

COPY . /backend

EXPOSE 3020

CMD ["npm", "start"]