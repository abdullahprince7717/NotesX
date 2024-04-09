const sequelize = require("../../bin/dbConnection");
const { Model, DataTypes } = require("sequelize");

class Users extends Model { } // Users class will be treated as a model(table) now after extending Model class.

Users.init(
    {
        user_id: {
            primaryKey: true,
            type: DataTypes.STRING(90),
        },
        first_name: {
            type: DataTypes.STRING(34),
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING(90),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(990),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        email_verified_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        otp: {
            type: DataTypes.STRING(6),
            allowNull: true,
        },
        otp_expiry: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },

    }, {
    sequelize,
    timestamps: true,
    // paranoid: true,
    modelName: "Users",
})

module.exports = Users;