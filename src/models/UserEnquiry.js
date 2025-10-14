const mongoose = require("mongoose");

const UserEnquirySchema = new mongoose.Schema(
  {
    user_name: { type: String, required: true },
    user_email: { type: String, required: true },
    user_message: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserEnquiry", UserEnquirySchema);
