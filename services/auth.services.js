const supabase = require("../config/supabase");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (email, password) => {
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user) {
    throw new Error("Invalid email or password");
  }

  // Check password (handle both plain text and bcrypt for safety)
  const isMatch = password === user.password || await bcrypt.compare(password, user.password).catch(() => false);
  
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  // Create token
  const token = jwt.sign(
    { id: user.id, email: user.email, id_business: user.id_business },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  return { user, token };
};

module.exports = {
  login,
};
