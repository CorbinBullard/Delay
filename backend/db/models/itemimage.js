'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ItemImage.belongsTo(models.Item, { foreignKey: 'itemId', onDelete: 'CASCADE' })
    }
  }
  ItemImage.init({
    itemId: {
      type: DataTypes.INTEGER,
      references: { model: 'Image' },
      allowNull: false,
      onDelete: 'CASCADE'
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'ItemImage',
  });
  return ItemImage;
};
