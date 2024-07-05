// server/models/photoModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Spring/Summer', 'Fall/Winter']
    }
}, { timestamps: true });

module.exports = mongoose.model('Photo', PhotoSchema);
