FROM node:8.6.0-alpine as builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./src ./src
COPY ./test ./test

COPY yarn.lock .
COPY package.json .

RUN yarn install

RUN yarn test

###########################

FROM node:8.6.0-alpine
EXPOSE 5555

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/src ./src
COPY --from=builder /usr/src/app/yarn.lock .
COPY --from=builder /usr/src/app/package.json .

RUN yarn install --production

CMD yarn start
