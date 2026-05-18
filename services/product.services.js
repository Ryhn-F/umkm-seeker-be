const supabase = require("../config/supabase");

const getProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("id, name, image_url, category, price, stock");

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
    .maybeSingle();

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
        name: payload.name,
        stock: payload.stock,
        price: payload.price,
        description: payload.description,
        image_url: payload.image_url,
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

const updateProduct = async (productId, updateData) => {
  const { data, error } = await supabase
    .from("products")
    .update(updateData)
    .eq("id", productId)
    .select("*")
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const deleteProduct = async (productId) => {
  const { data, error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId)
    .select("*")
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
