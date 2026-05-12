const supabase = require("../config/supabase");

const getUmkmsbyId = async (id) => {
  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

module.exports = {
  getUmkmsbyId,
};
