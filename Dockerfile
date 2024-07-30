FROM node:20-alpine3.18 as builder

WORKDIR /app
COPY package*.json ./
RUN npm install 

# Set the DATABASE_URL environment variable
ARG DATABASE_URL
ENV DATABASE_URL=mongodb+srv://thethtetaung:pass12word23@kabarshop.v2gunna.mongodb.net/courier?retryWrites=true&w=majority&appName=kabarshop

COPY prisma ./prisma
RUN npx prisma db pull --force --schema=./prisma/schema.prisma
RUN npx prisma generate

COPY . .
RUN npm run build
EXPOSE 3000

CMD [ "npm","run","start" ]