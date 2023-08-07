# Backend Implementation for Signup, Login, and User Details
This project is the backend implementation of a web application that includes user signup, login, and user details features. The backend is built using Node.js with the Express.js framework and utilizes an RDBMS (Relational Database Management System) like MySQL to store user information securely. The implementation adheres to best practices for secure coding, user authentication, and data validation.

## Prerequisites
Before using the API, make sure you have the following prerequisites:

* Node.js and npm installed.
* Required dependencies installed (express, jwt, sequelize).
* Running MySql server.

### Setup and Deployment

* Clone this repository to your local machine using the following command:
```shell
git clone https://github.com/RitikPant/assingment_SLUD_project.git
```

* Navigate to the project directory and install the required dependencies using npm:
```shell
cd assingment_SLUD_project
```
To install the necessary dependencies, run the following command:
```shell
npm install
```

## Starting the Server
To start the server, use the following command:

```shell
npm run dev
```

## API Routes
### User Management
#### Register a User
URL: POST /signup
- Description: Registers a new user.
- Request Body: {
    "firstName": "Lal",
    "lastName": "10",
    "email": "lal10@gmail.com",
    "username": "lal10",
    "password": "admin@123"
}
- Response: {
    "message": "User registered successfully"
}
```shell
curl --location 'http://localhost:4000/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName": "New",
    "lastName": "user",
    "email": "newuser@gmail.com",
    "username": "newuser",
    "password": "user@123"
}'
```
#### Login
URL: POST /login
- Description: Authenticates a user and generates a JWT token.
- Request Body: {
    "email": "newuser@gmail.com",
    "password": "user@123"
}
- Response: {
    "token": <JWT token>
}
```shell
curl --location 'http://localhost:4000/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "newuser@gmail.com",
    "password": "user@123"
}'
```
#### Get Users List
URL: GET /user
- Description: Retrieves the user's details.
- Authorization: JWT token in the Authorization header.
- Response: {
    "firstName": "New",
    "lastName": "user",
    "email": "newuser@gmail.com",
    "username": "newuser"
}
```shell
curl --location 'http://localhost:4000/user' \
--header 'Authorization: <token>' \
--data ''
```

## Conclusion
This backend implementation provides the required features for user signup, login, and user details, ensuring secure authentication, data validation, and error handling. The project uses Node.js, Express.js, Sequelize ORM, and bcrypt for secure password hashing and storage. JSON Web Tokens (JWT) are used for token-based authentication, enhancing the security of user sessions.