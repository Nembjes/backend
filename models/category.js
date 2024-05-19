import db from '../config/database.js';
import { DataTypes, Model } from 'sequelize';

class Category extends Model {}
Category.init(
   {
      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
      },
      name: { type: DataTypes.STRING },
      description: { type: DataTypes.STRING },
   },
   {
      sequelize: db,
      tableName: 'category',
      freezeTableName: true,
      modelName: 'Category',
      timestamp: true,
   }
);

export default Category;
