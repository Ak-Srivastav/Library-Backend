# Library Backend

## 🧰:Languages and Tools:

![NodeJS](https://img.shields.io/badge/nodejs%20-%ffb400.svg?&style=for-the-badge&logo=nodeJs&logoColor=white)
![ExpressJS](https://img.shields.io/badge/expressjs%20-%23FF6F00.svg?&style=for-the-badge&logo=express&logoColor=white)
<img src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL Badge">
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker Badge">
## How to run:

- Clone this repository or fork it.
  - To clone this repository type `git clone https://github.com/Ak-Srivastav/Library-Backend.git` on your command line
  - To fork this repository, click fork button of this repository then type `git clone https://github.com/<your username>/Library-Backend.git`
- Inside your Library-Backend folder, create a new file named `.env` which stores informations about server side such as `JWT_SECRET`
  - or 
- Rename .envexample to .env after setting.
- Store your database information
- example:
  ```
  #for docker
  POSTGRESDB_USER=postgres
  POSTGRESDB_ROOT_PASSWORD=123456
  POSTGRESDB_DATABASE=postgres
  POSTGRESDB_LOCAL_PORT=5433
  POSTGRESDB_DOCKER_PORT=5432
  NODE_LOCAL_PORT=6868
  NODE_DOCKER_PORT=8080
  JWT_SECRET=9839u78yhgjkhft87yy87gh^&y843uih
  
  #for your local system
  PORT = 6868
  DB_USER = postgres
  DB_PASSWORD = amit1234
  DB_HOST = localhost
  DB_PORT = 5432
  DB_DATABASE = postgres
  
  # I highly recommend to keep both settings
  ```
## How to Run?

#Method 1
  
- Install all dependencies
  - Server side: on the `Library-Backend` directory type `npm install`

- Run it on node js:
  - Server side: on the `Library-Backend` directory type `npm start`

#Method 2
- Run using docker
`docker-compose up`
- It'll run on PORT `6868` on your Local-System 

## Directory Structure
```
├───📁 api/
│   ├───📁 config/
│   │   ├───📄 connectDB.js
│   │   ├───📄 getClient.js
│   │   └───📄 Init.js
│   ├───📁 controllers/
│   │   ├───📁 Auth/
│   │   │   └───📄 authController.js
│   │   ├───📁 Buyer/
│   │   │   └───📄 buyerController.js
│   │   ├───📁 error/
│   │   │   └───📄 ApiError.js
│   │   ├───📁 response/
│   │   │   └───📄 ApiResponse.js
│   │   └───📁 Seller/
│   │       └───📄 sellerController.js
│   ├───📁 middlewares/
│   │   ├───📄 ApiErrorMiddleware.js
│   │   ├───📄 Async.js
│   │   └───📄 HandleNotFoundMiddleware.js
│   ├───📁 routes/
│   │   ├───📄 authRoute.js
│   │   ├───📄 buyerRoute.js
│   │   └───📄 sellerRoute.js
│   ├───📁 utils/
│   │   └───📄 jwt.js
│   └───📄 server.js
├───📄 .gitignore
├───📄 docker-compose.yml
├───📄 Dockerfile
├───📄 example.csv
├───📄 package-lock.json
├───📄 package.json
└───📄 README.md
```

## API Documentation - Authentication

This table provides an overview of the available API endpoints for Auth.

| Name | Method | Endpoint | Purpose |
|---|---|---|---|
| I. Register | POST | /api/auth/register | To Register a New User. |
| II. Login | POST | /api/auth/login | Login for existing User. |

## Seller

This table provides an overview of the available API endpoints for Seller.

| Name | Method | Endpoint | Purpose |
|---|---|---|---|
| I.  Create    | POST | /api/seller/create | To Create a new book. |
| II. GetBooks | GET | /api/seller/get | Fetch All Books Created by Current Seller. |
| III. GetBook | GET | /api/seller/get/:id | Fetch Book details with id (parameter) if created by Current Seller. |



**Note:**

* Note 1
