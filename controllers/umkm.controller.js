const umkmServices = require("../services/umkm.services");

const getUmkms = async (req, res) => {
  try {
    const umkms = await umkmServices.getUmkms();

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
  getUmkms,
};
