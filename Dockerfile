FROM node:8.6.0-alpine
EXPOSE 5555

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY yarn.lock .
COPY package.json .

RUN yarn install --production

CMD yarn start
