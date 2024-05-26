const express = require("express");
const router = express.Router();
const {
  createBook,
  createBooks,
  getBook,
  getBooks,
  updateBook,
  deleteBook,
} = require("../controllers/Seller/sellerController");
const { verifyJWT } = require("../utils/jwt");

router.post("/create", verifyJWT, createBook);
router.post("/create-multiple/:id", verifyJWT, createBooks);
router.put("/update/:id", verifyJWT, updateBook);
router.delete("/delete/:id", verifyJWT, deleteBook);
router.get("/get/:id", verifyJWT, getBook);
router.get("/get", verifyJWT, getBooks);
module.exports = router;
