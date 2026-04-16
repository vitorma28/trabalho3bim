const models = '../models/';
const { DataTypes } = require('sequelize');

const Profile = require(models + 'Profile.js');
const User = require(models + 'User.js');
const Post = require(models + 'Post.js');
const Comment = require(models + 'Comment.js');


module.exports = {
    config: () => {
        // Configurando relacionamentos

        // --- Configurando relacionamentos ---

        // 1 User - N Profiles
        // Nota: Como User.id é STRING, a foreignKey 'userId' em Profile será STRING.
        User.hasMany(Profile, { 
            foreignKey: {
                name: 'userId',
                type: DataTypes.STRING, // Deve coincidir com User.id
                allowNull: false
            },
            as: 'profiles' 
        });
        Profile.belongsTo(User, { foreignKey: 'userId', as: 'user' });

        // 1 Profile - N Posts
        // Nota: Profile.id é INTEGER, então a foreignKey 'profileId' será INTEGER.
        Profile.hasMany(Post, { 
            foreignKey: {
                name: 'profileId',
                type: DataTypes.INTEGER,
                allowNull: false
            },
            as: 'posts' 
        });
        Post.belongsTo(Profile, { foreignKey: 'profileId', as: 'profile' });

        // 1 Post - N Comments
        // Nota: Post.id é INTEGER, então a foreignKey 'postId' será INTEGER.
        Post.hasMany(Comment, { 
            foreignKey: {
                name: 'postId',
                type: DataTypes.INTEGER,
                allowNull: false
            },
            as: 'comments' 
        });
        Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
    }
}
