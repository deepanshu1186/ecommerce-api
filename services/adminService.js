const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const getAdmins = async () => {
    const [rows] = await pool.query('SELECT * FROM admins');
    return rows;
};

const createAdmin = async ({ username, password, email, first_name, last_name, phone_number, status }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
        'INSERT INTO admins (username, password_hash, email, first_name, last_name, phone_number, status) VALUES (?, ?, ?, ?, ?, ?, ?)', 
        [username, hashedPassword, email, first_name, last_name, phone_number, status]
    );
    return result.insertId;
};

const getAdminByUsername = async (username) => {
    const [rows] = await pool.query('SELECT * FROM admins WHERE username = ?', [username]);
    return rows[0];
};

const getAdminProfile = async (admin_id) => {
    const [rows] = await pool.query('SELECT admin_id, username, email, first_name, last_name, phone_number, status from admins where admin_id = ?',[admin_id]);
    return rows[0];
}

module.exports = {
    getAdmins,
    createAdmin,
    getAdminByUsername,
    getAdminProfile
};
