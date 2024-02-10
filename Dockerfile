FROM node:20.9.0

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

CMD ["node", "dist/index.js"]
