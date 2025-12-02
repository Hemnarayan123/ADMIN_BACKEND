const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    setting_type: {
        type: Number,
        required: true,
        trim: true
    },
    setting_name: {
        type: String,
        required: true,
        trim: true
    },
    field_label: {
        type: String,
        required: true,
        trim: true
    },
    field_name: {
        type: String,
        required: true,
        trim: true
    },
    field_type: {
        type: String,
        required: true,
        trim: true
    },
    field_value: {
        type: String,
        required: true,
        trim: true
    },
    is_require: {
        type: Boolean,
        required: true,
    },
}, {

    toObject: { getters: true },
    toJSON: { getters: true }
});


module.exports = mongoose.model('GeneralSettings', Schema);