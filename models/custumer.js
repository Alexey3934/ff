'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Custumer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      this.belongsToMany(models.Product, {
        through: models.CustumerWithProduct,
      })
      // define association here
    }
  };
  Custumer.init({
    id:   {type: DataTypes.INTEGER, primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
    country : {type: DataTypes.STRING, allowNull: false},
    city_square_index : {type: DataTypes.STRING, allowNull: false}

  }, {
    sequelize,
    modelName: 'Custumer',
  });
  return Custumer;
};










