module.exports = function(sequelize, DataTypes) {
  var MessageText = sequelize.define("MessageText", {
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 500]
      }
    },
    newMessageTrue: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    taskrName: {
      type: DataTypes.STRING
    },
    taskrId: {
      type: DataTypes.INTEGER
    },
    taskeeName: {
      type: DataTypes.STRING
    },
    taskeeId: {
      type: DataTypes.INTEGER
    }
  });

  MessageText.associate = function(models) {
    // A Task must belong to a Taskr; a Task can't be created without a Taskr due to the foreign key constraint
    MessageText.belongsTo(models.Message, {
      foreignKey: {
        allowNull: false
      }
    });
  };


  return MessageText;
};
