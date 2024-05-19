import db from '../config/database.js';
import { DataTypes, Model } from 'sequelize';
import Customers from './customers.js'
import Status from './status.js'

class Orders extends Model {}
Orders.init(
   {
      orderNum: {
         type: DataTypes.INTEGER,
         primaryKey: true,
      },
      customer_id: { type: DataTypes.INTEGER },
      date: { type: DataTypes.DATE },
      status_id: { type: DataTypes.INTEGER },
   },
   {
      sequelize: db,
      tableName: 'orders',
      freezeTableName: true,
      modelName: 'Orders',
      timestamp: true,
   }
);

Orders.belongsTo(Customers, { foreignKey: 'customer_id', as: 'customers' });
Customers.hasMany(Orders, { as: 'orders', foreignKey: 'customer_id' });
Orders.belongsTo(Status, { foreignKey: 'status_id', as: 'status' });
Status.hasMany(Orders, { as: 'orders', foreignKey: 'status_id' });

export default Orders;
