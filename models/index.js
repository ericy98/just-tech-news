const User = require('./User');
const Post = require('./Post');

// link id from user to user_id in post model
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// constraint: post belongs to 1 user
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { User, Post };