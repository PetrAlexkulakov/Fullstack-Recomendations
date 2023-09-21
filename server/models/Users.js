module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        totalLikes: {
            type: DataTypes.INTEGER,
            defaultValue: 0, 
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    });

    Users.associate = (models) => {
        Users.hasMany(models.Posts, {
            foreignKey: "userId", 
        });
    };

    return Users;
};