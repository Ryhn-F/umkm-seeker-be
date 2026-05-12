const umkmServices = require("../services/umkm.services");

const getUmkmsbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const umkms = await umkmServices.getUmkmsbyId(id);

    res.status(200).json({
      success: true,
      data: umkms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getUmkmsbyId,
};
