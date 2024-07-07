// controllers/adminController.js
const adminService = require('../services/adminService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const initializeRedisClient = require('../redisClient');

dotenv.config();
const redisClient = initializeRedisClient();

const getAdminProfile = async (req, res) => {
    try {
        const admin_id = req.body.admin_id;
        const profile = await adminService.getAdminProfile(admin_id);
        if (profile) {
            res.json({ 'msg': 'admin profile found.', profile });
        } else {
            res.json({ 'msg': 'admin not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAdmins = async (req, res) => {
    try {
        const admins = await adminService.getAdmins();
        res.json(admins);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createAdmin = async (req, res) => {
    const { username, password, email, first_name, last_name, phone_number, status } = req.body;

    try {
        const adminId = await adminService.createAdmin({ username, password, email, first_name, last_name, phone_number, status });
        res.json({ admin_id: adminId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const loginAdmin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await adminService.getAdminByUsername(username);
        if (!admin) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password_hash);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: admin.admin_id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({
            token,
            admin: {
                id: admin.admin_id,
                username: admin.username,
                email: admin.email,
                first_name: admin.first_name,
                last_name: admin.last_name,
                phone_number: admin.phone_number,
                status: admin.status
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const logOutAdmin = async (req, res) => {
    try {
        const token = req.headers['authorization'];
        if (token) {
            const decodedToken = jwt.decode(token);
            const expiresAt = decodedToken.exp - Math.floor(Date.now() / 1000);
            redisClient.setex(token, expiresAt, 'blacklisted', (err, reply) => {
                if (err) {
                    console.log('Failed to blacklist token:', err);
                    return res.status(500).json({ message: 'Failed to blacklist token' });
                }
                return res.json({ message: 'Successfully logged out' });
            });
        } else {
            return res.status(400).json({ message: 'Token is required for logout' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAdmins, createAdmin, loginAdmin, logOutAdmin, getAdminProfile };
