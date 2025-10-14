// models/Enquiry.js
const mongoose = require('mongoose')

const Schema = new mongoose.Schema(
    {
        jobTitle: { type: String, required: true },
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        service: { type: String, required: true },
        schedule: {
            date: { type: Date },
            time: { type: String },
            timeZone: { type: String }
        },
        deletedAt: { type: Date, default: null }

    }, { timestamps: true }
);

module.exports = mongoose.model('Enquiry', Schema);
