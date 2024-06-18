// controllers/productController.js
const pool = require('../config/db');

const getProducts = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM products');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createProduct = async (req, res) => {
    const { name, description, price, category_id, stock, status } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO products (name, description, price, category_id, stock, status) VALUES (?, ?, ?, ?, ?, ?)', [name, description, price, category_id, stock, status]);
        res.json({ product_id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getProducts, createProduct };
