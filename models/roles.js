import db from '../config/database.js';
import { DataTypes, Model } from 'sequelize';

class Roles extends Model {}
Roles.init(
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
      tableName: 'roles',
      freezeTableName: true,
      modelName: 'Roles',
      timestamp: true,
   }
);

export default Roles;
