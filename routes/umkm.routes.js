const express = require("express");
const router = express.Router();
const umkmController = require("../controllers/umkm.controller");

router.get("/:id", umkmController.getUmkmsbyId);
// router.get("/", umkmController.createUmkm);

module.exports = router;
