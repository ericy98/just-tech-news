const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

// Define POST model
class Post extends Model {}

// fields/columns for POST model
Post.init(
    {
        // define as primary key
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // define as string value
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // verify link as string
        post_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isURL: true
            }
        },
        // foreign key, matching link
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        // configure metadata
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;