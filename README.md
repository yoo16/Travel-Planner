# Getting Started
## Install
```bash
npm i
```

## Launch
```bash
npm run dev
```

## env files
### Database URL

#### .env
```env
DATABASE_URL="mysql://root:@127.0.0.1:3306/travel-planner"
```

### Gemini API Key
Get Gemini API Key

https://aistudio.google.com/

### .env.local
```env
GEMINI_API_KEY=xxxxxxxxxxxxxx
```

## DB(Prisma)
### exists
```bash
npx prisma migrate dev --name init
```

### new
```bash
npx prisma init
npx prisma migrate dev --name create_tables
npx prisma generate
```