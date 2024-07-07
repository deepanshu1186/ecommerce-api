const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const authenticateJWT = (req, res, next) => {
    try{
        const token = req.header('Authorization')?.split(' ')[1];
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                if (err) {
                    return res.sendStatus(403);
                }
                req.user = user;
                next();
            });
        } else {
            res.sendStatus(401);
        }
    } catch(error) {
        console.log(error)
    }
};

module.exports = authenticateJWT;
