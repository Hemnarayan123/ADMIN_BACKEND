const { Demo } = require('../models');

exports.createDemos = async (req, res) => {
    try {
        let data = req.getBody(['full_name', 'email', 'phone', 'company_name', 'digi_human_options']);
        let result = await Demo.create(data);
        return res.successInsert(result);
    } catch (error) {
        return res.someThingWentWrong(error);
    }
}

exports.getDemos = async (req, res) => {
    try {
        let { limit, pageNo, query } = req.query;
        limit = limit ? parseInt(limit) : 10;
        pageNo = pageNo ? parseInt(pageNo) : 1;
        var filters = { deletedAt: null}

        if (query && query !== "") {
            filters["$or"] = [
                { full_name: { $regex: new RegExp(query, "i") } },
                { email: { $regex: new RegExp(query, "i") } },
                { phone: { $regex: new RegExp(query, "i") } },
                { service: { $regex: new RegExp(query, "i") } }
            ];
        }
        const results = await Demo.find(filters).sort({ createdAt: -1 }).limit(limit).skip((pageNo - 1) * limit);
        const total_count = await Demo.countDocuments(filters);

        if (results.length > 0)  return res.pagination(results, total_count, limit, pageNo);
        else return res.datatableNoRecords();  
    } catch (error) {
        return res.someThingWentWrong(error);
    }
};