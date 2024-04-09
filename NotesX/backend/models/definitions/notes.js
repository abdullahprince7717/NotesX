const sequelize = require("../../bin/dbConnection");
const { Model, DataTypes } = require("sequelize");

class Notes extends Model { } // Users class will be treated as a model(table) now after extending Model class.

Notes.init(
    {
        note_id: {
            primaryKey: true,
            type: DataTypes.STRING(90),
        },
        note_title: {
            type: DataTypes.STRING(34),
            allowNull: false,
        },
        note_description: {
            type: DataTypes.STRING(90),
            allowNull: false,
        },
        note_image: {
            type: DataTypes.STRING(990),
            allowNull: true,
        },
    }, {
    sequelize,
    timestamps: true,
    // paranoid: true,
    modelName: "Notes",
})

module.exports = Notes;