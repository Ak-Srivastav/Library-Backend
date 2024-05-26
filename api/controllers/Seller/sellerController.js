const Async = require("../../middlewares/Async");
const ApiResponse = require("../response/ApiResponse");
const ApiError = require("../error/ApiError");
const fs = require("fs");
const { parse } = require("csv-parse");
const { GetClient } = require("../../config/getClient");

// Create Book
const createBook = Async(async (req, res) => {
  if (req.role.trim() != "seller")
    throw new ApiError("Only Sellers are Allowed! Unauthorized (Create)", 401);
  const {
    isbn,
    title,
    author_id,
    publication_year,
    publisher,
    language,
    summary,
    available,
  } = req.body;
  if (req.userid != author_id)
    throw new ApiError("You can only add your books!", 401);
  const DB = await GetClient();
  const qry = `INSERT INTO book (isbn, title, author_id, publication_year, publisher, language, summary, available) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
  const qryres = await DB.query(qry, [
    isbn,
    title,
    author_id,
    publication_year,
    publisher,
    language,
    summary,
    available,
  ]);
  await DB.end();
  res.json(ApiResponse("Book Created Successfully", qryres, 201));
});

const getCSV = async () => {
  const books = [];
  const csvStream = fs
    .createReadStream("example.csv")
    .pipe(parse({ delimiter: ",", from_line: 2 }));

  for await (const row of csvStream) {
    books.push(row);
  }

  return books;
};

// Create Book (CSV)
const createBooks = Async(async (req, res) => {
  if (req.role.trim() != "seller")
    throw new ApiError(
      "Only Sellers are Allowed! Unauthorized (CreateBooks)",
      401
    );
  const result = await getCSV();
  const successISBN = [];
  const success = 0;
  for (let i = 0; i < result.length; ++i) {
    const DB = await GetClient();
    const qry = `INSERT INTO book (isbn, title, author_id, publication_year, publisher, language, summary, available) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
    const qryres = await DB.query(qry, result[i]);
    if (qryres.rowCount == 1) {
      success++;
      successISBN.push(result[i][0]);
    }
    await DB.end();
  }
  res.json({
    "Number of Books Added Successfully": `${success} out of ${result.length} `,
    "Books Added": successISBN,
    Error: "false",
  });
});

// Get Book (Single By Author)
const getBook = Async(async (req, res) => {
  if (req.role.trim() != "seller")
    throw new ApiError("Only Sellers are Allowed! Unauthorized (GETBOOK)", 401);
  const bookId = req.params.id;
  const DB = await GetClient();
  const qry = `SELECT * FROM BOOK WHERE ID = ($1)`;
  const qryres = await DB.query(qry, [bookId]);
  await DB.end();

  const book = qryres.rows[0];
  if (!qryres.rows[0]) throw new ApiError("Book Not Found", 404);

  if (req.userid != book.author_id)
    throw new ApiError("You can only Access your book!", 401);
  res.json(ApiResponse("Book Fetched Successfully", book, 200));
});

// Get Book by (Only Author's Book)
const getBooks = Async(async (req, res) => {
  if (req.role.trim() != "seller")
    throw new ApiError(
      "Only Sellers are Allowed! Unauthorized (GETBOOKS)",
      401
    );
  const userId = req.userid;
  const DB = await GetClient();
  const qry = `SELECT * FROM BOOK WHERE AUTHOR_ID = ($1)`;
  const qryres = await DB.query(qry, [userId]);
  await DB.end();
  res.json(ApiResponse("Books Fetched Successfully", qryres.rows, 200));
});

// Update Book
const updateBook = Async(async (req, res) => {
  if (req.role.trim() != "seller")
    throw new ApiError("Only Sellers are Allowed! Unauthorized (update)", 401);
  const bookId = req.params.id;
  const DB = await GetClient();
  const qry = `SELECT * FROM BOOK WHERE ID = ($1)`;
  const qryres = await DB.query(qry, [bookId]);

  const book = qryres.rows[0];
  if (!qryres.rows[0]) throw new ApiError("Book Not Found", 404);

  if (req.userid != book.author_id)
    throw new ApiError("You can only Update your book!", 401);
  const updateFields = Object.keys(req.body);
  const updateValues = updateFields.map((_, i) => `$${i + 1}`);
  const updateQry = `UPDATE BOOK SET ${updateFields.map(
    (field) => `${field} = ${updateValues.shift()}`
  )} WHERE ID = (${bookId})`;
  const updateData = Object.values(req.body);
  await DB.query(updateQry, updateData);
  await DB.end();
  res.json(ApiResponse("Book Updated Successfully", 200));
});

// Delete Book
const deleteBook = Async(async (req, res) => {
  if (req.role.trim() != "seller")
    throw new ApiError("Only Sellers are Allowed! Unauthorized (Delete)", 401);
  const bookId = req.params.id;
  const DB = await GetClient();
  const qry = `SELECT * FROM BOOK WHERE ID = ($1)`;
  const qryres = await DB.query(qry, [bookId]);

  const book = qryres.rows[0];
  if (!qryres.rows[0]) throw new ApiError("Book Not Found", 404);

  if (req.userid != book.author_id)
    throw new ApiError("You can only Delete your book!", 401);

  const qry1 = `DELETE FROM BOOK WHERE ID = ($1)`;
  await DB.query(qry1, [bookId]);
  await DB.end();
  res.json(ApiResponse("Book Deleted Successfully", 200));
});

module.exports = {
  createBook,
  createBooks,
  getBook,
  getBooks,
  updateBook,
  deleteBook,
};
