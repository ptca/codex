FROM node:14.18.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN yarn build

CMD [ "yarn", "start" ]