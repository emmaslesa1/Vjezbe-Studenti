const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Zadatak = sequelize.define("zadatak",{
        brojZadatka:Sequelize.INTEGER
    },{freezeTableName: true})
    return Zadatak;
};