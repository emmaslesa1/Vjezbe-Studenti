const TestoviParser = (function () {
  var dajTacnost = function (testJsonString) {
    var string = { "tacnost": "", "greske": [] };
    try {//ukoliko je netacan string
      var testJson = JSON.parse(testJsonString);
    } catch (error) {
      string = {
        "tacnost": "0%",
        "greske": ["Testovi se ne mogu izvršiti"]
      }
      console.log(string);
      return string;
    }
    var broj_testova = testJson.stats.tests;
    var broj_passes = testJson.stats.passes;
    if (broj_testova != broj_passes ) {//kad nije 100%
      var lista = [];
      var broj_failures = testJson.stats.failures;
      for (var i = 0; i < broj_failures; i++) { //stavljanje greski u listu
        lista.push(testJson.failures[i].fullTitle);
      }
      for(var i=0; i<lista.length; i++){//stavljanje liste u string
        string.greske.push(lista[i]);
      }
      var tacnost = (testJson.stats.passes / testJson.stats.tests) * 100;
      if (tacnost % 1 != 0) tacnost = tacnost.toFixed(1); //ako ima ostatka
      else tacnost = Math.round(tacnost); //ako nema ostatka
      tacnost+="%";
      string.tacnost=tacnost;
      console.log(string);
      return string;
    } else {//kad je 100%
      var tacnost = "100%";
      string.tacnost=tacnost;
      console.log(string);
      return string;
    }
  }
  var porediRezultate = function (testJsonString1, testJsonString2) {
    var string = { "promjena": "", "greske": [] };
    var broj_testova1 = testJsonString1.tests.length;
    var broj_testova2 = testJsonString2.tests.length;
    var broj_fail_u_testJsonString2 = testJsonString2.failures.length;
    if (broj_testova1 == broj_testova2) {
      var identicni = true;
      for (var i = 0; i < broj_testova1; i++) {
        if (testJsonString1.tests[i].fullTitle != testJsonString2.tests[i].fullTitle) {
          identicni = false;
          break;
        }
      }
      if (identicni) {//kad su ista pitanja u testu
        string.promjena = this.dajTacnost(JSON.stringify(testJsonString2)).tacnost;
        var lista = [];
        var broj_failures1 = testJsonString1.stats.failures;
        for (var i = 0; i < broj_failures1; i++) { //stavljanje greski u listu
          lista.push(testJsonString1.failures[i].fullTitle);
        }
        for(var i=0; i<lista.length; i++){//stavljanje liste u string
          string.greske.push(lista[i]);
        }
        console.log(string);
        return string;
      }
    }
    var broj_failures = 0;
    var lista_fail_u_testJsonString1 = [];
    var broj_failures1 = testJsonString1.failures.length;
    for (var i = 0; i < broj_failures1; i++) { //test koja pitanja imaju u json2
      var ima_u_testJsonString2 = false;
      for (var j = 0; j < testJsonString2.tests.length; j++) {
        if (testJsonString1.failures[i].fullTitle == testJsonString2.tests[j].fullTitle) {
          ima_u_testJsonString2 = true;
          break;
        }
      }
      if (ima_u_testJsonString2!=true) {//stavljanje greski u listu
        broj_failures++;
        lista_fail_u_testJsonString1.push(testJsonString1.failures[i].fullTitle);
      }
    }
    lista_fail_u_testJsonString1.sort();
    for(var i=0; i<lista_fail_u_testJsonString1.length; i++){//stavljanje liste u string
      string.greske.push(lista_fail_u_testJsonString1[i]);
    }
    var lista_fail_u_testJsonString2 = [];
    for (var i = 0; i < broj_fail_u_testJsonString2; i++) {//stavljanje u listu failures u json2
      var ima_u_testJsonString2 = false;
      for (var j = 0; j < lista_fail_u_testJsonString1.length; j++) {
        if (testJsonString2.failures[i].fullTitle == lista_fail_u_testJsonString1[j].fullTitle) {
          ima_u_testJsonString2 = true;
          break;
        }
      }
      if (ima_u_testJsonString2!=true) {//stavljanje greski u listu
        lista_fail_u_testJsonString2.push(testJsonString2.failures[i].fullTitle);
      }
    }
    lista_fail_u_testJsonString2.sort();
    for(var i=0; i<lista_fail_u_testJsonString2.length; i++){//stavljanje liste u string
      string.greske.push(lista_fail_u_testJsonString2[i]);
    }
    var brojnik_rezultata = (broj_failures + broj_fail_u_testJsonString2);
    var nazivnik_rezultata = (broj_failures + broj_testova2);
    var promjena = (brojnik_rezultata/nazivnik_rezultata * 100);
    if (promjena % 1 != 0) promjena = promjena.toFixed(1); //ako ima ostatka
    else promjena = Math.round(promjena); //ako nema ostatka
    promjena+="%";
    string.promjena=promjena;
    console.log(string);
    return string;
  }

  return {
    dajTacnost: dajTacnost,
    porediRezultate: porediRezultate
  }
}());
