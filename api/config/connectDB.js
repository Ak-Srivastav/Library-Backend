const { Client } = require("pg");

const DB = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
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
