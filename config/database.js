const Sequelize = require('sequelize');
const db = new Sequelize('codegig', 'root', 'passw0rd', {
  host: 'localhost',
  dialect: 'mysql',
  query: {
    raw: true
  },
  logging:true,
  dialectOptions: {
    typeCast: function (field, next) { // for reading from database
      if (field.type === 'DATETIME') {
        return field.string()
      }
        return next()
      },
  },
  timezone: '+07:00'
});

module.exports = db;