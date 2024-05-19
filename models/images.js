import db from '../config/database.js';
import { DataTypes, Model } from 'sequelize';
import Products from './products.js'

class Images extends Model {}
Images.init(
   {
      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
      },
      link: { type: DataTypes.STRING },
      prod_id: { type: DataTypes.INTEGER },
   },
   {
      sequelize: db,
      tableName: 'images',
      freezeTableName: true,
      modelName: 'Images',
      timestamp: true,
   }
);

Images.belongsTo(Products, { foreignKey: 'prod_id', as: 'products' });
Products.hasMany(Images, { as: 'images', foreignKey: 'prod_id' });

export default Images;
