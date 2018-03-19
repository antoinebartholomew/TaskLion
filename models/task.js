module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define("Task", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3]
      }
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 250]
      }
    },
    dayofWeek: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    taskrName: {
      type: DataTypes.STRING
    },
    taskrAccept: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    requesterAccept: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    taskrMarkComplete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    requesterMarkComplete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    taskeeId: {
      type: DataTypes.INTEGER
    },
    taskeeName: {
      type: DataTypes.STRING
    },
    taskPaid: {
      type: DataTypes.BOOLEAN
    },
    taskComment: {
      type: DataTypes.TEXT,
      validate: {
        len: [1, 250]
      }
    },
    taskCommentTrue: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      validate: {
        len: [1, 250]
      }
    }
  });

 Task.associate = function(models) {
   // A Task must belong to a Taskr; a Task can't be created without a Taskr due to the foreign key constraint
    Task.belongsTo(models.Taskr, {
      foreignKey:{
        allowNull: false
      }
    });
  };

  return Task;
};
