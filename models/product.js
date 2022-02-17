'use strict';
const { STRING } = require('sequelize');
const {Model} = require('sequelize');





module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    static associate(models) {

      // define association here
      this.belongsToMany(models.Custumer, {
        through: models.CustumerWithProduct,
      });
      
    }
  };
  Product.init({

    id:           {type: DataTypes.INTEGER, primaryKey: true},
    name:         {type: DataTypes.STRING,  allowNull: false},
    link:         {type: DataTypes.STRING,  allowNull: false},
    dataFromLink: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};


//allowNull: false
// type: DataTypes.STRING,


// autoIncrement: true,
// primaryKey: true