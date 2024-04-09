const sequelize = require("../../bin/dbConnection");
const { Model, DataTypes } = require("sequelize");

class Session extends Model { }
Session.init(
    {
        session_id: {
            primaryKey: true,
            type: DataTypes.STRING(90),
        },
        token: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        },
    }, {
    sequelize,
    timestamps: true,
    modelName: "Session",
})

module.exports = Session;