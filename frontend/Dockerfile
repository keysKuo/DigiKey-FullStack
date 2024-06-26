FROM node:20-alpine

WORKDIR /

COPY package*.json ./

RUN npm install -g npm@latest

RUN npm install

COPY . .

RUN npm run build 

RUN npm install -g serve

EXPOSE 5001

CMD ["serve", "-s", "build", "-l", "5001"]