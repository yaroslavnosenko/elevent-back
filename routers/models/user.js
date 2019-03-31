const _ = require('lodash');
const express = require('express');


const auth = require('../../middleware/auth/auth');
const {User} = require('../../database/sequelize');


const router = express.Router();

router.put('', auth, async (req, res) => {
    console.log(req.headers.user.uid);
    const user = await User.findOne({where: {uid: req.headers.user.uid}});
    if (user) {
        try {
            await User.update(
                _.pick(req.body, ['profile_url', 'display_name', 'email', 'summary', 'bio']),
                {where: {uid: user.uid} }
            );
            return res.send({
                user_id: user.id
            });
        } catch (e) {
            console.log(e);
            return res.status(400).send({error: 'Bad request', request: req.body});
        }
    } else {
        return res.status(403).send({error: 'Access denied'});
    }
});

module.exports = router;
