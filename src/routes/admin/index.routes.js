const authController = require('../../controllers/authController')
const generalSettingsController = require('../../controllers/generalSettingsController')
const blogsController = require('../../controllers/blogsController');
const CommonController = require('../../controllers/CommonController');
const enquiryController = require('../../controllers/enquiryController');
const adminController = require('../../controllers/adminController');
const demoController = require('../../controllers/demoController');
const HeroController = require('../../controllers/HeroCard.controller')
const featureKtsController = require('../../controllers/featureKts.controller')
const UserEnquiryController = require('../../controllers/UserEnquiry.controller')

const { showValidationErrors, authCheckAdmin } = require('../../middelwares');
const checkValid = require('../../middelwares/validator');
const router = require('express').Router()
const { uploadImage, uploadDoc, uploadXlsx } = require('../../helpers/storage');

// User Auth
router.post('/login', checkValid('login'), showValidationErrors, authController.login);
router.post('/send-otp', checkValid('sendOtp'), showValidationErrors, authController.sendotp);
router.post('/login-otp', checkValid('loginWithOtp'), showValidationErrors, authController.loginWithOtp);
router.post('/reset-password', checkValid('resetPassword'), showValidationErrors, authController.resetPassword);

router.get('/get-blogs',blogsController.getBlogs)
router.get('/get-herocard',HeroController.getHeroCard)
router.get('/get-herocard-details/:_id',HeroController.getHeroCardById)
router.get('/get-featurekits',featureKtsController.getFeatureKits)
router.get('/get-featurekit-details/:_id',featureKtsController.getFeatureKitsById)
router.post('/create-userEnquery',UserEnquiryController.createUserEnquiry )
router.get('/get-home-blogs',blogsController.dashboard)
router.get('/get-blogs-details/:slug',blogsController.getBlogsWithSlug)

// Request Demo 
router.post('/create-request-demo', demoController.createDemos);
router.get('/get-request-demo', demoController.getDemos);


// Protected Routes..
router.post("/add-enquiry", checkValid('enquiry'), showValidationErrors, enquiryController.handleEnquiry);
router.use(authCheckAdmin);

// Admin Protected Routes
router.get('/logout', authController.logout);
router.post('/change-password', checkValid('changePassword'), showValidationErrors, authController.changePassword);
router.get('/profile', authController.getProfile);
router.post('/update-profile', uploadImage.single('image'), showValidationErrors, authController.updateProfile);
router.post('/change-profile-image', uploadImage.single('image'), authController.changeProfileImage);

router.get('/settings-list/:type', generalSettingsController.listGeneralSetting);

router.delete('/toggle-status/:table/:id', generalSettingsController.toggleStatus);
router.delete('/delete-record/:table/:id', generalSettingsController.commonDelete);
router.put('/update-settings',    uploadImage.fields([
    { name: 'favicon', maxCount: 1 },
    { name: 'logo', maxCount: 1 },
    { name: 'footer_logo', maxCount: 1 }
  ]),generalSettingsController.updateGeneralSetting)
// Blogs
router.post('/create-blogs',  uploadImage.single('image'), checkValid('blogs'), showValidationErrors,blogsController.createBlogs )
router.put('/update-blogs/:id', uploadImage.single('image'), checkValid('blogs'), showValidationErrors, blogsController.updateBlogs)
router.delete('/delete-blogs/:id',blogsController.deleteBlogs)

// Enquiry
router.get("/get-enquiry", enquiryController.getEnquiries);
router.get("/get-enquiry-filter", enquiryController.getEnquiriesFilter);
router.delete("/delete-enquiry/:id", enquiryController.deleteEnquiries);

router.get('/contact-us-datatable', CommonController.contactUsList)

router.get("/dashboard", CommonController.dashboard);

// Hero
router.post('/create-herocard', uploadImage.single('team_image'), showValidationErrors,HeroController.createHeroCard )
router.put('/update-herocard/:id', uploadImage.single('team_image'),showValidationErrors, HeroController.updateHeroCard)
router.delete('/delete-herocard/:id',showValidationErrors, HeroController.deleteHeroCard)

// Feature Kits
router.post('/create-featurekits', uploadImage.single('product_image') , showValidationErrors,featureKtsController.createFeatureKits )
router.put('/update-featurekits/:id', uploadImage.single('product_image') ,showValidationErrors, featureKtsController.updateFeatureKits)
router.delete('/delete-featurekits/:id',showValidationErrors, featureKtsController.deleteFeatureKits)

// Enquery
router.get('/get-user_enquery',UserEnquiryController.getUserEnquiry)
router.delete('/delete-user_enquery', UserEnquiryController.deleteUserEnquiry)

// Admin 
router.post("/add-admin", adminController.createAdmin);
router.put("/update-admin/:id", adminController.updateAdmin);
router.delete("/delete-admin/:id", adminController.deleteAdmin);
router.get("/get-admins", adminController.getAllAdmin)

router.all('/admin/*', function (req, res) {
    res.status(404).send({
        status: 404,
        message: 'API not found',
        data: [],
    });
});

module.exports = router;