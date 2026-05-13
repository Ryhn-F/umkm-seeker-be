const authServices = require("../services/auth.services");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const result = await authServices.login(email, password);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

const register = async (req, res) => {
  try {
    const { nama_pemilik, email, password, nama_umkm, no_telp, kategori, alamat, province, regency, district } = req.body;

    // Validate required fields
    if (!nama_pemilik || !email || !password || !nama_umkm || !no_telp || !kategori || !alamat || !province || !regency || !district) {
      return res.status(400).json({
        success: false,
        message: "All fields are required: nama_pemilik, email, password, nama_umkm, no_telp, kategori, alamat, province, regency, district",
      });
    }

    // Validate image uploads
    if (!req.files || !req.files.foto_ktp || !req.files.foto_ktp[0]) {
      return res.status(400).json({
        success: false,
        message: "foto_ktp is required",
      });
    }

    if (!req.files || !req.files.foto_logo_umkm || !req.files.foto_logo_umkm[0]) {
      return res.status(400).json({
        success: false,
        message: "foto_logo_umkm is required",
      });
    }

    // Get Cloudinary URLs from uploaded files
    const ktp_image_url = req.files.foto_ktp[0].path;
    const logo_image_url = req.files.foto_logo_umkm[0].path;

    const result = await authServices.register({
      nama_pemilik,
      email,
      password,
      nama_umkm,
      no_telp,
      kategori,
      alamat,
      province,
      regency,
      district,
      ktp_image_url,
      logo_image_url,
    });

    res.status(201).json({
      success: true,
      message: "Registration successful",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const logout = async (req, res) => {
  // JWT is stateless, so we just return success
  // The client should discard the token
  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};

module.exports = {
  login,
  register,
  logout,
};
