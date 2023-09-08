module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        smallText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fullText: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        imageURL: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        group: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tags: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userId: {
            type: DataTypes.INTEGER, 
            allowNull: true,
        },
    })

    Posts.associate = (models) => {
        Posts.belongsTo(models.Users, {
            foreignKey: "userId", // Внешний ключ в таблице Posts, связанный с таблицей Users
            as: 'author', // Указываем алиас для связи
        });
        // Определение связи "многие-ко-многим" между постами и тегами
        Posts.belongsToMany(models.Tags, {
            through: "PostTags", // Промежуточная таблица для хранения связей
            foreignKey: "postId", // Внешний ключ в таблице PostTags, связывающий с таблицей Posts
            as: 'Tags',
        });
    };

    return Posts
}