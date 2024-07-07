// server.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

try {
    // Import routes
    const adminRoutes = require('./routes/adminRoutes');
    //const productRoutes = require('./routes/productRoutes');
    //const userRoutes = require('./routes/userRoutes');
    //const orderRoutes = require('./routes/orderRoutes');

    // Use routes
    app.use('/api/admins', adminRoutes);  // Correct base URL for admin routes
    //app.use('/api/products', productRoutes);
    //app.use('/api/users', userRoutes);
    //app.use('/api/orders', orderRoutes);

} catch (error) {
    console.log(error);
}

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
