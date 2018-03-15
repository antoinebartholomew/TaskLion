module.exports = function(sequelize, DataTypes) {
  var Taskr = sequelize.define("Taskr", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3]
        }
    },
    password: {
        type:DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
    },
    secQestOne: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [1]
        }
    },
    secQestOneAnswer: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
             len: [1]
        }
    },
    secQestTwo: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [1]
        }
    },
    secQestTwoAnswer: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
             len: [1]
        }
    }
  });

 Taskr.associate = function(models) {
   // A Task must belong to a Taskr; a Task can't be created without a Taskr due to the foreign key constraint
    Taskr.hasMany(models.Task, {
      onDelete: "cascade"
    });
  };

  return Taskr;
};
