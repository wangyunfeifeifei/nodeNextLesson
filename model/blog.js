const Sequelize = require('sequelize');
const sequelize = new Sequelize('my_db', 'admin', '', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    pool: {
        max: 5,
        idle: 3000
    }
});

// 定义模型
const Blog = sequelize.define('blog', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true  
    },
    title: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false
});

module.exports = Blog;
