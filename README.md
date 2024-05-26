# Menu Management

## 🧰:Languages and Tools:

![NodeJS](https://img.shields.io/badge/nodejs%20-%ffb400.svg?&style=for-the-badge&logo=nodeJs&logoColor=white)
![ExpressJS](https://img.shields.io/badge/expressjs%20-%23FF6F00.svg?&style=for-the-badge&logo=express&logoColor=white)

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
    PORT = 3000
    JWT_SECRET = ajdkhurihkdjb&YT&^gy3uhhr8gJB
    USER = postgres
    PASSWORD = amit1234
    HOST = localhost
    DB_PORT = 5432
    DATABASE = postgres
  ```
  
- Install all dependencies
  - Server side: on the `Library-Backend` directory type `npm install`

- Run it on node js:
  - Server side: on the `Library-Backend` directory type `npm start`

## Directory Structure
```


```
## API Documentation - Seller

This table provides an overview of the available API endpoints for managing categories.

| Category | Method | Endpoint | Purpose |
|---|---|---|---|
| I. Create | POST | /api/seller/create | To create a new book. |

**Note:**

* Note 1