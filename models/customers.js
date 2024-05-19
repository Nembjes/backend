import db from '../config/database.js';
import { DataTypes, Model } from 'sequelize';
import Users from './users.js'
import Cities from './cities.js'

class Customers extends Model {}
Customers.init(
   {
      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
      },
      name: { type: DataTypes.STRING },
      phone: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING },
      address: { type: DataTypes.STRING },
      city_id: { type: DataTypes.INTEGER },
      user_id: { type: DataTypes.INTEGER },
   },
   {
      sequelize: db,
      tableName: 'customers',
      freezeTableName: true,
      modelName: 'Customers',
      timestamp: true,
   }
);

Customers.belongsTo(Cities, { foreignKey: 'city_id', as: 'cities' });
Cities.hasMany(Customers, { as: 'customers', foreignKey: 'city_id' });
Customers.belongsTo(Users, { foreignKey: 'user_id', as: 'users' });
Users.hasMany(Customers, { as: 'customers', foreignKey: 'user_id' });

export default Customers;
