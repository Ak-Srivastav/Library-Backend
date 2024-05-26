const { GetClient } = require("../config/getClient");

const InitBook = async () => {
  try {
    const DB = await GetClient();
    const qry = `CREATE TABLE IF NOT EXISTS Book (
      id SERIAL PRIMARY KEY,  
      isbn VARCHAR(13) UNIQUE,
      title VARCHAR(255) NOT NULL,
      author_id INT,
      publication_year INT,  
      publisher VARCHAR(255),  
      language VARCHAR(50),
      summary TEXT,  
      available BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      CHECK (updated_at >= created_at)  -- Ensures updated_at is never before created_at
    );`;

    await DB.query(qry);
    await DB.end();
  } catch (err) {
    console.log("Books Error:", err);
  }
};

const InitUser = async () => {
  try {
    const DB = await GetClient();

    const qry = `CREATE TABLE IF NOT EXISTS Users(
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password CHAR(60) NOT NULL,  
      role Char(10) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      CHECK (updated_at >= created_at)  
    );`;

    await DB.query(qry);
    await DB.end();
  } catch (err) {
    console.log("User Error:", err);
  }
};

const Init = () => {
  InitBook();
  InitUser();
};

module.exports = Init;
