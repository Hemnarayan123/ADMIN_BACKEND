const mongoose = require('mongoose')

const FeatureKitsSchema = new mongoose.Schema(
    {
        product_name: { type: String, required: true },
        product_image: { type: String, required: true},
        product_status: { type: String, required: true },
        deletedAt: { type: Date, default: null },
    }, { timestamps: true }
);

module.exports = mongoose.model('FeatureKits', FeatureKitsSchema);
