var fs = require("fs");
var express = require("express");

var app = express();
app.use(express.static('public'));
app.use('/', express.static('public/html'));
app.use(express.json());

app.get("/vjezbe/", (request,response) => {
    fs.readFile("./vjezbe.csv", (err,data) => {
        if(err) throw err;
        let csvTekst = data.toString("utf-8").split("\n");
        let brojVjezbi = csvTekst[csvTekst.length-2].split(",")[0].split(":")[1];
        let brojZadataka = [];

        for(let i=0; i<csvTekst.length-1; i++) {
            let red = csvTekst[i];
            let zadatak = red.split(",")[1].split(":")[1];
            let brojVjezbe = red.split(",")[0].split(":")[1];
            if(brojVjezbe == csvTekst[i+1].split(",")[0].split(":")[1]) {
                continue;
            }
            else {
                brojZadataka.push(parseInt(zadatak));
            }
        }
        response.json({brojVjezbi:parseInt(brojVjezbi),brojZadataka:brojZadataka});
        response.end();
        return;

    })
})

app.post("/vjezbe/", (request,response) => {
    let brojVjezbi = request.body.brojVjezbi;
    let brojZadataka = request.body.brojZadataka;

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

    if(errorStatus == true /* && errorPoruka[errorPoruka.length-1] == ","*/) {
        let ukloniZarezErrorPoruka = errorPoruka.substring(0, errorPoruka.length - 1);
        response.status(400); 
        response.json({status:"error",data:ukloniZarezErrorPoruka});
        response.end(); 
        return;
    } 

    let upis = "";
    for(let i=0; i<brojVjezbi; i++) {
        for(let j=0; j<parseInt(brojZadataka[i]); j++) {
            upis += "brojVjezbe:" + (i+1) + ",brojZadatka:" + (j+1) + "\n";
        }
    }

    fs.writeFile("./vjezbe.csv", upis, (err) => {
        if(err) throw err;
        let parseBrojZadataka = [];
        for(let i=0; i<brojZadataka.length; i++) {
            parseBrojZadataka.push(parseInt(brojZadataka[i]));
        }
        response.json({brojVjezbi:parseInt(brojVjezbi),brojZadataka:parseBrojZadataka});
        response.end();
        return;
    })
})

app.listen(3000, () => { console.log("Server aktivan - http://localhost:3000/")});

module.exports = app;