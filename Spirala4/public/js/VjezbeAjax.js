const VjezbeAjax = (function() {

    var iscrtajZadatke = function(vjezbaDOMelement,brojZadataka) {
        let vjezbaId = vjezbaDOMelement.getElementsByTagName("a")[0].href.toString().split("#")[1];
        if(brojZadataka > 0 && brojZadataka < 11) {
            let divVjezbeElement = document.createElement("DIV");
            divVjezbeElement.setAttribute("id",vjezbaId);
            for(let i=0; i<brojZadataka; i++) {
                let aElement = document.createElement("A");
                aElement.setAttribute("href","#");
                aElement.innerHTML = "Zadatak " + (i+1);
                aElement.style.textAlign = "center";
                divVjezbeElement.appendChild(aElement);
            }
            vjezbaDOMelement.appendChild(divVjezbeElement);
        }
    }

    var iscrtajVjezbe = function(divDOMelement, vjezbeObjekat) {
        divDOMelement.innerHTML = "";
        if (vjezbeObjekat.brojVjezbi > 0 && vjezbeObjekat.brojVjezbi < 16) {
            for (let i = 0; i < vjezbeObjekat.brojVjezbi; i++) { 
                let divVjezbeListaElement = document.createElement("DIV");
                divVjezbeListaElement.classList.add("vjezbe-lista");
                let divElement = document.createElement("DIV");
                divElement.classList.add("vjezba-link");
                let aElement = document.createElement("A");
                aElement.innerHTML = "Vježba " + (i+1);
                aElement.setAttribute("href","#vjezba" + (i+1));

                divElement.appendChild(aElement);
                divVjezbeListaElement.appendChild(divElement);
                divDOMelement.appendChild(divVjezbeListaElement);
            }
        }
        else {
            divDOMelement.innerHTML = "";
        }
    }

    var dohvatiPodatke = function(callbackFja) {
        $.ajax({
            url: "http://localhost:3000/vjezbe/",
            type: "GET",
            success: function(data) {
                callbackFja(null,JSON.stringify(data));
            },
            error: function(err) {
                callbackFja(JSON.stringify(err),null);
            }
        });
    }

    var posaljiPodatke = function(vjezbeObjekat,callbackFja) {
        $.ajax({
            url: "http://localhost:3000/vjezbe/",
            type: "POST",
            data: JSON.stringify(vjezbeObjekat),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data) {
                callbackFja(null,JSON.stringify(data));
            },
            error: function(err) {
                callbackFja(err,null);
            }
        });
    }

    var dodajInputPolja = function(DOMelementDIVauFormi, brojVjezbi) {
        if (brojVjezbi > 0 && brojVjezbi < 16) {
            for (let i = 0; i < brojVjezbi; i++) {
                let divElement = document.createElement("DIV");
                let labelElement = document.createElement("LABEL");
                labelElement.innerHTML = "Broj zadataka u vježbi " + (i + 1) + ": ";
                labelElement.htmlFor = "z" + i;
                let inputElement = document.createElement("INPUT");
                inputElement.setAttribute("name","z" + i);
                inputElement.setAttribute("id","z" + i);
                inputElement.setAttribute("type","number");
                let brElement = document.createElement("BR");

                
                divElement.appendChild(labelElement);
                divElement.appendChild(inputElement);
                divElement.appendChild(brElement);
                DOMelementDIVauFormi.appendChild(divElement);
            }
        }
        else {
            DOMelementDIVauFormi.innerHTML = "";
        }
    }

    return {
        iscrtajZadatke: iscrtajZadatke,
        iscrtajVjezbe: iscrtajVjezbe,
        dohvatiPodatke: dohvatiPodatke,
        posaljiPodatke: posaljiPodatke,
        dodajInputPolja: dodajInputPolja
    }
}());
