const Async = require("../middlewares/Async");
const ApiResponse = require("../controllers/response/ApiResponse");
const ApiError = require("../controllers/error/ApiError");
const jwt = require("jsonwebtoken");

//create Token
const createJWT = Async(async (req, res, next) => {
  const token = jwt.sign(
    { id: req.id, role: req.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "168h",
    }
  );
  res
    .cookie("access_token", token, { httpOnly: true })
    .status(200)
    .json({
      message: "Logged In Successfully",
      User: { id: req.id, role: req.role },
    });
});

// Verify Token
const verifyJWT = Async(async (req, res, next) => {
  const token = req.cookies.access_token || "";
  if (!token) throw new ApiError("Token Not Present", 401);
  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    req.userid = data.id;
    req.role = data.role;
    if (err) throw new ApiError(err);
    next();
  });
});

module.exports = {
  createJWT,
  verifyJWT,
};
