const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Vjezba = sequelize.define("vjezba",{
        brojVjezbi:Sequelize.INTEGER,
        brojZadataka:Sequelize.STRING
    },{freezeTableName: true})
    return Vjezba;
};