const express = require("express");
const validateForm = require("../controllers/validateForm");
const router = express.Router();
const {
  loginHandler,
  loginValidator,
  registerUser,
} = require("../controllers/authController");

const { rateLimiter } = require("../controllers/rateLimiter");

router
  .route("/login")
  .get(loginHandler)
  .post(validateForm, rateLimiter(60, 10), loginValidator);

router.post("/signup", rateLimiter(60, 5), registerUser);

module.exports = router;
