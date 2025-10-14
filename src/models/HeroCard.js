const mongoose = require("mongoose");

const HeroCardSchema = new mongoose.Schema(
  {
    team_name: { type: String, required: true },
    city_name: { type: String, required: true },
    team_image: { type: String, required: true},
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HeroCard", HeroCardSchema);
