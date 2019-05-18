const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    name: { type: String, required: false},
    message: { type: String, required: false },
    rate: { type: Number, required: false },
});

module.exports = mongoose.model('Review', reviewSchema);