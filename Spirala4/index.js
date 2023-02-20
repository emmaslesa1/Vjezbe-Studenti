var fs = require("fs");
var express = require("express");
const db = require('./db');
const initDb = require('./pripremiDb');
const grupa = require("./public/models/grupa");

var app = express();
app.use(express.static('public'));
app.use('/', express.static('public/html'));
app.use(express.text({
    type: ["text/csv", "text/plain"]
}))
app.use(express.json());

app.post("/student", async function (req, res) {
    let imeBody = req.body.ime;
    let prezimeBody = req.body.prezime;
    let indexBody = req.body.index;
    let grupaBody = req.body.grupa;

    let postojiStudentUBazi = await db.student.findOne({
        where: {
            index: indexBody
        }
    })

    if (postojiStudentUBazi != null) {
        res.json({
            status: "Student sa indexom {" + indexBody + "} već postoji!"
        });
    } else {
        let postojiGrupaUBazi = await db.grupa.findOne({
            where: {
                naziv: grupaBody
            }
        })

        if (postojiGrupaUBazi == null) {
            postojiGrupaUBazi = await db.grupa.create({
                naziv: grupaBody
            })
        }

        let dodajStudentaUBazu = await db.student.create({
            ime: imeBody,
            prezime: prezimeBody,
            index: indexBody,
            grupa: postojiGrupaUBazi.naziv
        })

        if (dodajStudentaUBazu != null) {
            res.json({
                status: "Kreiran student!"
            });
        }
    }

});

app.put("/student/:index", async function (req, res) {
    let indexParam = req.params.index;
    let grupaBody = req.body.grupa;

    let postojiStudentUBazi = await db.student.findOne({
        where: {
            index: indexParam
        }
    })

    if (postojiStudentUBazi != null) {
        let postojiGrupaUBazi = await db.grupa.findOne({
            where: {
                naziv: grupaBody
            }
        })

        if (postojiGrupaUBazi == null) {
            postojiGrupaUBazi = await db.grupa.create({
                naziv: grupaBody
            })
        }

        postojiStudentUBazi.grupa = postojiGrupaUBazi.naziv;
        postojiStudentUBazi.save();

        res.json({
            status: "Promjenjena grupa studentu " + indexParam
        });
    } else {
        res.json({
            status: "Student sa indexom {" + indexParam + "} ne postoji"
        });
    }
})

app.post("/batch/student", async function (req, res) {
    console.log(req.body)
    let indexiPostojecihStudenata = [];
    let csvText = req.body.toString();
    let redoviCsvText = csvText.split("\n");
    let dodajStudente = [];
    let brojDodanihStudenata = 0;

    let postojeciStudenti = await db.student.findAll();

    for (let i = 0; i < redoviCsvText.length; i++) {
        let studentPostoji = false;
        let celijeCsvText = redoviCsvText[i].split(",");
        let student = {
            ime: celijeCsvText[0],
            prezime: celijeCsvText[1],
            index: celijeCsvText[2].toString().toUpperCase(),
            grupa: celijeCsvText[3]
        };
        let indexCsvText = celijeCsvText[2].toString().toUpperCase();
        for (let j = 0; j < postojeciStudenti.length ; j++) {
            let indexPostojecegStudenta = postojeciStudenti[j].index;
            if (indexCsvText.toString().toUpperCase() == indexPostojecegStudenta.toString().toUpperCase()) {
                studentPostoji = true;
                indexiPostojecihStudenata.push(indexCsvText);
                break;
            }
        }
        if (!studentPostoji) {
            dodajStudente.push(student);
            brojDodanihStudenata++;
        }
    }

    if(indexiPostojecihStudenata.length == 0 && brojDodanihStudenata > 0) {
        for(let i = 0; i < dodajStudente.length; i++) {
            await db.student.create({
                ime: dodajStudente[i].ime,
                prezime: dodajStudente[i].prezime,
                index: dodajStudente[i].index,
                grupa: dodajStudente[i].grupa
            })

            let postojiGrupaUBazi = await db.grupa.findOne({
                where: {
                    naziv: dodajStudente[i].grupa
                }
            })

            if(postojiGrupaUBazi == null) {
                await db.grupa.create({
                    naziv: dodajStudente[i].grupa
                })
            }
        }         
        res.json({status: "Dodano " + brojDodanihStudenata + " studenata!"});
    }

    else if(indexiPostojecihStudenata.length > 0 && brojDodanihStudenata > 0) {
        for(let i = 0; i < dodajStudente.length; i++) {
            await db.student.create({
                ime: dodajStudente[i].ime,
                prezime: dodajStudente[i].prezime,
                index: dodajStudente[i].index,
                grupa: dodajStudente[i].grupa
            })
        } 
        let statusPoruka = "Dodano "  + brojDodanihStudenata + " studenata, a studenti {";
        for(let i = 0; i < indexiPostojecihStudenata.length; i++) {
            if(i == indexiPostojecihStudenata.length-1) {
                statusPoruka += indexiPostojecihStudenata[i].toString();
            }
            else statusPoruka += indexiPostojecihStudenata[i].toString() + ",";
        }
        statusPoruka += "} već postoje!"
               
        res.json({status: statusPoruka});
    }
    else if(indexiPostojecihStudenata.length > 0 && brojDodanihStudenata == 0) {
        res.json({status: 'Poslani studenti već postoje!'});
    }

})

app.get("/vjezbe/", async function (req,res) {
    let vjezbe = await db.vjezba.findOne();

    res.json({brojVjezbi:vjezbe.brojVjezbi,brojZadataka:JSON.parse(vjezbe.brojZadataka)});
})

app.post("/vjezbe/", async function (req,res) {
    await db.vjezba.destroy({
        where: {},
        truncate: true
      })

    let brojVjezbi = req.body.brojVjezbi;
    let brojZadataka = req.body.brojZadataka;

    // provjera postoji li greška u parametrima
    let errorStatus = false;
    let errorPoruka = "Pogrešan parametar ";

    if(brojVjezbi < 1 || brojVjezbi > 15) {
        errorPoruka += "brojVjezbi,";
        errorStatus = true;
    }    

    for(let i=0; i<brojZadataka.length; i++) {
        if(brojZadataka[i] < 0 || brojZadataka[i] > 10) {
            errorPoruka += "z" + i + ",";
            errorStatus = true;
        }
    }

    if(brojVjezbi != brojZadataka.length) {
        errorPoruka += "brojZadatka,";
        errorStatus = true;
    }

    if(errorStatus == true) {
        let ukloniZarezErrorPoruka = errorPoruka.substring(0, errorPoruka.length - 1);
        res.status(400); 
        res.json({status:"Greška",data:ukloniZarezErrorPoruka});
        res.end(); 
        return;
    } 

    await db.vjezba.create({
        brojVjezbi: brojVjezbi,
        brojZadataka: JSON.stringify(brojZadataka)
    })
    res.json({brojVjezbi:parseInt(brojVjezbi),brojZadataka:JSON.stringify(brojZadataka)});

})

app.listen(3000, () => {
    console.log("Server aktivan - http://localhost:3000/");
    db.sequelize.sync({
        force: true
    }).then(() => initDb.initData());
});

module.exports = app;