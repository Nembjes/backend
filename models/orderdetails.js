import db from '../config/database.js';
import { DataTypes, Model } from 'sequelize';
import Products from './products.js';
import Orders from './orders.js';

class Orderdetails extends Model {}
Orderdetails.init(
   {
      orderNum: {
         type: DataTypes.STRING,
         primaryKey: true,
      },
      prod_code: {
         type: DataTypes.INTEGER,
         primaryKey: true,
      },
      productQuantity: {
         type: DataTypes.STRING,
      },
   },
   {
      sequelize: db,
      tableName: 'orderdetails',
      freezeTableName: true,
      modelName: 'Orderdetails',
      timestamps: true,
   }
);

Orderdetails.belongsTo(Products, { foreignKey: 'prod_code', as: 'products' });
Products.hasMany(Orderdetails, { as: 'orderdetails', foreignKey: 'prod_code' });
Orderdetails.belongsTo(Orders, { foreignKey: 'orderNum', as: 'orders' });
Orders.hasMany(Orderdetails, { as: 'orderdetails', foreignKey: 'orderNum' });

export default Orderdetails;
