const Sequelize = require('sequelize');
const UserModel = require('./models/user');
const SkillModel = require('./models/skill');
const EventModel = require('./models/event');
const LinkModel = require('./models/link');
const PartnerModel = require('./models/partner');

const sequelize = new Sequelize('elevent', 'root', 'w2a6c8wvk', {
    host: '35.246.154.124',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const User = UserModel(sequelize, Sequelize);
const Link = LinkModel(sequelize, Sequelize);
const Skill = SkillModel(sequelize, Sequelize);
const Event = EventModel(sequelize, Sequelize);
const Partner = PartnerModel(sequelize, Sequelize);


sequelize.sync({ force: true })
    .then(() => {
        console.log(`Database & tables created!`)
    });


const UserToEvent = sequelize.define('user_event', {});
const StuffToEvent = sequelize.define('stuff_event', {});
const UserToSkill = sequelize.define('skill_user', {});


User.belongsToMany(Skill, { through: UserToSkill, unique: false });
Skill.belongsToMany(User, { through: UserToSkill, unique: false });

User.belongsToMany(Event, { through: UserToEvent, unique: false });
Event.belongsToMany(User, { through: UserToEvent, unique: false });

User.belongsToMany(Event, { through: StuffToEvent, unique: false });
Event.belongsToMany(User, { through: StuffToEvent, unique: false });


module.exports = {
    User, Skill, Link, UserToSkill, Event, Partner, UserToEvent, StuffToEvent
};
