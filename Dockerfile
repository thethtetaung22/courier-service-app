FROM node:20-alpine3.18 as builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY prisma ./prisma
RUN npx prisma migrate dev --name init --schema=./prisma/schema.prisma
COPY . .
RUN npm run build
EXPOSE 3000

CMD [ "npm","run","start" ]