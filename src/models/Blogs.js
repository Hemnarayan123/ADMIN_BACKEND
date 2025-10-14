const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    title: { type : String, required : true},
    slug: { type: String, required: true, trim: true, unique: true},
    author: { type: String, required: true},
    tags: { type: String, required: true},
    meta_title : {type: String, required: true},
    meta_description : {type: String, required: true},
    meta_keywords : {type: String, required: true},
    short_description: { type: String, required: true},
    html_description: { type: String, required: true},
    image: { type: String, required: true,
        get: (value) => `${process.env.BASEURL}/uploads/blogs/${value}`
    },
    isFeatured: { type: Boolean, default: false },
    sort_order : {type: Number , default: 0 },
    status: { type: Number, default: true},
    deletedAt: {type: Date, default: null},
}, {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true }
});

module.exports = mongoose.model('Blogs', Schema);