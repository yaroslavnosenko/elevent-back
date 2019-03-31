const jwt = require('jsonwebtoken');

const {User} = require('../../database/sequelize');

const privateKey = 'alsjj511jkb51k';


module.exports = function (req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access denied. No token present');
    try {
        req.headers.user = jwt.verify(token, privateKey);
        return next()
    } catch (e) {
        return res.status(401).send('Access denied. Invalid token')
    }
};
