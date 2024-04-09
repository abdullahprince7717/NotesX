const sequelize = require("../../bin/dbConnection");
const { Model, DataTypes } = require("sequelize");

class NoteCollaborator extends Model { }

NoteCollaborator.init(
    {
        note_collaborator_id: {
            primaryKey: true,
            type: DataTypes.STRING(255),
        },

    }, {
    sequelize,
    timestamps: true,
    // paranoid: true,
    modelName: "Note_Collaborator",
    tableName: "Note_Collaborators" // Optional: specify the table name if you want it to be different from the default
});

module.exports = NoteCollaborator;