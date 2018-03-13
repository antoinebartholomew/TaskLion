module.exports = function(sequelize, DataTypes) {
  var Postings = sequelize.define("Postings", {
    // Giving the Author model a name of type STRING
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
        len: [1]
      }
    },
    dayofWeek: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    taskrAccept: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    requesterAccept: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    taskrMarkComplete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    requesterMarkComplete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },        
  });

 Postings.associate = function(models) {
    // Associating postings with with Taskrs
    // A Postings can't be created without an Tasker due to the foreign key constraint
    Postings.belongsTo(models.Taskr, {
      foreignKey:{
        allowNull: false
      }
    });
  };

  return Postings;
};
