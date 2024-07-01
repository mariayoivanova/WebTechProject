const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = Subscriber;
