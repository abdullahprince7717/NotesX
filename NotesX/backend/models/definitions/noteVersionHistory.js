// create model schema for note version history

const sequelize = require("../../bin/dbConnection");
const { Model, DataTypes } = require("sequelize");

class NoteVersionHistory extends Model { }

NoteVersionHistory.init(
    {
        note_version_id: {
            primaryKey: true,
            type: DataTypes.STRING(90),
        },
        note_title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        note_description: {
            type: DataTypes.STRING(990),
            allowNull: false,
        },
        note_image: {
            type: DataTypes.STRING(990),
            allowNull: true,
        },
        is_pinned: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        is_archived: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        is_trashed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        reminder: {
            type: DataTypes.STRING(90),
            allowNull: true,
        },
        reminder_status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },

    }, {
    sequelize,
    timestamps: true,
    // paranoid: true,
    modelName: "Note_Version_History",
    tableName: "Note_Version_History"
})

module.exports = NoteVersionHistory;

