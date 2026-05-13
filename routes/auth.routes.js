const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { uploadRegistration } = require("../config/cloudinary");

router.post("/login", authController.login);
router.post(
  "/register",
  uploadRegistration.fields([
    { name: "foto_ktp", maxCount: 1 },
    { name: "foto_logo_umkm", maxCount: 1 },
  ]),
  authController.register
);
router.post("/logout", authController.logout);

module.exports = router;
