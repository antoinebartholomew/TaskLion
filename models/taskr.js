module.exports = function(sequelize, DataTypes) {
  var Taskr = sequelize.define("Taskr", {
    // Giving the Author model a name of type STRING
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
    // Associating taskrs with posted tasks
    // When an taskr is deleted, also delete any associated tasks
    Taskr.hasMany(models.Postings, {
      onDelete: "cascade"
    });
  };

  return Taskr;
};
