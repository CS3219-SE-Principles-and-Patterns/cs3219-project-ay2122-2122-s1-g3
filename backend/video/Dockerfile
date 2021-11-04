FROM node:14-alpine

WORKDIR /video

COPY ./package*.json /video

RUN npm install

COPY . /video

EXPOSE 3001

CMD ["npm", "start"]