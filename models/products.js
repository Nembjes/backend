import db from '../config/database.js';
import { DataTypes, Model } from 'sequelize';
import Brand from './brand.js';
import Category from './category.js';

class Products extends Model {}
Products.init(
   {
      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
      },
      name: { type: DataTypes.STRING },
      brand_id: { type: DataTypes.INTEGER },
      category_id: { type: DataTypes.INTEGER },
      description: { type: DataTypes.STRING },
      cost: { type: DataTypes.FLOAT },
      mainImage: { type: DataTypes.STRING },
   },
   {
      sequelize: db,
      tableName: 'products',
      freezeTableName: true,
      modelName: 'Products',
      timestamps: true,
   }
);

Products.belongsTo(Brand, { foreignKey: 'brand_id', as: 'brand' });
Brand.hasMany(Products, { as: 'products', foreignKey: 'brand_id' });
Products.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
Category.hasMany(Products, { as: 'products', foreignKey: 'category_id' });

export default Products;
