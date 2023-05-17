'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsTo(models.User, { foreignKey: 'ownerId' });

      Item.hasMany(models.ProductReview, { foreignKey: 'itemId', onDelete: 'CASCADE' });

      Item.hasMany(models.ItemImage, { foreignKey: 'itemId', onDelete: 'CASCADE' });
    }
  }
  Item.init({
    ownerId: {
      type: DataTypes.INTEGER,
      references: { model: 'User' }
    },
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    description: DataTypes.STRING,
    instrumentType: DataTypes.ENUM(['guitar', 'bass', 'drum', 'keyboard', 'other']),
    year: DataTypes.INTEGER,
    condition: DataTypes.ENUM(['new', 'excellent', 'good', 'poor']),
    sold: DataTypes.BOOLEAN,
    previewImage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};
