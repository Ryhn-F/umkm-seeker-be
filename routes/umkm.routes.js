const express = require("express");
const router = express.Router();
const umkmController = require("../controllers/umkm.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.put("/business", verifyToken, umkmController.updateBusiness);
router.get("/:id", umkmController.getUmkmsbyId);

module.exports = router;
