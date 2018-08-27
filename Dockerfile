FROM node:alpine

WORKDIR /usr/src/app

COPY package.json ./

COPY . .

RUN npm install --only=production

EXPOSE 3001 3002

CMD npm run start:prod

HEALTHCHECK CMD curl --fail http://localhost:3001/ || exit 1

