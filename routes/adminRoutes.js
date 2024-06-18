const express = require('express');
const { getAdmins, createAdmin, loginAdmin, getAdminProfile } = require('../controllers/adminController');
const authenticateJWT = require('../middlewares/authMiddleware');

try{

} catch(error) {
    console.log(error);
}
const router = express.Router();

router.post('/signIn', loginAdmin);  // Login route
router.post('/signUp', createAdmin);  // Signup route
router.post('/adminList', authenticateJWT, getAdmins);  // Protected route for getting admins
router.post('/getAdminProfile', authenticateJWT, getAdminProfile);  // Protected route for getting admins

module.exports = router;
