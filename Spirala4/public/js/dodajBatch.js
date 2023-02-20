function ispisi(error,data) {
    if(error == null) {
        document.getElementById("ajaxstatus").innerHTML = JSON.parse(data).status;
    }
    else document.getElementById("ajaxstatus").innerHTML = error.responseText;
}

document.getElementById("btnPosaljiPodatke").addEventListener("click", function(e) {
    e.preventDefault();

    StudentAjax.dodajBatch(document.getElementById("csvStudenti").value,ispisi);
});