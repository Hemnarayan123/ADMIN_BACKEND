const FeatureKits = require("../models/FeatureKits");
const mongoose = require("mongoose");
const moment = require("moment");

exports.createFeatureKits = async (req, res) => {
  try {
    let data = req.getBody(["product_name", "product_status"]);
    const product_image = req.file ? req.file.location || req.file.path : null; // S3 or local

    if (!product_image) {
      return res.status(400).json({
        status: false,
        message: "Image upload failed or missing",
      });
    }

    // add uploaded image path to data
    data.product_image = product_image;

    const result = await FeatureKits.create(data);
    return res.successInsert(result);
  } catch (error) {
    return res.someThingWentWrong(error);
  }
};

exports.updateFeatureKits = async (req, res) => {
  try {
    let record = await FeatureKits.findById({
      _id: new mongoose.Types.ObjectId(req.params.id),
      deletedAt: null,
    });
    if (!record) return res.noRecords();

    let data = req.getBody(["product_name", "product_status"]);

    if (req.file?.location) {
      data.product_image = req.file.location;
      data.image_updated_at = new Date();
    }
    data.updatedAt = new Date();

    const result = await record.updateOne(data);
    return res.successUpdate(result);
  } catch (error) {
    return res.someThingWentWrong(error);
  }
};

exports.dashboard = async (req, res) => {
  try {
    const featuredFeatureKits = await FeatureKits.find({ deletedAt: null });

    return res.success(featuredFeatureKits);
  } catch (error) {
    return res.someThingWentWrong(error);
  }
};

exports.getFeatureKits = async (req, res) => {
  try {
    let { limit, pageNo, query } = req.query;
    limit = limit ? parseInt(limit) : 10;
    pageNo = pageNo ? parseInt(pageNo) : 1;
    var filters = { deletedAt: null };

    if (query && query !== "") {
      filters["$or"] = [
        { product_name: { $regex: new RegExp(query, "i") } },
        { product_status: { $regex: new RegExp(query, "i") } },
      ];
    }
    const results = await FeatureKits.find(filters)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((pageNo - 1) * limit);
    const total_count = await FeatureKits.countDocuments(filters);

    if (results.length > 0)
      return res.pagination(results, total_count, limit, pageNo);
    else return res.datatableNoRecords();
  } catch (error) {
    return res.someThingWentWrong(error);
  }
};

// Controller function
exports.getFeatureKitsById = async (req, res) => {
  try {
    const { _id } = req.params;
    const hero = await FeatureKits.findOne({ _id });
    if (!hero) return res.noRecords();

    return res.success(hero);
  } catch (error) {
    return res.someThingWentWrong(error);
  }
};

exports.deleteFeatureKits = async (req, res) => {
  try {
    const FeatureKits = await FeatureKits.findOne({
      _id: new mongoose.Types.ObjectId(req.params.id),
      deletedAt: null,
    });
    if (!FeatureKits)
      return res.status(404).json({ error: "FeatureKits not found" });

    await FeatureKits.updateOne({ deletedAt: moment().toISOString() });
    return res.successDelete(FeatureKits);
  } catch (error) {
    return res.someThingWentWrong(error);
  }
};
