const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriberSchema = new Schema({
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
        unique: true // Eindeutiger Index auf dem E-Mail-Feld
    }
}, {
    timestamps: true // Automatisch createdAt und updatedAt Felder hinzufügen
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);
module.exports = Subscriber;
