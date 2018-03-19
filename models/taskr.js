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
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    secQuestion1: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    secQuestionAnswer1: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    secQuestion2: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    secQuestionAnswer2: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    secQuestion3: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    secQuestionAnswer3: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    taskrPhoto: {
      type: DataTypes.STRING,
    },
    loggedIn: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
