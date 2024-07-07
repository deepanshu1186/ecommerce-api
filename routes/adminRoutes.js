// routes/adminRoutes.js
const express = require('express');
const { getAdmins, createAdmin, loginAdmin, logOutAdmin, getAdminProfile } = require('../controllers/adminController');
const authenticateJWT = require('../middlewares/authMiddleware');
const initializeRedisClient = require('../redisClient');

const router = express.Router();
const redisClient = initializeRedisClient();

// Middleware to check if token is blacklisted
const checkBlacklist = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        redisClient.get(token, (err, reply) => {
            if (err) {
                console.log('Redis error:', err);
                return res.status(500).json({ message: 'Redis error', error: err.message });
            }
            if (reply) {
                console.log('Token is blacklisted');
                return res.status(401).json({ message: 'Token is blacklisted' });
            }
            next();
        });
    } else {
        next();
    }
};

router.post('/signIn', loginAdmin);  // Login route
router.post('/signOut', logOutAdmin);  // Logout route
router.post('/signUp', createAdmin);  // Signup route
router.post('/adminList', checkBlacklist, authenticateJWT, getAdmins);  // Protected route for getting admins
router.post('/getAdminProfile', authenticateJWT,checkBlacklist, getAdminProfile);  // Protected route for getting admin profile

module.exports = router;
