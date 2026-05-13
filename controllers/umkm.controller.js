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

const updateBusiness = async (req, res) => {
  try {
    const { id_business } = req.user;

    if (!id_business) {
      return res.status(400).json({
        success: false,
        message: "No business associated with this account",
      });
    }

    const updateData = req.body;
    const business = await umkmServices.updateBusiness(id_business, updateData);

    res.status(200).json({
      success: true,
      message: "Business updated successfully",
      data: business,
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
  updateBusiness,
};
