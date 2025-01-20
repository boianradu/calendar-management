

# How to run
## Start the services
Create the .env file from the .env.example file
``` sh
npm run db:create
npm run db:start
npm i
npx prisma generate 
npx prisma migrate dev --name init
npx prisma migrate deploy
```

## Run for end to end tests
```
newman run .\Web-API.postman-meta-fill.json --verbose 
```

## Helper for windows ports issues
```
net stop winnat
net start winnat
```

## When doing prisma updates
```
npx prisma migrate dev --name <name_description>

```

