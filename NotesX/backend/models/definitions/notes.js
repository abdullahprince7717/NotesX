const sequelize = require("../../bin/dbConnection");
const { Model, DataTypes } = require("sequelize");

class Notes extends Model { } // Users class will be treated as a model(table) now after extending Model class.

Notes.init(
    {
        note_id: {
            primaryKey: true,
            type: DataTypes.STRING(255),
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
        is_trashed: { // is_trashed is for checking if note is trashed or not and is used for soft delete
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        reminder: { // reminder is for setting reminder date for notes
            type: DataTypes.STRING(90),
            allowNull: true,
        },
        reminder_status: { // reminder_status is for checking if reminder is set or not
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },

    }, {
    sequelize,
    timestamps: true,
    // paranoid: true,
    modelName: "Notes",
})

module.exports = Notes;