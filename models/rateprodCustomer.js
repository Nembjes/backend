import db from '../config/database.js';
import { DataTypes, Model } from 'sequelize';
import Products from './products.js';
import Users from './users.js';
import Rate from './rate.js';

class RateprodCustomer extends Model {}
RateprodCustomer.init(
   {
      rate_id: { type: DataTypes.INTEGER },
      user_id: { type: DataTypes.INTEGER },
      prod_code: { type: DataTypes.INTEGER },
   },
   {
      sequelize: db,
      tableName: 'rateprod_customer',
      freezeTableName: true,
      modelName: 'RateprodCustomer',
      timestamp: true,
      unique: {
         fields: ['rate_id', 'user_id', 'prod_code'],
      },
   }
);

RateprodCustomer.belongsTo(Products, {
   foreignKey: 'prod_code',
   as: 'products',
});
Products.belongsToMany(Rate, {
   through: RateprodCustomer,
   foreignKey: 'prod_code',
   as: 'rates',
});

RateprodCustomer.belongsTo(Users, { foreignKey: 'user_id', as: 'users' });
Users.belongsToMany(Rate, {
   through: RateprodCustomer,
   foreignKey: 'user_id',
   as: 'rates',
});

RateprodCustomer.belongsTo(Rate, { foreignKey: 'rate_id', as: 'rate' });
Rate.belongsToMany(Users, {
   through: RateprodCustomer,
   foreignKey: 'rate_id',
   as: 'users',
});
Rate.belongsToMany(Products, {
   through: RateprodCustomer,
   foreignKey: 'rate_id',
   as: 'products',
});

export default RateprodCustomer;
