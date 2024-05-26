/*==============================
core packages
==============================*/
const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");
dotenv.config();

/*==============================
include middlewares, custom middlewares, Routes and Database connection
==============================*/
const sellerRoute = require("./routes/sellerRoute");
const buyerRoute = require("./routes/buyerRoute");
const authRoute = require("./routes/authRoute");
const connectDB = require("./config/connectDB");
const Init = require("./config/Init");
const HandleNotFound = require("./middlewares/HandleNotFoundMiddleware");
const HandleApiError = require("./middlewares/ApiErrorMiddleware");

/*==============================
include environment variables
==============================*/
const PORT = process.env.NODE_DOCKER_PORT || 6868;

/*==============================
server application configurations
==============================*/
connectDB();
Init();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/*==============================
routes, not found and custom api error handler
==============================*/
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Library Management Server" });
});

app.use("/api/auth", authRoute);
app.use("/api/seller", sellerRoute); // routes and prefix
app.use("/api/buyer", buyerRoute);
app.use(HandleNotFound); // Endpoint not found response
app.use(HandleApiError); // Custom API Error handler

/*==============================
public endpoint for file/media access
==============================*/
// app.use("/public", express.static(path.join(__dirname, "public")));

/*==============================
start server listen
==============================*/

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
