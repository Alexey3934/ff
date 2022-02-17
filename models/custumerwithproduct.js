'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CustumerWithProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Custumer, {foreignKey: 'CustumerName'});
      this.belongsTo(models.Product, {foreignKey: 'ProductName'});
      // define association here
    }
  };
  CustumerWithProduct.init({
    id:             {type: DataTypes.INTEGER, primaryKey: true},
    
    last_point_place: {type: DataTypes.STRING, allowNull: false},
    number_of_view:   {type: DataTypes.STRING, allowNull: false},
    courier:           {type: DataTypes.STRING, allowNull: false},
    departureDate:  {type: DataTypes.STRING, allowNull: false},
    timeOfDelivery: {type: DataTypes.STRING, allowNull: false},
    trackNumber:    {type: DataTypes.STRING, allowNull: false},
    quantity:      {type: DataTypes.STRING, allowNull: false},
    size:          {type: DataTypes.STRING, allowNull: false},
    state:         {type: DataTypes.STRING, allowNull: false},

    // generatedLink: DataTypes.STRING,
    ProductName :  {type: DataTypes.STRING, allowNull: false},
    CustumerName : {type: DataTypes.STRING, allowNull: false},
    string_to_url: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'CustumerWithProduct',
  });
  return CustumerWithProduct;
};










