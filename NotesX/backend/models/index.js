const sequelize = require("../bin/dbConnection");
const Users = require("./definitions/users");
const Notes = require("./definitions/notes");
const Tags = require("./definitions/tags");
const Note_Tag = require("./definitions/noteTag");
const Note_Collaborator = require("./definitions/noteCollaborator");
const Session = require("./definitions/session");
const Notifications = require("./definitions/notifications");

const models = { Users, Notes, Tags, Note_Tag, Note_Collaborator, Session, Notifications };

//Users-Notes 1:M

Users.hasMany(Notes, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Notes.belongsTo(Users, { foreignKey: 'user_id', onDelete: 'CASCADE' });


//User-Tag 1:M

Users.hasMany(Tags, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Tags.belongsTo(Users, { foreignKey: 'user_id', onDelete: 'CASCADE' });


//Note-Tag-Notes 1:M && Note-Tag-Tags 1:M (Notes-Note-Tag-Tags  M:M)

Notes.hasMany(Note_Tag, { foreignKey: 'note_id', onDelete: 'CASCADE' });
Note_Tag.belongsTo(Notes, { foreignKey: 'note_id', onDelete: 'CASCADE' });

Tags.hasMany(Note_Tag, { foreignKey: 'tag_id', onDelete: 'CASCADE' });
Note_Tag.belongsTo(Tags, { foreignKey: 'tag_id', onDelete: 'CASCADE' });


//USER-SESSION 1:1

Users.hasOne(Session, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Session.belongsTo(Users, { foreignKey: 'user_id', onDelete: 'CASCADE' });


// USER-NOTE_COLLABORATOR 1:M && NOTE-NOTE_COLLABORATOR 1:M 

Users.hasMany(Note_Collaborator, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Note_Collaborator.belongsTo(Users, { foreignKey: 'user_id', onDelete: 'CASCADE' });

Notes.hasMany(Note_Collaborator, { foreignKey: 'note_id', onDelete: 'CASCADE' });
Note_Collaborator.belongsTo(Notes, { foreignKey: 'note_id', onDelete: 'CASCADE' });


// USER-NOTIFICATIONS 1:M 

Users.hasMany(Notifications, { foreignKey: 'sender_id', onDelete: 'CASCADE' });
Notifications.belongsTo(Users, { foreignKey: 'sender_id', onDelete: 'CASCADE' });

Users.hasMany(Notifications, { foreignKey: 'reciever_id', onDelete: 'CASCADE' });
Notifications.belongsTo(Users, { foreignKey: 'reciever_id', onDelete: 'CASCADE' });


// NOTE - NOTIFICATIONS 1: M

Notes.hasMany(Notifications, { foreignKey: 'note_id', onDelete: 'CASCADE' });
Notifications.belongsTo(Notes, { foreignKey: 'note_id', onDelete: 'CASCADE' });



// Define cascading delete hooks for all models

// // Users-Notes
// Users.addHook('beforeDestroy', async (instance, options) => {
//     console.log(instance);
//     await Notes.destroy({ where: { user_id: instance.id }, ...options });
// });

// // User-Tag
// Users.addHook('beforeDestroy', async (instance, options) => {
//     await Tags.destroy({ where: { user_id: instance.id }, ...options });
// });

// // Note-Tag
// Notes.addHook('beforeDestroy', async (instance, options) => {
//     await Note_Tag.destroy({ where: { note_id: instance.id }, ...options, force: false });
// });

// // USER-SESSION
// Users.addHook('beforeDestroy', async (instance, options) => {
//     await Session.destroy({ where: { user_id: instance.id }, ...options, force: false });
// });

// // USER-NOTE_COLLABORATOR
// Users.addHook('beforeDestroy', async (instance, options) => {
//     await Note_Collaborator.destroy({ where: { user_id: instance.id }, ...options, force: false });
// });

// // NOTE-NOTE_COLLABORATOR
// Notes.addHook('beforeDestroy', async (instance, options) => {
//     await Note_Collaborator.destroy({ where: { note_id: instance.id }, ...options, force: false });
// });


const db = {};

db.sequelize = sequelize;

module.exports = { models, db }; 