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
  logout,
};
