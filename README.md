# OneLab NodeJS

## Development

ENV file is required in the project root directory with the following keys:

[.env]()
```bash
# For MongoDB
MONGO_ROOT_USER=
MONGO_ROOT_PASSWORD=
MONGO_INITDB_DATABASE=
MONGO_USER=
MONGO_PASSWORD=
# For Express server
MONGO_ADDRESS=
MONGO_PORT=
EXPRESS_ADDRESS=
EXPRESS_PORT=
```

Database

```bash
docker-compose --env-file .env up -d
```

Server

```bash
cd server
npm install
npm run dev
```