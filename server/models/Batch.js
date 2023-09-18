module.exports = (sequelize, DataTypes) => {
  const Batch = sequelize.define(
    "Batch",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      start_period: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      end_period: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      underscore: true,
    }
  );

  return Batch;
};
