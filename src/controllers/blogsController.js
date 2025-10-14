const { Blogs } = require('../models');
const { convertToSlug } = require('../helpers/string');
const mongoose = require('mongoose');
const moment = require('moment')

exports.createBlogs = async (req, res) => {

    try {
        let data = req.getBody(['title','slug', 'author','tags','meta_title', 'meta_description', 'meta_keywords', 'short_description', 'html_description','image','status', 'isFeatured', 'sort_order']);
        if (req.files?.image?.[0]?.filename) {
            data.image = req.files?.image?.[0]?.filename;
        } else {
            return res.status(422).json({
                status: false,
                message: 'Please provide image file.',
                data: []
            });
        }
        data.slug = convertToSlug(data.title).toLowerCase();
        let result = await Blogs.create(data);
        return res.successInsert(result);
    } catch (error) {
        return res.someThingWentWrong(error);
    }
}

exports.updateBlogs = async (req, res) => {
    try {
        let record = await Blogs.findById({ _id: new mongoose.Types.ObjectId(req.params.id), deletedAt: null });
        if (!record) return res.noRecords();

        let data = req.getBody(['title','slug', 'author','tags','meta_title', 'meta_description', 'meta_keywords', 'short_description', 'html_description','image','status', 'isFeatured', 'sort_order']);

        if (req.files?.image?.[0]?.filename) data.image = req.files?.image?.[0]?.filename;
        if (record.name !== data.name) data.slug = convertToSlug(data.title).toLowerCase();

        const result = await record.updateOne(data);
        return res.successUpdate(result);
    } catch (error) {
        return res.someThingWentWrong(error);
    }
}


exports.dashboard = async (req, res) => {
    try {
        const featuredBlogs = await Blogs.find({ isFeatured: true, status: 1, deletedAt: null }).sort({ sort_order: -1 }).limit(4);
     
        return res.success(featuredBlogs);
    } catch (error) {
        return res.someThingWentWrong(error);
    }
}

exports.getBlogs = async (req, res) => {
    try {
        let { limit, pageNo, query } = req.query;
        limit = limit ? parseInt(limit) : 10;
        pageNo = pageNo ? parseInt(pageNo) : 1;
        var filters = { deletedAt: null}

        if (query && query !== "") {
            filters["$or"] = [
                { title: { $regex: new RegExp(query, "i") } },
                { slug: { $regex: new RegExp(query, "i") } },
                { meta_title: { $regex: new RegExp(query, "i") } },
                { meta_description: { $regex: new RegExp(query, "i") } }
            ];
        }
        const results = await Blogs.find(filters).sort({ createdAt: -1 }).limit(limit).skip((pageNo - 1) * limit);
        const total_count = await Blogs.countDocuments(filters);

        if (results.length > 0)  return res.pagination(results, total_count, limit, pageNo);
        else return res.datatableNoRecords();  
    } catch (error) {
        return res.someThingWentWrong(error);
    }
};



// Controller function
exports.getBlogsWithSlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await Blogs.findOne({ slug });
    if (!blog) return res.noRecords();

    return res.success(blog);
  } catch (error) {
    return res.someThingWentWrong(error);
  }
};


exports.deleteBlogs = async (req, res) => {
    try {
        const blogs = await Blogs.findOne({ _id: new mongoose.Types.ObjectId(req.params.id), deletedAt: null });
        if (!blogs) return res.status(404).json({ error: "Blogs not found" });

        await blogs.updateOne({ deletedAt: moment().toISOString() });
        return res.successDelete(blogs);
    } catch (error) {
        return res.someThingWentWrong(error);
    }
};



