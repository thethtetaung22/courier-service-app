FROM node:20-alpine3.18 as builder

WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .

# Set the DATABASE_URL environment variable
# You can replace this with the actual URL or an environment variable that Docker passes during runtime
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

RUN npx prisma migrate dev --name init --schema=./prisma/schema.prisma
RUN npm run build
EXPOSE 3000

CMD [ "npm","run","start" ]