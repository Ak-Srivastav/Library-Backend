const Async = require("../../middlewares/Async");
const ApiResponse = require("../response/ApiResponse");
const ApiError = require("../error/ApiError");
const { GetClient } = require("../../config/getClient");
const bcryptjs = require("bcryptjs");

const signUp = Async(async (req, res) => {
  console.log(req.body);
  const { username, email, password, role } = req.body;
  if (!username) throw new ApiError("Enter Username");
  if (!email) throw new ApiError("Enter Email");
  if (!password) throw new ApiError("Enter Password");
  if (!role) throw new ApiError("Enter Role");
  if (role !== "buyer" && role !== "seller")
    throw new ApiError("Select Role (buyer, seller)");
  console.log(req.body);
  const DB = await GetClient();
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const qry = `INSERT INTO users (username, email, password,role) VALUES ($1, $2, $3, $4)`;
  await DB.query(qry, [username, email, hashedPassword, role]);
  await DB.end();
  res.json(ApiResponse("User Created Successfully"));
});

const login = Async(async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (!email) throw new ApiError("Enter Email");
  if (!password) throw new ApiError("Enter Password");
  const DB = await GetClient();
  const qry = `SELECT * FROM USERS WHERE (email) = ($1)`;
  const qryres = await DB.query(qry, [email]);
  const user = qryres.rows[0];
  if (qryres.rowCount == 0) throw new ApiError("User Not Found", 404);
  const validPassword = bcryptjs.compareSync(password, user.password);
  if (!validPassword) throw new ApiError("Wrong Password!", 401);
  await DB.end();
  req.id = user.id;
  req.role = user.role;
  next();
});

module.exports = {
  signUp,
  login,
};
