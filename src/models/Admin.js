const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10
    },
    password: {
        type: String,
    },
    image: {
        type: String,
        image_updated_at: Date,
        },
    status: {
        type: Boolean,
        default: true
    },

    role: {
        type:  String,
        enum : [1,2],
        default : 1
    },

    deletedAt: {
        type: Date,
        default: null
    },
}, {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true }
});

Schema.methods.getToken = function () {
    return jwt.sign({ subject: this._id }, process.env.ENCRYPTION_KEY_ADMIN, { expiresIn: process.env.EXPIRES_IN }); // Token expires in 1 hour
};

Schema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
};

module.exports = mongoose.model('Admin', Schema);