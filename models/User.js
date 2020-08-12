const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// User model
class User extends Model{}

// define table and configure
User.init(
    {
        // define ID column
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        // define username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },

        // define email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },

        // define password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4] //password must be at least 4 char long
            }
        }

    },
    {
        sequelize,
        timestamps: false, // dont auto-create timestamp field
        freezeTableName: true, // non-pluralized
        underscored: true, //words_like_this
        modelName: 'user' // modal name stays lowecase
    }
);

module.exports = User;