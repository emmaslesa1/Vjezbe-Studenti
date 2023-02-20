const Sequelize = require("sequelize");
const sequelize = new Sequelize("wt2118741", "root", "password", {
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.grupa = require('./public/models/grupa.js')(sequelize);
db.student = require('./public/models/student.js')(sequelize);
db.vjezba = require('./public/models/vjezba.js')(sequelize);
db.zadatak = require('./public/models/zadatak.js')(sequelize);



module.exports = db;