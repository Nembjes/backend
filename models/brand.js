import db from '../config/database.js';
import { DataTypes, Model } from 'sequelize';

class Brand extends Model {}
Brand.init(
   {
      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
      },
      name: { type: DataTypes.STRING },
   },
   {
      sequelize: db,
      tableName: 'brand',
      freezeTableName: true,
      modelName: 'Brand',
      timestamp: true,
   }
);

export default Brand;
