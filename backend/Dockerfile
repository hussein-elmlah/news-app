
FROM node:20.11.1

WORKDIR /app/backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
