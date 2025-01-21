

# How to run
## Start the services

### Docker compose 
Clone .env.docker file to .env.docker.dev and fill out the variables
``` sh
docker compose up -d
```

### Locally
Create the .env file from the .env.example file
``` sh
npm run db:create
npm run db:start
npm i
npx prisma generate 
npx prisma migrate dev --name init
npx prisma migrate deploy
npm run dev
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

## Prisma updates
```
npx prisma migrate dev --name <name_description>

```


# Tech stack
Nodejs with express
Postgresql & typescript with prisma migrations 
Docker
Docker compose
Bash scripting
Newman for testing requests
Jest for unit tests

