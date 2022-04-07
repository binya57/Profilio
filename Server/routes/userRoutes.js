const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// router.get("/api/users", (req, res) => {
//   res.send(users);
// });

router.post("/api/signUp", userController.signUp);

router.post("/api/login", userController.logIn);

module.exports = router;
