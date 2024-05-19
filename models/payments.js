import db from '../config/database.js';
import { DataTypes, Model } from 'sequelize';
import Customers from './customers.js'

class Payments extends Model {}
Payments.init(
   {
      customer_id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
      },
      checkNum: { type: DataTypes.STRING,
         primaryKey: true, },
      payment: { type: DataTypes.DATE },
      amount: { type: DataTypes.FLOAT },
   },
   {
      sequelize: db,
      tableName: 'payments',
      freezeTableName: true,
      modelName: 'Payments',
      timestamp: true,
   }
);

Payments.belongsTo(Customers, { foreignKey: 'customer_id', as: 'customers' });
Customers.hasMany(Payments, { as: 'payments', foreignKey: 'customer_id' });

export default Payments;
