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
        likesCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        raiting: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
        }
    })

    Posts.associate = (models) => {
        Posts.belongsTo(models.Users, {
            foreignKey: "userId", 
            as: 'author', 
        });

        Posts.belongsToMany(models.Tags, {
            through: "PostTags", 
            foreignKey: "postId", 
            as: 'Tags',
        });

        Posts.hasMany(models.Likes, {
            foreignKey: "postId",
            as: 'likes', 
        });
        Posts.hasMany(models.Raitings, {
            foreignKey: "postId", 
            as: 'raitings',
        });

        // Добавляем связь с комментариями
        Posts.hasMany(models.Comments, {
            foreignKey: "postId",
            as: "comments",
        });
    };

    return Posts
}