module.exports = (sequelize, DataTypes) => {
    const Likes = sequelize.define("Likes", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    Likes.associate = (models) => {
        Likes.belongsTo(models.Users, {
          foreignKey: "userId", 
          as: 'user', 
        });
        Likes.belongsTo(models.Posts, {
          foreignKey: "postId", 
          as: 'post', 
        });
    };

    return Likes;
};