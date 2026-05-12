const supabase = require("../config/supabase");

const getProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("id, name, image_url, category, price");

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const getProductById = async (id) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const createProduct = async (payload) => {
  const { data, error } = await supabase
    .from("products")
    .insert([
      {
        business_id: payload.business_id,
        name: payload.name,
        stock: payload.stock,
        price: payload.price,
        description: payload.description,
        image_url: payload.image, // mapping image to image_url
        category: payload.category,
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
};
