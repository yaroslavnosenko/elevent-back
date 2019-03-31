const _ = require('lodash');
const express = require('express');


const auth = require('../../middleware/auth/auth');

const {User} = require('../../database/sequelize');
const {Event} = require('../../database/sequelize');
const {UserToEvent} = require('../../database/sequelize');
const {StuffToEvent} = require('../../database/sequelize');


const router = express.Router();

router.get('/:id', async (req, res) => {
    if (req.params.id) {
        const event = await Event.findOne({where: {id: req.params.id}});
        if (event) {
            return res.send(event);
        } else {
            return res.status(404).send({error: 'No event with specified id found'})
        }
    } else {
        return res.status(400).send({error: 'Specify id'});
    }
});

router.get('/find/:hash', auth, async (req, res) => {
    if (req.params.hash) {
        const event = await Event.findOne({where: {hash: req.params.hash}});
        if (event) {
            return res.send(event);
        } else {
            return res.status(404).send({error: 'No event with such hash'});
        }
    } else {
        return res.status(400).send({error: 'Specify hash'});
    }
});

router.post('', auth, async (req, res) => {
    try {
        const event = await Event.create(
            _.pick(req.body, ['name', 'img_url', 'city', 'address', 'start_date', 'end_date', 'description', 'site', 'hash'])
        );
        return res.send({event_id: event.id});
    } catch (e) {
        console.log(e);
        return res.status(400).send(e)
    }
});

router.post('/user', auth, async (req, res) => {
    if (req.body.user_id && req.body.event_id) {
        const user = await User.findOne({where: {id: req.body.user_id}});
        const event = await Event.findOne({where: {id: req.body.event_id}});
        if (user && event) {
            try {
                await UserToEvent.findOrCreate({
                    where: {userId: user.id, eventId: event.id}
                });
                return res.send({created: true});
            } catch (e) {
                console.log(e);
            }
        } else {
            return res.status(404).send({error: 'Cannot find user or event'})
        }
    } else {
        return res.status(400).send({error: 'Specify user and event id'});
    }
});

router.get('/users/:id', async (req, res) => {
    if (req.params.id) {
        const usersToEvent = await UserToEvent.findAll(
            {
                where: {eventId: req.params.id}
            });
        const user_ids = [];
        usersToEvent.forEach(ue => user_ids.push(ue.userId));
        console.log(user_ids);
        const users = await User.findAll({
            where: {id: user_ids}
        });
        return res.send(users);
    } else {
        return res.status(400).send({error: 'Specify event id'})
    }
});

router.post('/stuff', auth, async (req, res) => {
    if (req.body.user_id && req.body.event_id) {
        const user = await User.findOne({where: {id: req.body.user_id}});
        const event = await Event.findOne({where: {id: req.body.event_id}});
        if (user && event) {
            try {
                await StuffToEvent.findOrCreate({
                    where: {userId: user.id, eventId: event.id}
                });
                return res.send({created: true});
            } catch (e) {
                console.log(e);
            }
        } else {
            return res.status(404).send({error: 'Cannot find user or event'})
        }
    } else {
        return res.status(400).send({error: 'Specify user and event id'});
    }
});

router.get('/stuff/:id', async (req, res) => {
    if (req.params.id) {
        const usersToEvent = await StuffToEvent.findAll(
            {
                where: {eventId: req.params.id}
            });
        const user_ids = [];
        usersToEvent.forEach(ue => user_ids.push(ue.userId));
        console.log(user_ids);
        const users = await User.findAll({
            where: {id: user_ids}
        });
        return res.send(users);
    } else {
        return res.status(400).send({error: 'Specify event id'})
    }
});

module.exports = router;
