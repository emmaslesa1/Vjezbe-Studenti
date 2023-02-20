function ispisi(error,data) {
    if(error == null) {
        alert(data)
    }
    else alert(error.responseText)
}

document.getElementById("brojVjezbi").addEventListener("keyup", function () {
    document.getElementById("zadaci").innerHTML = "";
    VjezbeAjax.dodajInputPolja(document.getElementById("zadaci"), document.getElementById("brojVjezbi").value);
});

document.getElementById("btnPosaljiPodatke").addEventListener("click", function(e) {
    e.preventDefault();
    let brojZadataka = [];
    let inputTypeNumber = document.querySelectorAll('input[type=number]');
    for(let i=0; i<inputTypeNumber.length; i++) {
        brojZadataka.push(inputTypeNumber[i].value)
    }

    let vjezbeObjekat = {
        "brojVjezbi" : document.getElementById("brojVjezbi").value,
        "brojZadataka": brojZadataka
    };

    VjezbeAjax.posaljiPodatke(vjezbeObjekat,ispisi);
});

window.onload = VjezbeAjax.dodajInputPolja(document.getElementById("zadaci"), 4);