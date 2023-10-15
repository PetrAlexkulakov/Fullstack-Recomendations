module.exports = (sequelize, DataTypes) => {
    const PostTags = sequelize.define("PostTags", {
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tagId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    PostTags.associate = (models) => {
        PostTags.belongsTo(models.Posts, { foreignKey: 'postId' });
        PostTags.belongsTo(models.Tags, { foreignKey: 'tagId' });
    };

    return PostTags;
};
