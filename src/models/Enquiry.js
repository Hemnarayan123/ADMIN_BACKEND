// models/Enquiry.js
const mongoose = require('mongoose')

const Schema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        message: { type: String, required: true },
        deletedAt: { type: Date, default: null }

    }, { timestamps: true }
);

module.exports = mongoose.model('Enquiry', Schema);
