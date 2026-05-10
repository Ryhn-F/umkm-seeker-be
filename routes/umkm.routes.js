const express = require("express");
const router = express.Router();
const umkmController = require("../controllers/umkm.controller");

router.get("/", umkmController.getUmkms);
// router.get("/", umkmController.createUmkm);

module.exports = router;
