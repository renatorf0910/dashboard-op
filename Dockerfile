FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

RUN npm install -g json-server

EXPOSE 3000

CMD sh -c "json-server --host 0.0.0.0 --port 8000 --watch db.json & npm start"
