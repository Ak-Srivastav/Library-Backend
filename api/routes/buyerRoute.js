const express = require("express");
const router = express.Router();
const { getBook, getBooks } = require("../controllers/Buyer/buyerController");
const { verifyJWT } = require("../utils/jwt");

router.get("/get/:id", verifyJWT, getBook);
router.get("/get", verifyJWT, getBooks);

module.exports = router;
