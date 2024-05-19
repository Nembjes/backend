import db from '../config/database.js';
import { DataTypes, Model } from 'sequelize';

class Cities extends Model {}
Cities.init(
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
      tableName: 'cities',
      freezeTableName: true,
      modelName: 'Cities',
      timestamp: true,
   }
);

export default Cities;
