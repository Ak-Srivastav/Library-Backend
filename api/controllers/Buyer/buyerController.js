const Async = require("../../middlewares/Async");
const ApiResponse = require("../response/ApiResponse");
const ApiError = require("../error/ApiError");
const { GetClient } = require("../../config/getClient");

// Get Book (Single)
const getBook = Async(async (req, res) => {
  if (req.role != "buyer") throw new ApiError("Unauthorized", 401);
  const bookId = req.params.id;
  const DB = await GetClient();
  const qry = `SELECT * FROM BOOK WHERE ID = ($1)`;
  const qryres = await DB.query(qry, [bookId]);
  await DB.end();

  const book = qryres.rows[0];
  if (!qryres.rows[0]) throw new ApiError("Book Not Found", 404);

  res.json(ApiResponse("Book Fetched Successfully", book, 200));
});

// Get Book (All)
const getBooks = Async(async (req, res) => {
  if (req.role != "buyer") throw new ApiError("Unauthorized", 401);
  const DB = await GetClient();
  const qry = `SELECT * FROM BOOK`;
  const qryres = await DB.query(qry);
  await DB.end();
  res.json(ApiResponse("Book Fetched Successfully", qryres.rows, 200));
});

module.exports = {
  getBook,
  getBooks,
};
