## Getting Started

```bash
npm i
npm run dev
```

## DB(Prisma)
### new
```bash
npx prisma init
npx prisma migrate dev --name create_tables
npx prisma generate
```

### exists
```bash
npx prisma migrate dev --name init
```