const { check } = require('express-validator');

module.exports = (method) => {
    switch (method) {
        case "register":
            {
                return [
                    check("first_name", "First Name Required..!!").exists().not().isEmpty().isLength({ min: 2, max: 50 }),
                    check("last_name", "Last Name Required..!!").exists().not().isEmpty().isLength({ min: 2, max: 50 }),
                    check("email", "Invalid Email..!!").not().isEmpty().isEmail().isLength({ min: 6, max: 50 }),
                    check("mobile", "Mobile Number Required.!!").exists().not().isEmpty().isLength({ min: 10, max: 10 }).withMessage("10 Digits Required.").isNumeric().withMessage("Mobile No Must Be Digits Only."),
                    check("gender", "Gender is required..!!").not().isEmpty(),
                    check("otp", "OTP Required!").exists().not().isEmpty(),
                ];
            }
            break;
        case "login":
            {
                return [
                    check("mobile", "Mobile Number Required!").exists().not().isEmpty(),
                    check("password", "Password Required!").exists().not().isEmpty(),
                ];
            }
            break;
        case "sendOtp":
            {
                return [
                    check("mobile", "Mobile Number Required!").exists().not().isEmpty(),
                ];
            }
            break;
        case "loginWithOtp":
            {
                return [
                    check("mobile", "Mobile Number Required!").exists().not().isEmpty(),
                    check("otp", "OTP Required!").exists().not().isEmpty(),
                ];
            }
            break;
        case "resetPassword":
            {
                return [
                    check("mobile", "Mobile Number Required!").exists().not().isEmpty(),
                    check("password", "Password Required!").exists().not().isEmpty(),
                    check("otp", "OTP Required!").exists().not().isEmpty(),
                ];
            }
            break;
        case "changePassword":
            {
                return [
                    check("password", "Password Required!").exists().not().isEmpty(),
                    check("new_password", "New Password Required!").exists().not().isEmpty(),
                ];
            }
            break;
        case "updateProfile":
            {
                return [
                    check("name", "First Name Required..!!").exists().not().isEmpty().isLength({ min: 2, max: 50 }),
                    check("email", "Invalid Email..!!").not().isEmpty().isEmail().isLength({ min: 6, max: 50 }),
                    check("mobile", "Mobile Number Required.!!").exists().not().isEmpty().isLength({ min: 10, max: 10 }).withMessage("10 Digits Required.").isNumeric().withMessage("Mobile No Must Be Digits Only."),
                ];
            }
            break;
        case "updateProfileUser":
            {
                return [
                    check("first_name", "First Name Required..!!").exists().not().isEmpty().isLength({ min: 2, max: 50 }),
                    check("last_name", "Last Name Required..!!").exists().not().isEmpty().isLength({ min: 2, max: 50 }),
                    check("email", "Invalid Email..!!").not().isEmpty().isEmail().isLength({ min: 6, max: 50 }),
                    check("mobile", "Mobile Number Required.!!").exists().not().isEmpty().isLength({ min: 10, max: 10 }).withMessage("10 Digits Required.").isNumeric().withMessage("Mobile No Must Be Digits Only."),
                ];
            }
            break;
        case "ContactUs":
            {
                return [
                    check("first_name", "First Name Required..!!").exists().not().isEmpty().isLength({ min: 2, max: 50 }),
                    check("last_name", "Last Name Required..!!").exists().not().isEmpty().isLength({ min: 2, max: 50 }),
                    check("email", "Invalid Email..!!").not().isEmpty().isEmail().isLength({ min: 6, max: 50 }),
                    check("mobile", "Mobile Number Required.!!").exists().not().isEmpty().isLength({ min: 10, max: 10 }).withMessage("10 Digits Required.").isNumeric().withMessage("Mobile No. Must Be Digits Only."),
                ];
            }
            break;

        case "blogs":
            {
                return [
                    check("title", "Title Required..!!").exists().not().isEmpty().isLength({ min: 2, max: 100 }),
                    check("slug", "Slug Required..!!").exists().not().isEmpty().isLength({ min: 2, max: 100 }),
                    check("author", "Author Required..!!").exists().not().isEmpty().isLength({ min: 2, max: 100 }),
                    check("tags", "Tags Required..!!").exists().not().isEmpty().isLength({ min: 2, max: 500 }),
                    check("meta_title", "Meta Title Required..!!").exists().not().isEmpty().isLength({ min: 2, max: 100 }),
                    check("meta_description", "Meta Description Required..!!").exists().not().isEmpty().isLength({ min: 2, max: 500 }),
                    check("meta_keywords", "Meta Keyword Required..!!").exists().not().isEmpty().isLength({ min: 2, max: 500 }),
                    check("html_description", "HTML Description Keyword Required..!!").exists().not().isEmpty().isLength({ min: 2 }),
                    check("short_description", "Short Description Required..!!").exists().not().isEmpty().isLength({ min: 10, max: 500 }),
           
                ];
            }
 
            break;

            case "enquiry":
                return [
                    check('jobTitle', 'Job title is required.').exists().not().isEmpty().isLength({ min: 2, max: 100 }),
                    check('fullName', 'Full name is required.').exists().not().isEmpty().isLength({ min: 2, max: 100 }),
                    check('email', 'Valid email is required.').exists().not().isEmpty().isEmail().isLength({ min: 5, max: 100 }),
                    check('phone', 'Phone number is required.').exists().not().isEmpty().isLength({ min: 7, max: 15 }).isNumeric(),
                    check('service', 'Service is required.').exists().not().isEmpty().isLength({ min: 2, max: 100 }),
                    check('schedule.date', 'Invalid date format.').optional().isISO8601().toDate(),
                    check('schedule.time', 'Invalid time format. Use HH:MM.').optional().matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/),
                    check('schedule.timeZone', 'Time zone is required and should be a valid string.').optional().not().isEmpty().isLength({ min: 1, max: 100 })
                ];
            break;

        case "discountCouponAdd":
            {
                return [
                    check("name", "Name Required..!!").exists().not().isEmpty().isLength({ min: 2, max: 50 }),
                    check("code", "Code is required and should be alphanumeric between 5 and 20 characters.").exists().not().isEmpty().isLength({ min: 5, max: 20 }),
                    check("discount_amount", "Discount amount should be a positive number between 1 and 1000000.").exists().not().isEmpty().isFloat({ min: 1, max: 1000000 }),
                    check("min_cart_amount", "Minimum cart amount should be a positive number between 1 and 1000000.").exists().not().isEmpty().isFloat({ min: 1, max: 1000000 }),
                    check("discount_amount_usd", "Discount amount (USD) should be a positive number between 1 and 1000000.").exists().not().isEmpty().isFloat({ min: 1, max: 1000000 }),
                    check("min_cart_amount_usd", "Minimum cart amount (USD) should be a positive number between 1 and 1000000.").exists().not().isEmpty().isFloat({ min: 1, max: 1000000 }),
                    check("expaire_date", "Expiry date is required and should be a valid date.").exists().not().isEmpty().isISO8601(),
                    check("max_uses", "Maximum uses should be a positive number between 1 and 1000000.").exists().not().isEmpty().isInt({ min: 1, max: 1000000 }),
                    check("status", "Status is required and should be boolean.").exists().not().isEmpty().isBoolean(),
                ];
            }
            break;
        case "discountCouponEdit":
            {
                return [
                    check('id', 'Id Required..!!').exists().not().isEmpty(),
                    check("name", "Name Required..!!").exists().not().isEmpty().isLength({ min: 2, max: 50 }),
                    check("code", "Code is required and should be alphanumeric between 5 and 20 characters.").exists().not().isEmpty().isLength({ min: 5, max: 20 }),
                    check("discount_amount", "Discount amount should be a positive number between 1 and 1000000.").exists().not().isEmpty().isFloat({ min: 1, max: 1000000 }),
                    check("min_cart_amount", "Minimum cart amount should be a positive number between 1 and 1000000.").exists().not().isEmpty().isFloat({ min: 1, max: 1000000 }),
                    check("discount_amount_usd", "Discount amount (USD) should be a positive number between 1 and 1000000.").exists().not().isEmpty().isFloat({ min: 1, max: 1000000 }),
                    check("min_cart_amount_usd", "Minimum cart amount (USD) should be a positive number between 1 and 1000000.").exists().not().isEmpty().isFloat({ min: 1, max: 1000000 }),
                    check("expaire_date", "Expiry date required..!!").exists().not().isEmpty(),
                    check("max_uses", "Maximum uses should be a positive number between 1 and 1000000.").exists().not().isEmpty().isInt({ min: 1, max: 1000000 }),
                    check("status", "Status is required and should be boolean.").exists().not().isEmpty().isBoolean(),
                ];
            }
            break;


        case "booking":
            {
                return [
                    check("retreat_id", "Retreat_id Required..!!").exists().not().isEmpty(),
                    check("single_occupancy", "Single Occupancy Required..!!").exists().not().isEmpty(),
                    check("double_occupancy", "Double Occupancy Required..!!").exists().not().isEmpty(),
                    check("triple_occupancy", "Triple Occupancy Required..!!").exists().not().isEmpty(),
                    check("currency", "Currency Required..!!").exists().not().isEmpty(),
                    check("discount_code", "Discount Code Required..!!").exists().optional({ nullable: true, checkFalsy: false }),
                    check("type", "Booking Type Required..!!").exists().not().isEmpty(),
                ];
            }
            break;

        case "booking-2":
            {
                return [
                    check("package_id", "Package_id Required..!!").exists().not().isEmpty(),
                    check("slot_id", "Slot_id Required..!!").exists().not().isEmpty(),
                    check("currency", "Currency Required..!!").exists().not().isEmpty(),
                    check("discount_code", "Discount Code Required..!!").exists().optional({ nullable: true, checkFalsy: false }),
                ];
            }
            break;



    }


};