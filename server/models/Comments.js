module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define("Comments", {
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Comments.associate = (models) => {
    Comments.belongsTo(models.Posts, {
      foreignKey: "postId",
      as: "post",
    });

    Comments.belongsTo(models.Users, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return Comments;
};
