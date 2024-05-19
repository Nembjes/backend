import db from '../config/database.js';
import { DataTypes, Model } from 'sequelize';
import Roles from './roles.js'

class Users extends Model {}
Users.init(
   {
      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
      },
      email: { type: DataTypes.STRING },
      username: { type: DataTypes.STRING },
      password: { type: DataTypes.STRING },
      role_id: { type: DataTypes.INTEGER },
      date_reg: { type: DataTypes.DATE },
   },
   {
      sequelize: db,
      tableName: 'users',
      freezeTableName: true,
      modelName: 'Users',
      timestamp: true,
   }
);

Users.belongsTo(Roles, { foreignKey: 'role_id', as: 'roles' });
Roles.hasMany(Users, { as: 'users', foreignKey: 'role_id' });

export default Users;
