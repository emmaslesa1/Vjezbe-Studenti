function ispisi(error,data) {
    if(error == null) {
        document.getElementById("ajaxstatus").innerHTML = JSON.parse(data).status;
    }
    else document.getElementById("ajaxstatus").innerHTML = error.responseText;
}

document.getElementById("btnPosaljiPodatke").addEventListener("click", function(e) {
    e.preventDefault();

    let student = {
        "ime" : document.getElementById("ime").value,
        "prezime" : document.getElementById("prezime").value,
        "index" : document.getElementById("index").value,
        "grupa" : document.getElementById("grupa").value
        
    };

    StudentAjax.dodajStudenta(student,ispisi);
});