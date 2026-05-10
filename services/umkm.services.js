const supabase = require("../config/supabase");

const getUmkms = async () => {
  const { data, error } = await supabase.from("businesses").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

module.exports = {
  getUmkms,
};
