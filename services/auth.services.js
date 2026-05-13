const supabase = require("../config/supabase");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (email, password) => {
  const { data: user, error } = await supabase
    .from("users")
    .select("*, business:businesses!id_business(*)")
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

const register = async ({ nama_pemilik, email, password, nama_umkm, no_telp, kategori, alamat, province, regency, district, ktp_image_url, logo_image_url }) => {
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

  // 1. Create the business record first
  const { data: business, error: businessError } = await supabase
    .from("businesses")
    .insert({
      name: nama_umkm,
      alamat,
      category: kategori,
      helder: nama_pemilik,
      email,
      no_telp,
      province,
      regency,
      district,
      logo_image_url,
    })
    .select("*")
    .single();

  if (businessError) {
    throw new Error("Failed to create business: " + businessError.message);
  }

  // 2. Create the user record linked to the business
  const { data: user, error: userError } = await supabase
    .from("users")
    .insert({
      username: nama_pemilik,
      email,
      password: hashedPassword,
      ktp_image_url,
      id_business: business.id,
    })
    .select("*")
    .single();

  if (userError) {
    // Rollback: delete the business if user creation fails
    await supabase.from("businesses").delete().eq("id", business.id);
    throw new Error("Failed to create user: " + userError.message);
  }

  // Create token
  const token = jwt.sign(
    { id: user.id, email: user.email, id_business: business.id },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  return { user, business, token };
};

module.exports = {
  login,
  register,
};
