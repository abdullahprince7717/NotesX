const sequelize = require("../bin/dbConnection");
const Users = require("./definitions/users");
const Notes = require("./definitions/notes");
const Tags = require("./definitions/tags");
const Note_Tag = require("./definitions/noteTag");
const Note_Collaborator = require("./definitions/noteCollaborator");
const Session = require("./definitions/session");
const Notifications = require("./definitions/notifications");
const Note_Version_History = require("./definitions/noteVersionHistory");

const models = { Users, Notes, Tags, Note_Tag, Note_Collaborator, Session, Notifications, Note_Version_History };

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

// NOTE - NOTE_VERSION_HISTORY 1: M

Notes.hasMany(Note_Version_History, { foreignKey: 'note_id', onDelete: 'CASCADE' });
Note_Version_History.belongsTo(Notes, { foreignKey: 'note_id', onDelete: 'CASCADE' });


const db = {};

db.sequelize = sequelize;

module.exports = { models, db }; 