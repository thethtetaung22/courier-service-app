
# Getting Started

### Install NodeJs in Local Machine

### Install dependencies 

```bash
npm i 
OR
yarn
```

### Create ".env.local" file and add following:

```bash
DATABASE_URL="mongodb+srv://thethtetaung:pass12word23@kabarshop.v2gunna.mongodb.net/courier?retryWrites=true&w=majority&appName=kabarshop"
```

## DB Migrate

```bash
npx prisma migrate dev --name init
```

## Generate

```bash
npx prisma generate
```

## Seed (Add initial data to db)

```bash
npx prisma db seed
```


### Run in local

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
