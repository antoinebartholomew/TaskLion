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
    secQuestionOne: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [1]
        }
    },
    secQuestionOneAnswer: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
             len: [1]
        }
    },
    secQuestionTwo: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [1]
        }
    },
    secQuestionTwoAnswer: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
             len: [1]
        }
    },
    secQuestionThree: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [1]
        }
    },
    secQuestionThreeAnswer: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [1]
        }
    },
    loggedIn: { 
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        
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
