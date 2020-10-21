FROM node:latest

RUN npm install pm2 -g

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8005 

CMD [ "pm2-runtime", "index.js" ]
