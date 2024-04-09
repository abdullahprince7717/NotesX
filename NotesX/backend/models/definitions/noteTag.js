const sequelize = require("../../bin/dbConnection");
const { Model, DataTypes } = require("sequelize");

class NoteTag extends Model { }

NoteTag.init(
    {
        note_tag_id: {
            primaryKey: true,
            type: DataTypes.STRING(255),
        },
    }, {
    sequelize,
    timestamps: true,
    // paranoid: true,
    modelName: "Note_Tag",
    tableName: "Note_Tags" // Optional: specify the table name if you want it to be different from the default
});

module.exports = NoteTag;