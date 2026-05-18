const testimonialService = require('../services/testimonial.services');

const getAllTestimonials = async (req, res) => {
    try {
        const data = await testimonialService.getAllTestimonials();
        res.status(200).json({
            status: 'success',
            data
        });
    } catch (error) {
        console.error('Error in getAllTestimonials:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};

const createTestimonial = async (req, res) => {
    try {
        const { name, message } = req.body;

        if (!name || !message) {
            return res.status(400).json({
                status: 'error',
                message: 'Name and message are required'
            });
        }

        const data = await testimonialService.createTestimonial({ name, message });
        
        res.status(201).json({
            status: 'success',
            data
        });
    } catch (error) {
        console.error('Error in createTestimonial:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};

module.exports = {
    getAllTestimonials,
    createTestimonial
};
