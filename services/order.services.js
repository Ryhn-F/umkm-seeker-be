const supabase = require("../config/supabase");

const createOrder = async (person_name, no_telp, id_products, quantities) => {
  // 1. Fetch prices and stock for the requested products
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("id, price, stock")
    .in("id", id_products);

  if (productsError) {
    throw new Error(productsError.message);
  }

  // Create a map for quick product lookup
  const productMap = {};
  products.forEach((p) => {
    productMap[p.id] = p;
  });

  // 2. Calculate total price, validate stock, and prepare order items
  let total_price = 0;
  const orderItemsData = [];

  for (let i = 0; i < id_products.length; i++) {
    const p_id = id_products[i];
    const qty = quantities[i];
    const product = productMap[p_id];

    if (!product) {
      throw new Error(`Product with id ${p_id} not found`);
    }

    if (product.stock < qty) {
      throw new Error(`Insufficient stock for product id ${p_id}. Available: ${product.stock}, Requested: ${qty}`);
    }

    total_price += product.price * qty;

    orderItemsData.push({
      product_id: p_id,
      quantity: qty,
      price: product.price,
    });
  }

  // 3. Create the order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert([
      {
        person_name,
        no_telp,
        total_price,
        status: "pending",
      },
    ])
    .select()
    .single();

  if (orderError) {
    throw new Error(orderError.message);
  }

  // 4. Create the order items mapping to the new order_id
  const itemsToInsert = orderItemsData.map((item) => ({
    ...item,
    order_id: order.id,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(itemsToInsert);

  if (itemsError) {
    // Attempt rollback if items insertion fails
    await supabase.from("orders").delete().eq("id", order.id);
    throw new Error(itemsError.message);
  }

  // 5. Deduct product stock
  const updatePromises = orderItemsData.map((item) => {
    const currentStock = productMap[item.product_id].stock;
    return supabase
      .from("products")
      .update({ stock: currentStock - item.quantity })
      .eq("id", item.product_id);
  });

  await Promise.all(updatePromises);

  return order;
};

const getOrdersByBusinessId = async (business_id) => {
  // 1. Get all products for the business
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("id")
    .eq("business_id", business_id);

  if (productsError) {
    throw new Error(productsError.message);
  }

  if (!products || products.length === 0) {
    return [];
  }

  const productIds = products.map((p) => p.id);

  // 2. Get order items containing these products
  const { data: orderItems, error: itemsError } = await supabase
    .from("order_items")
    .select("order_id")
    .in("product_id", productIds);

  if (itemsError) {
    throw new Error(itemsError.message);
  }

  if (!orderItems || orderItems.length === 0) {
    return [];
  }

  const orderIds = [...new Set(orderItems.map((item) => item.order_id))];

  // 3. Get the full orders with their items and products details
  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (
        id,
        quantity,
        price,
        products (
          id,
          name,
          image_url,
          category,
          business_id
        )
      )
    `)
    .in("id", orderIds)
    .order("created_at", { ascending: false });

  if (ordersError) {
    throw new Error(ordersError.message);
  }

  // 4. Filter out items that don't belong to this business (in case of mixed orders)
  const businessIdNum = parseInt(business_id, 10);
  const filteredOrders = orders.map((order) => {
    return {
      ...order,
      order_items: order.order_items.filter(
        (item) => item.products && item.products.business_id === businessIdNum
      ),
    };
  });

  return filteredOrders;
};

module.exports = {
  createOrder,
  getOrdersByBusinessId,
};
