const Admin = require("./Admin");
const GeneralSetting = require("./GeneralSetting");
const ContactUs = require("./ContactUs");
const Blogs = require("./Blogs");
const mongoose = require('mongoose');
const Enquiry = require('./Enquiry');
const Demo = require('./DemoRequest');
const UserEnquiry = require("../models/UserEnquiry");
const HeroCard = require("../models/HeroCard");
const FeatureKits = require("../models/FeatureKits");

const connection = mongoose.connection;
const db = mongoose.connection.db;
const createFromHexString = mongoose.Types.ObjectId.createFromHexString;


module.exports = { Admin, GeneralSetting, ContactUs, Blogs, mongoose, connection, createFromHexString, db, Enquiry, Demo, UserEnquiry, FeatureKits, HeroCard };