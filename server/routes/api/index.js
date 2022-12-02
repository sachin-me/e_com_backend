const express = require("express");
const userCtrl = require("../../controller/user.controller");
const sellerCtrl = require("../../controller/seller.controller");
const buyerCtrl = require("../../controller/buyer.controller");
const { isLoggedIn } = require("../../auth");

const router = express.Router();
router.post("/auth/register", userCtrl.register);
router.post("/auth/login", userCtrl.login);
router.post("/auth/logout", userCtrl.logout);

router.post("/seller/create-catalog", isLoggedIn, sellerCtrl.createCatalog);

router.get("/buyer/list-of-sellers", isLoggedIn, buyerCtrl.getSellersList);
router.get(
  "/buyer/seller-catalog/:seller_id",
  isLoggedIn,
  buyerCtrl.getSellerCatalog
);
router.post(
  "/buyer/create-order/:seller_id",
  isLoggedIn,
  buyerCtrl.createOrder
);

module.exports = router;
