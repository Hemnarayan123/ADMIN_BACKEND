const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const moment = require("moment");
const mongoose = require("mongoose");

// Create Admin
exports.createAdmin = async (req, res) => {
  try {
    let { name, email, mobile, password, status, role } = req.body;

    // Check for duplicate email
    const emailExists = await Admin.findOne({ email, deletedAt: null });
    if (emailExists) throw new Error("Email already exists !!");

    // Check for duplicate mobile
    const mobileExists = await Admin.findOne({ mobile, deletedAt: null });
    if (mobileExists) throw new Error("Mobile number already exists !!");

    // Handle image upload (optional)
    let image = null;
    if (req.file && req.file.location) {
      image = req.file.location;
    }

    // Encrypt password
    password = bcrypt.hashSync(password, 10);

    // Create admin
    const admin = await Admin.create({ name, email, role, password, mobile, status, image, image_updated_at: image ? new Date() : null });

    return res.successInsert(admin);
  } catch (error) {
    return res.someThingWentWrong(error);
  }
};

// Update Admin
exports.updateAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({
      _id: new mongoose.Types.ObjectId(req.params.id),
      deletedAt: null,
    });
    if (!admin) return res.noRecords();

    const vData = req.getBody([ "name", "email", "role", "password", "mobile", "status" ]);

    // Validate unique mobile
    if (vData.mobile && vData.mobile !== admin.mobile) {
      const existingAdmin = await Admin.findOne({
        mobile: vData.mobile,
        _id: { $ne: admin._id },
        deletedAt: null,
      });
      if (existingAdmin) throw new Error("Mobile number already exists !!");
    }

    // Update image if uploaded
    if (req.file && req.file.location) {
      vData.image = req.file.location;
      vData.image_updated_at = new Date();
    }

    // Hash password if changed
    if (vData.password) vData.password = bcrypt.hashSync(vData.password, 10);

    // Update timestamp
    vData.updatedAt = new Date();

    await Admin.updateOne({ _id: admin._id }, vData);
    return res.successUpdate({ ...admin.toObject(), ...vData });
  } catch (error) {
    return res.someThingWentWrong(error);
  }
};

// Update Profile (same as updateAdmin but for logged-in user)
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    let admin = await Admin.findOne({ _id: userId, deletedAt: null });
    if (!admin) return res.noRecords();

    const data = req.getBody(["name", "mobile", "email"]);
    if (req.file && req.file.location) {
      data.image = req.file.location;
      data.image_updated_at = new Date();
    }

    data.updatedAt = new Date();
    await Admin.updateOne({ _id: userId }, data);

    return res.successUpdate({ ...admin.toObject(), ...data });
  } catch (error) {
    return res.someThingWentWrong(error);
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({
      _id: new mongoose.Types.ObjectId(req.params.id),
      deletedAt: null,
    });
    if (!admin) return res.status(404).json({ error: "Admin not found" });

    await admin.updateOne({ $set: { deletedAt: moment().toISOString() } });
    return res.successDelete(admin);
  } catch (error) {
    return res.someThingWentWrong(error);
  }
};

exports.getAllAdmin = async (req, res) => {
  try {
    let { limit, pageNo, query, status } = req.query;
    limit = limit ? parseInt(limit) : 10;
    pageNo = pageNo ? parseInt(pageNo) : 1;

    var filters = { deletedAt: null };
    if (status) filters.status = status;

    if (query && query !== "") {
      filters["$or"] = [
        { name: { $regex: new RegExp(query, "i") } },
        { mobile: { $regex: new RegExp(query, "i") } },
        { email: { $regex: new RegExp(query, "i") } },
      ];
    }

    const results = await Admin.find(filters)
      .sort({ createdAt: -1 })
      .select("-password")
      .limit(limit)
      .skip((pageNo - 1) * limit)
      .populate("role");
    const total_count = await Admin.countDocuments(filters);

    if (results.length > 0) {
      return res.pagination(results, total_count, limit, pageNo);
    } else {
      return res.datatableNoRecords();
    }
  } catch (error) {
    return res.someThingWentWrong(error);
  }
};
