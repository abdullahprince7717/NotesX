const sequelize = require("../../bin/dbConnection");
const { Model, DataTypes } = require("sequelize");

class Tags extends Model { } // Users class will be treated as a model(table) now after extending Model class.

Tags.init(
    {
        tag_id: {
            primaryKey: true,
            type: DataTypes.STRING(90),
        },
        tag_name: {
            type: DataTypes.STRING(34),
            allowNull: false,
        }
    }, {
    sequelize,
    timestamps: true,
    // paranoid: true,
    modelName: "Tags",
})

module.exports = Tags;