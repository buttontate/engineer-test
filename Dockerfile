FROM node:8.6.0-alpine
EXPOSE 5555

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./src ./src
COPY package.json .

RUN yarn install --production

CMD yarn start
