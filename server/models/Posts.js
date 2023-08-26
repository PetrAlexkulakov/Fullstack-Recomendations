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
            allowNull: false,
        },
        group: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tags: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    })

    Posts.associate = (models) => {
        // Определение связи "многие-ко-многим" между постами и тегами
        Posts.belongsToMany(models.Tags, {
            through: "PostTags", // Промежуточная таблица для хранения связей
            foreignKey: "postId", // Внешний ключ в таблице PostTags, связывающий с таблицей Posts
        });
    };

    return Posts
}