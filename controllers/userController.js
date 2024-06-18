// controllers/userController.js
const pool = require('../config/db');

const getUsers = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createUser = async (req, res) => {
    const { username, password_hash, email, first_name, last_name, address, phone_number, status } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO users (username, password_hash, email, first_name, last_name, address, phone_number, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [username, password_hash, email, first_name, last_name, address, phone_number, status]);
        res.json({ user_id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getUsers, createUser };
