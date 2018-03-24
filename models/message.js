module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define("Message", {
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
    },
  });


 Message.associate = function(models) {
   // A Task must belong to a Taskr; a Task can't be created without a Taskr due to the foreign key constraint
    Message.belongsTo(models.Task, {
      foreignKey:{
        allowNull: false
      }
    });
 };
   Message.associate = function(models) {
   // A Task must belong to a Taskr; a Task can't be created without a Taskr due to the foreign key constraint
    Message.hasMany(models.MessageText, {
      onDelete: "cascade"
    });
  };

  return Message;
};



                     