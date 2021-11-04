FROM node:14-alpine

WORKDIR /video

COPY ./package*.json /video

RUN npm install

COPY . /video

EXPOSE 3000

CMD ["npm", "start"]