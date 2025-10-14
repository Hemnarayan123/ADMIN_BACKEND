// models/Enquiry.js
const mongoose = require('mongoose')

const Schema = new mongoose.Schema(
    {
        full_name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        company_name: { type: String, required: true },
        digi_human_options: { type: String, required: true },
    }, { timestamps: true }
);

module.exports = mongoose.model('Demo', Schema);
