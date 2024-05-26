const { Client } = require("pg");

module.exports.GetClient = async () => {
  const DB = new Client({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DB_PORT,
    database: process.env.DATABASE,
  });
  await DB.connect();
  return DB;
};
