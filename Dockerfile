FROM node:alpine

WORKDIR /usr/src/app

COPY package.json ./

COPY . .

RUN npm install --only-prod

EXPOSE 3001 3002

CMD npm run start:prod

