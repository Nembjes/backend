import db from '../config/database.js';
import { DataTypes, Model } from 'sequelize';
import Products from './products.js'
import Users from './users.js'

class Comments extends Model {}
Comments.init(
   {
      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
      },
      user_id: { type: DataTypes.INTEGER },
      prod_code: { type: DataTypes.INTEGER },
      com_text: { type: DataTypes.STRING },
      date: { type: DataTypes.DATE },
   },
   {
      sequelize: db,
      tableName: 'comments',
      freezeTableName: true,
      modelName: 'Comments',
      timestamp: true,
   }
);

Comments.belongsTo(Products, { foreignKey: 'prod_code', as: 'products' });
Products.hasMany(Comments, { as: 'comments', foreignKey: 'prod_code' });
Comments.belongsTo(Users, { foreignKey: 'user_id', as: 'users' });
Users.hasMany(Comments, { as: 'comments', foreignKey: 'user_id' });

export default Comments;
