const _ = require('lodash');
const express = require('express');


const auth = require('../../middleware/auth/auth');
const {User, Skill, UserToSkill} = require('../../database/sequelize');


const router = express.Router();

router.get('/user/:id', auth, async (req, res) => {
    if (req.params.id) {
        const uts = await UserToSkill.findAll({where: {userId: req.params.id}});
        const skillIds = [];
        uts.forEach(
            s => {
                skillIds.push(s.dataValues.userId);
            }
        );
        const skills = await Skill.findAll({where: {id: skillIds}});
        return res.send(skills);
    } else {
        return res.status(400).send();
    }
});

router.post('', auth, async (req, res) => {
    if (req.body.name) {
        const existingSkill = await Skill.findOne({where: {name: req.body.name}});
        if (existingSkill) {
            return res.send({created: false});
        }
        else {
            const newSkill = await Skill.create({name: req.body.name});
            return res.send({created: true});
        }
    } else {
        return res.status(400).send({error: 'Specify'});
    }
});

router.post('/user', auth, async (req, res) => {
    if (req.body.user_id && req.body.skill) {
        const user = await User.findOne({where: {id: req.body.user_id}});
        const skill = await Skill.findOrCreate({where: {name: req.body.skill}});

        await UserToSkill.findOrCreate({where: {userId: user.id, skillId: skill[0].id}});

        return res.send({
            user: user,
            skill: skill
        });
    } else {
        return res.status(400).send({error: 'Specify user and skill id'});
    }
});


module.exports = router;
