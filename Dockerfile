FROM node:20-alpine3.18 as builder

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npx prisma migrate dev --name init
COPY . .
RUN npm run build
EXPOSE 3000

CMD [ "npm","run","start" ]