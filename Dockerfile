FROM node:19

RUN mkdir -p /home/app

WORKDIR /home/app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["node", "src/index.js"]

