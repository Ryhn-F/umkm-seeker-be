const supabase = require('../config/supabase');

const getAllTestimonials = async () => {
    const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('id', { ascending: false });

    if (error) throw error;
    return data;
};

const createTestimonial = async (payload) => {
    const { data, error } = await supabase
        .from('testimonials')
        .insert([
            {
                name: payload.name,
                message: payload.message
            }
        ])
        .select()
        .single();

    if (error) throw error;
    return data;
};

module.exports = {
    getAllTestimonials,
    createTestimonial
};
