import db from '../config/database.js';
import { DataTypes, Model } from 'sequelize';

class Rate extends Model {}
Rate.init(
   {
      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
      },
      value: { type: DataTypes.STRING },
   },
   {
      sequelize: db,
      tableName: 'rate',
      freezeTableName: true,
      modelName: 'Rate',
      timestamp: true,
   }
);

export default Rate;
