const express = require("express");
const router = express.Router();
const { signUp, login } = require("../controllers/Auth/authController");
const { createJWT } = require("../utils/jwt");

router.post("/register", signUp);
router.post("/login", login, createJWT);

module.exports = router;
