'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductReview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductReview.belongsTo(models.User, { foreignKey: 'userId' })

      ProductReview.belongsTo(models.Item, { foreignKey: 'itemId', onDelete: 'CASCADE' })

    }
  }
  ProductReview.init({
    userId: {
      type: DataTypes.INTEGER,
      references: { model: 'User' }
    },
    itemId: {
      type: DataTypes.INTEGER,
      references: { model: 'Item' },
      onDelete: 'CASCADE'
    },
    stars: DataTypes.INTEGER,
    review: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductReview',
  });
  return ProductReview;
};
