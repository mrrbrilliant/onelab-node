# OneLab NodeJS

## Deployment

Create a new `.env` file in the root directory of your project.
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

Run the following command in your command line terminal.

```bash
npm install
npm run db              # to start database on docker
npm run sv:dev          # to start the server
```

### SETUP

Let's signup a new user

```bash
mutation {
  signUp(
    email: "johndoe@earth.planet",
    password: "supersecurepassword"
  ) {
    id
    email
  }
}
```

Let's create the profile for our new user

```bash
mutation {
  createProfile(
    firstName: "John",
    lastName: "DOE",
    gender: "male",
    dateOfBirth: "20000000",
    address: "Planet Earth",
    user_id: "the_user_id_got_when_signup"
  ) {
    id
    firstName
    lastName
    gender
    dateOfBirth
    address
  }
}
```
Let's query user info we just created

```bash
query {
  getAllUsers {
    id
    email
    profile {
      id
      firstName
      lastName
      gender
      dateOfBirth
      address
    }
  }
}
```