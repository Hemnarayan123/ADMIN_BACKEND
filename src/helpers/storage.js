const multer = require('multer');
const path = require('path');
const fs = require('fs');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const s3 = new aws.S3();


aws.config.update({
    secretAccessKey: process.env.AWS_ACCESS_KEY_ID,
    accessKeyId: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_S3_REGION
});

const storage = multerS3({
    s3: s3,
    // acl: 'public-read', // 'private' or 'public-read'
    bucket: process.env.AWS_S3_BUCKET,
    key: function (req, file, cb) {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});

// Multer upload configuration with file type validation (optional)
exports.uploadImage = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /json|jpg|jpeg|png/; // Allowed file types
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        if (extname) {
            cb(null, true);
        } else {
            cb(new Error('Only .json, .jpg, .jpeg, .png files are allowed'), false);
        }
    },
});

exports.uploadDoc = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /doc|pdf|docx/; // Allowed file types
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        if (extname) {
            cb(null, true);
        } else {
            cb(new Error('Only .pdf, .doc and .docx files are allowed'), false);
        }
    },
});

exports.uploadCsv = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /csv/; // Allowed file types
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        if (extname) {
            cb(null, true);
        } else {
            cb(new Error('Only .csv file are allowed'), false);
        }
    },
});

exports.uploadXlsx = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /xlsx/; // Allowed file types
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        if (extname) {
            cb(null, true);
        } else {
            cb(new Error('Only .xlsx file are allowed'), false);
        }
    },
});

exports.deleteFile = (deleteFile) => {
    try {
        if (deleteFile === null || deleteFile == undefined) return true;

        deleteFile = deleteFile.replaceAll(`${process.env.BASEURL}/uploads/`, '');

        if (![
            'users/avatar.png',
            'admins/avatar.png',
            'vendors/avatar.png',
            'customers/avatar.png',
            'products/product-placeholder.png',
            'product-categories/product-placeholder.png',
            '404-file-not-found.jpg'
        ].includes(deleteFile)) {
            if (fs.existsSync(`public/uploads/` + deleteFile)) {
                fs.unlinkSync(`public/uploads/` + deleteFile)
            }
        }

        return true;
    } catch (error) {
        return false;
    }
}