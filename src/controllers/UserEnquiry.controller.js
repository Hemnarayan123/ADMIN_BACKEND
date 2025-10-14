const UserEnquiry = require('../models/UserEnquiry')

exports.createUserEnquiry = async (req, res) => {

    try {
        let data = req.getBody(["user_name", "user_emai", "user_message" ]);
        let result = await UserEnquiry.create(data);
        return res.successInsert(result);
    } catch (error) {
        return res.someThingWentWrong(error);
    }
}


exports.getUserEnquiry = async (req, res) => {
    try {
        let { limit, pageNo, query } = req.query;
        limit = limit ? parseInt(limit) : 10;
        pageNo = pageNo ? parseInt(pageNo) : 1;
        var filters = { deletedAt: null}

        if (query && query !== "") {
            filters["$or"] = [
                { user_name: { $regex: new RegExp(query, "i") } },
                { user_email: { $regex: new RegExp(query, "i") } },
            ];
        }
        const results = await UserEnquiry.find(filters).sort({ createdAt: -1 }).limit(limit).skip((pageNo - 1) * limit);
        const total_count = await UserEnquiry.countDocuments(filters);

        if (results.length > 0)  return res.pagination(results, total_count, limit, pageNo);
        else return res.datatableNoRecords();  
    } catch (error) {
        return res.someThingWentWrong(error);
    }
};


exports.deleteUserEnquiry = async (req, res) => {
    try {
        const UserEnquiry = await UserEnquiry.findOne({ _id: new mongoose.Types.ObjectId(req.params.id), deletedAt: null });
        if (!UserEnquiry) return res.status(404).json({ error: "UserEnquiry not found" });

        await UserEnquiry.updateOne({ deletedAt: moment().toISOString() });
        return res.successDelete(UserEnquiry);
    } catch (error) {
        return res.someThingWentWrong(error);
    }
};



