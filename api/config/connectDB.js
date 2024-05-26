const { Client } = require("pg");
const Async = require("../middlewares/Async");
const ApiResponse = require("../controllers/response/ApiResponse");
const ApiError = require("../controllers/error/ApiError");

const DB = new Client({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.DB_PORT,
  database: process.env.DATABASE,
});

const ConnectDB = async (req, res) => {
  await DB.connect();
  let result = await DB.query("SELECT $1::text as connected", [
    "Connection to postgres successful!",
  ]);
  console.log(result.rows[0].connected);
  await DB.end();
};

module.exports = ConnectDB;
