const sequelize = require("../../bin/dbConnection");
const { Model, DataTypes } = require("sequelize");

class Notifications extends Model { } // Users class will be treated as a model(table) now after extending Model class.

Notifications.init(
    {
        notification_id: {
            primaryKey: true,
            type: DataTypes.STRING(90),
        },
        type: {
            type: DataTypes.STRING(90),
            allowNull: true,
        },
        content: {
            type: DataTypes.STRING(990),
            allowNull: true,
        },
        is_seen: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },

    }, {
    sequelize,
    timestamps: true,
    // paranoid: true,
    modelName: "Notifications",
})

module.exports = Notifications;