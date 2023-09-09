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
          foreignKey: "userId", // Внешний ключ в таблице Likes, связанный с таблицей Users
          as: 'user', // Указываем алиас для связи
        });
        Likes.belongsTo(models.Posts, {
          foreignKey: "postId", // Внешний ключ в таблице Likes, связанный с таблицей Posts
          as: 'post', // Указываем алиас для связи
        });
    };

    return Likes;
};