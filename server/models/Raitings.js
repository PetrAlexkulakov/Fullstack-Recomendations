module.exports = (sequelize, DataTypes) => {
    const Raitings = sequelize.define("Raitings", {
        count: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    })
    Raitings.associate = (models) => {
        Raitings.belongsTo(models.Users, {
          foreignKey: "userId", 
          as: 'user', 
        });
        Raitings.belongsTo(models.Posts, {
          foreignKey: "postId",
          as: 'post',
        });

    };

    return Raitings
}