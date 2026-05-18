const supabase = require("../config/supabase");

const getSeats = async () => {
  const { data, error } = await supabase
    .from("seats")
    .select("*")
    .order("seat_number", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const createSeat = async (seatData) => {
  const { data, error } = await supabase
    .from("seats")
    .insert([seatData])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const updateSeat = async (id, seatData) => {
  const { data, error } = await supabase
    .from("seats")
    .update(seatData)
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Seat not found");
  }

  return data;
};

const deleteSeat = async (id) => {
  const { data, error } = await supabase
    .from("seats")
    .delete()
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Seat not found");
  }

  return data;
};

module.exports = {
  getSeats,
  createSeat,
  updateSeat,
  deleteSeat,
};
