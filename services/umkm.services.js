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

const updateBusiness = async (id, updateData) => {
  const { data, error } = await supabase
    .from("businesses")
    .update(updateData)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

module.exports = {
  getUmkmsbyId,
  updateBusiness,
};
