const { Client } = require("pg");

module.exports.GetClient = async () => {
  const DB = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
  });
  await DB.connect();
  return DB;
};
