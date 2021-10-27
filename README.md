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
# For JWT token signing
SECRET=
```

Run the following command in your command line terminal

```bash
npm run db              # to start database on docker
npm run sv:dev          # to start the server
```