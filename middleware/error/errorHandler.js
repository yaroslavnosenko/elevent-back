module.exports = function (err, req, res, next) {
    switch (err.name) {
        case 'CastError':
            res.status(400).send(`${err.value} is invalid ID`);
            break;
        default:
            console.log(err);
            res.status(500).send('Something failed');
            break
    }
};
