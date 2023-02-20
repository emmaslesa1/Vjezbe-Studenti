const db = require('./db.js')

module.exports = {
    initData: async function initData() {
        await db.student.create({ime:"Student", prezime:"Studentic",index:"Test1", grupa: "WT-grupa1"});

        await db.grupa.create({naziv:"WT-grupa1"});

        await db.vjezba.create({brojVjezbi:2, brojZadataka: "[3,5]"});

    } 
}