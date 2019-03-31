const parser = require('body-parser');
const errorHandler = require('../middleware/error/errorHandler');

const auth = require('../routers/auth/auth');
const user = require('../routers/models/user');
const event = require('../routers/models/event');

module.exports = function (app) {
    app.use(parser.json());
    app.use(parser.urlencoded({ extended: true }));
    app.use('/auth', auth);
    app.use('/user', user);
    app.use('/event', event);
    app.use(errorHandler)
};
