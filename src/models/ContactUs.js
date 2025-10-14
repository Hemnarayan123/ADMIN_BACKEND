const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    type: {
        type: Number,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    message: {
        type: String,
        required: true,
        trim: true
    },

}, {
    timestamps: true,
});

module.exports = mongoose.model('ContactUs', Schema);