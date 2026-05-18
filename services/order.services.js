const supabase = require("../config/supabase");

const createOrder = async (
  person_name,
  no_telp,
  id_products,
  quantities,
  seat_id,
  guest_count,
  reservation_date,
  reservation_time,
  reservation_end_time
) => {
  // Check for reservation overlap if reservation details are provided
  if (seat_id && reservation_date && reservation_time && reservation_end_time) {
    // Check if the seat exists
    const { data: seat, error: seatError } = await supabase
      .from("seats")
      .select("id, capacity")
      .eq("id", seat_id)
      .maybeSingle();

    if (seatError || !seat) {
      throw new Error("Invalid seat_id");
    }

    if (guest_count > seat.capacity) {
      throw new Error(`Guest count exceeds seat capacity of ${seat.capacity}`);
    }

    // Check for overlap
    // An overlap occurs if existing_start < new_end AND existing_end > new_start
    const { data: overlappingOrders, error: overlapError } = await supabase
      .from("orders")
      .select("id")
      .eq("seat_id", seat_id)
      .eq("reservation_date", reservation_date)
      .neq("status", "cancelled")
      .lt("reservation_time", reservation_end_time)
      .gt("reservation_end_time", reservation_time);

    if (overlapError) {
      throw new Error("Error checking for overlapping reservations: " + overlapError.message);
    }

    if (overlappingOrders && overlappingOrders.length > 0) {
      throw new Error("Seat is already reserved for the requested time");
    }
  }

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
        seat_id: seat_id || null,
        guest_count: guest_count || 1,
        reservation_date: reservation_date || null,
        reservation_time: reservation_time || null,
        reservation_end_time: reservation_end_time || null,
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

const getOrders = async () => {
  // Get all orders with their items and products details
  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select(`
      *,
      seats (
        id,
        seat_number,
        capacity,
        status
      ),
      order_items (
        id,
        quantity,
        price,
        products (
          id,
          name,
          image_url,
          category
        )
      )
    `)
    .order("created_at", { ascending: false });

  if (ordersError) {
    throw new Error(ordersError.message);
  }

  return orders;
};

module.exports = {
  createOrder,
  getOrders,
};
