// controllers/orderController.js
const pool = require('../config/db');

const getOrders = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM orders');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createOrder = async (req, res) => {
    const { user_id, total_amount, status } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, ?)', [user_id, total_amount, status]);
        res.json({ order_id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getOrders, createOrder };
