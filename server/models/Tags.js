module.exports = (sequelize, DataTypes) => {
    const Tags = sequelize.define("Tags", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Tags.associate = (models) => {
        // Определение связи "многие-ко-многим" между тегами и постами
        Tags.belongsToMany(models.Posts, {
            through: "PostTags", // Промежуточная таблица для хранения связей
            foreignKey: "tagId", // Внешний ключ в таблице PostTags, связывающий с таблицей Tags
        });
    };

    return Tags;
};
