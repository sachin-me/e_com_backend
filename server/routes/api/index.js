const express = require("express");
const userCtrl = require("../../controller/user.controller");

const router = express.Router();
router.post("/auth/register", userCtrl.register);
router.post("/auth/login", userCtrl.login);
router.post("/auth/logout", userCtrl.logout);

module.exports = router;