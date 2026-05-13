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

const getProductsByBusinessId = async (businessId) => {
  const { data, error } = await supabase
    .from("products")
    .select("*, business:businesses!business_id(province, regency, district)")
    .eq("business_id", businessId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const updateProduct = async (productId, businessId, updateData) => {
  const { data, error } = await supabase
    .from("products")
    .update(updateData)
    .eq("id", productId)
    .eq("business_id", businessId)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const deleteProduct = async (productId, businessId) => {
  const { data, error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId)
    .eq("business_id", businessId)
    .select("*")
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
  getProductsByBusinessId,
  updateProduct,
  deleteProduct,
};
