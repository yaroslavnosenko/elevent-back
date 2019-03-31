const jwt = require('jsonwebtoken');
const _ = require('lodash');
const express = require('express');


const auth = require('../../middleware/auth/auth');
const {User} = require('../../database/sequelize');


const privateKey = 'alsjj511jkb51k';
const expiresIn = '10d';
const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const existingUser = await User.findOne({where: {uid: req.body.uid}});
        let token;
        let isNew = true;
        if (existingUser) {
            token = jwt.sign(
                _.pick(
                    existingUser, ['id', 'profile_url', 'uid', 'photo_url', 'display_name', 'email', 'summary', 'bio']
                ),
                privateKey, {expiresIn: expiresIn});
            isNew = false;
        } else {
            const newUser = await User.create(
                {
                    profile_url: req.body.profile_url,
                    uid: req.body.uid,
                    photo_url: req.body.photo_url,
                    display_name: req.body.display_name,
                    email: req.body.email,
                    summary: ' ',
                    bio: ' ',
                }
            );
            token = jwt.sign(
                _.pick(
                    newUser, ['id', 'profile_url', 'uid', 'photo_url', 'display_name', 'email', 'summary', 'bio']
                ),
                privateKey, {expiresIn: expiresIn});

        }
        return res.send({token: token, isNew: isNew});
    } catch (e) {
        console.log(e);
        return res.status(400).send(e);
    }
});

router.get('/secured', auth, async (req, res) => {
    return res.send('I am secured');
});

module.exports = router;
