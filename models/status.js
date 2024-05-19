import db from '../config/database.js';
import { DataTypes, Model } from 'sequelize';

class Status extends Model {}
Status.init(
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
      tableName: 'status',
      freezeTableName: true,
      modelName: 'Status',
      timestamp: true,
   }
);

export default Status;
