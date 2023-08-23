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
            type: DataTypes.STRING,
            allowNull: false,
        },
        imageURL: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
    return Posts
}