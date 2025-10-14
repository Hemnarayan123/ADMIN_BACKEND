const Enquiry = require('../models/Enquiry.js')
const { mailer, generateEmailTemplate } = require("../helpers/mail.js");
const { default: mongoose } = require('mongoose');
const moment = require('moment')

exports.handleEnquiry = async (req, res) => {
    const { jobTitle, fullName, email, phone, service, schedule } = req.body;

    try {
        // Convert scheduleDate to a Date object if provided
        const enquiry = new Enquiry({
            jobTitle,
            fullName,
            email,
            phone,
            service,
            schedule: {
                date: schedule.date ? new Date(schedule.date) : null,
                time: schedule.time || null,
                timeZone: schedule.timeZone || null
            },
        });
        await enquiry.save();
        await sendEnquiryConfirmationEmail(enquiry);
        res.status(201).json({
            status: true,
            message: "Enquiry submitted successfully.",
            data: enquiry,
        });
    } catch (error) {
        // Handle any errors during the submission
        res.status(500).json({
            status: false,
            message: "An error occurred while submitting the enquiry.",
            error: error.message,
        });
    }
};

const moreInfo = 'https://brenin.co/'

const sendEnquiryConfirmationEmail = async (enquiry) => {
    const emailType = 'enquiry';
    const recipientName = enquiry.fullName;
    const actionLink = moreInfo

    // Generate the dynamic email template based on the type
    const emailTemplate = generateEmailTemplate(emailType, recipientName, actionLink);

    const mailOptions = {
        from: process.env.EMAIL,
        to: enquiry.email,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
    };

    try {
        await mailer.sendMail(mailOptions);
        console.log("Thank you email sent successfully.");
    } catch (error) {
        console.error("Error sending thank you email:", error.message);
    }
};

// Controller function to fetch all enquiries
exports.getEnquiries = async (req, res) => {
    try {
        // Fetch all enquiries from the database
        const enquiries = await Enquiry.find({deletedAt: null}).sort({ "schedule.date": -1 });

        // Send success response
        res.status(200).json({
            status: true,
            message: "Enquiries fetched successfully.",
            data: enquiries,
        });
    } catch (error) {
        // Handle any errors during the retrieval
        res.status(500).json({
            status: false,
            message: "An error occurred while fetching enquiries.",
            error: error.message,
        });
    }
};

exports.getEnquiriesFilter = async (req, res) => {
    try {
        let { limit, pageNo, query } = req.query;
        limit = limit ? parseInt(limit) : 10;
        pageNo = pageNo ? parseInt(pageNo) : 1;
        var filters = { deletedAt: null }
  
            if (query && query !== "") {
                filters["$or"] = [
                    { jobTitle: { $regex: new RegExp(query, "i") } },
                    { fullName: { $regex: new RegExp(query, "i") } },
                    { email: { $regex: new RegExp(query, "i") } },
                    { phone: { $regex: new RegExp(query, "i") } },
                    { service: { $regex: new RegExp(query, "i") } }
                ];
            }
        const total_count = await Enquiry.countDocuments();
        const results = await Enquiry.find(filters).sort({ createdAt: -1 }).limit(limit).skip((pageNo - 1) * limit);
        if (results.length > 0) {
            return res.pagination(results, total_count, limit, pageNo);
        } else {
            return res.datatableNoRecords();
        }
    } catch (error) {
        return res.someThingWentWrong(error);
    }
};

exports.deleteEnquiries = async (req, res) => {
    try {
        const enquiry = await Enquiry.findOne({ _id: new mongoose.Types.ObjectId(req.params.id), deletedAt: null });
        console.log(enquiry);
        
        if (!enquiry) throw new Error('Enquiry not found!');
        
        await enquiry.updateOne({ deletedAt: moment().toISOString() });
        return res.successDelete(enquiry);
    } catch (error) {
        return res.someThingWentWrong(error);
    }
}