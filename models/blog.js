import db from '../config/database.js';
import { DataTypes, Model } from 'sequelize';
import Users from './users.js'

class Blog extends Model {}
Blog.init(
   {
      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
      },
      title: { type: DataTypes.STRING },
      text: { type: DataTypes.STRING },
      imageLink: { type: DataTypes.STRING },
      userId: { type: DataTypes.INTEGER },
   },
   {
      sequelize: db,
      tableName: 'blog',
      freezeTableName: true,
      modelName: 'Blog',
      timestamp: true,
   }
);

Blog.belongsTo(Users, { foreignKey: 'userId', as: 'users' });
Users.hasMany(Blog, { as: 'blog', foreignKey: 'userId' });

export default Blog;
