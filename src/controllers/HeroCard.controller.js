const HeroCard = require("../models/HeroCard");
const mongoose = require("mongoose");
const moment = require("moment");

exports.createHeroCard = async (req, res) => {
  try {
    let data = req.getBody(["team_name", "city_name", "team_image"]);
        if (req.file && req.file.location) {
      data.team_image = req.file.location;
    } else {
      return res.status(400).send({
        status: false,
        message: "File upload missing",
        data: []
      });
    }
    let result = await HeroCard.create(data);
    return res.successInsert(result);
  } catch (error) {
    return res.someThingWentWrong(error);
  }
};

exports.updateHeroCard = async (req, res) => {
  try {
    let record = await HeroCard.findById({
      _id: new mongoose.Types.ObjectId(req.params.id),
      deletedAt: null,
    });
    if (!record) return res.noRecords();

    let data = req.getBody(["team_name", "city_name"]);

    if (req.file?.location) {
      data.team_image = req.file.location;
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
    const featuredHeroCard = await HeroCard.find({ deletedAt: null });

    return res.success(featuredHeroCard);
  } catch (error) {
    return res.someThingWentWrong(error);
  }
};

exports.getHeroCard = async (req, res) => {
  try {
    let { limit, pageNo, query } = req.query;
    limit = limit ? parseInt(limit) : 10;
    pageNo = pageNo ? parseInt(pageNo) : 1;
    const filters = { deletedAt: null };

    if (query && query !== "") {
      filters["$or"] = [
        { city_name: { $regex: new RegExp(query, "i") } },
        { team_name: { $regex: new RegExp(query, "i") } },
      ];
    }
    const results = await HeroCard.find(filters)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((pageNo - 1) * limit);
    const total_count = await HeroCard.countDocuments(filters);

    if (results.length > 0)
      return res.pagination(results, total_count, limit, pageNo);
    else return res.datatableNoRecords();
  } catch (error) {
    return res.someThingWentWrong(error);
  }
};

// Controller function
exports.getHeroCardById = async (req, res) => {
  try {
    const { _id } = req.params;
    const hero_cards = await HeroCard.findOne({ _id });
    if (!hero_cards) return res.noRecords();

    return res.success(hero_cards);
  } catch (error) {
    return res.someThingWentWrong(error);
  }
};

exports.deleteHeroCard = async (req, res) => {
  try {
    const hero_card = await HeroCard.findOne({
      _id: new mongoose.Types.ObjectId(req.params.id),
      deletedAt: null,
    });
    if (!hero_card)
      return res.status(404).json({ error: "hero_card not found" });

    await hero_card.updateOne({ $set: { deletedAt: moment().toISOString() } });
    return res.successDelete(hero_card);
  } catch (error) {
    return res.someThingWentWrong(error);
  }
};
