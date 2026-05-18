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
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  return { user, token };
};

const register = async ({ username, email, password }) => {
  // Check if email already exists
  const { data: existingUser } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .single();

  if (existingUser) {
    throw new Error("Email already registered");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user record
  const { data: user, error: userError } = await supabase
    .from("users")
    .insert({
      username,
      email,
      password: hashedPassword,
    })
    .select("*")
    .single();

  if (userError) {
    throw new Error("Failed to create user: " + userError.message);
  }

  // Create token
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  return { user, token };
};

module.exports = {
  login,
  register,
};
