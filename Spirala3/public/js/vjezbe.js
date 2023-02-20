window.onload = function () {
    VjezbeAjax.dohvatiPodatke(vratiVjezbeObjekat);

}

function vratiVjezbeObjekat(error, data) {
    if (error == null) {
        VjezbeAjax.iscrtajVjezbe(document.getElementById("odabirVjezbe"), JSON.parse(data));
        let divVjezbeListaElement = document.getElementsByClassName("vjezbe-lista");
        for (let i = 0; i < divVjezbeListaElement.length; i++) {
            VjezbeAjax.iscrtajZadatke(divVjezbeListaElement[i], JSON.parse(data).brojZadataka[i]);
        }

    } else return error.responseText;
}