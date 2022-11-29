FROM node:14

WORKDIR /app

COPY ./package.json .

COPY . .
COPY ./.env ./.env

RUN npx yarn install
RUN npm run build
RUN export REDIS_HOST=redis.default.svc.cluster.local
RUN export REDIS_PORT=6379

CMD [ "npm", "start" ]
