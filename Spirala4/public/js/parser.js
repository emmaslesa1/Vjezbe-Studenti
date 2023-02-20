const TestoviParser = (function() {
  var dajTacnost = function(testJsonString) {
    var testJson = JSON.parse(testJsonString);
    var rez = { "tacnost": "",  "greske": [] };
    if (testJson.stats.tests === testJson.stats.passes) {
      rez.tacnost = "100%";
      return rez;
    }

    for (var i = 0; i < testJson.tests.length; i++) {
      if (Object.keys(testJson.tests[i].err).length !== 0) {
        return {
          "tacnost": "0%",
          "greske": ["Testovi se ne mogu izvršiti"]
        };
      }
    }

    for(var i = 0; i < testJson.failures.length; i++) {
      rez.greske.push(testJson.failures[i].fullTitle);
    }

    var procenatTacnosti = (testJson.passes.length / testJson.tests.length) * 100;
    if(procenatTacnosti % 1 == 0) {
      rez.tacnost = Math.round(procenatTacnosti) + "%";
    }
    else rez.tacnost =  procenatTacnosti.toFixed(1) + "%";

    return rez;
  }

  var porediRezultate = function(testJson1, testJson2) {
    var rez = { "promjena": "", "greske": [] };
    if (testJson1.tests.length === testJson2.tests.length) {
      var istiTest = true;
      for (var i = 0; i < testJson1.tests.length; i++) {
        if (testJson1.tests[i].fullTitle !== testJson2.tests[i].fullTitle) {
          istiTest = false;
          break;
        }
      }
      if (istiTest) {
        rez.promjena = this.dajTacnost(JSON.stringify(testJson2)).tacnost;
        for(var i = 0; i < testJson1.failures.length; i++) {
          rez.greske.push(testJson1.failures[i].fullTitle);
        }
        return rez;
      }
    }

    var rezTestovi = 0;
    var pomocniNiz = [];
    for (var i = 0; i < testJson1.failures.length; i++) {
      var testVecPostoji = false;
      for (var j = 0; j < testJson2.tests.length; j++) {
        if (testJson1.failures[i].fullTitle === testJson2.tests[j].fullTitle) {
          testVecPostoji = true;
          break;
        }
      }
      if (!testVecPostoji) {
        rezTestovi++;
        pomocniNiz.push(testJson1.failures[i].fullTitle);
      }
    }

    pomocniNiz.sort();
    rez.greske.push(...pomocniNiz);
    var pomocniNiz1 = [];
    
    for (var i = 0; i < testJson2.failures.length; i++) {
      var testVecPostoji = false;
      for (var j = 0; j < pomocniNiz.length; j++) {
        if (testJson2.failures[i].fullTitle === pomocniNiz[j].fullTitle) {
          testVecPostoji = true;
          break;
        }
      }
      if (!testVecPostoji) {
        pomocniNiz1.push(testJson2.failures[i].fullTitle);
      }
    }

    pomocniNiz1.sort();
    rez.greske.push(...pomocniNiz1);

    var procenatPromjene = ((rezTestovi + testJson2.failures.length) / (rezTestovi + testJson2.tests.length) * 100);
    if(procenatPromjene % 1 == 0) {
      rez.promjena = Math.round(procenatPromjene) + "%";
    }
    else rez.promjena = procenatPromjene.toFixed(1) + "%";

    return rez;
  }

  return {
    dajTacnost: dajTacnost,
    porediRezultate: porediRezultate
  }
}());

//var test = "{\"stats\":{\"suites\":2,\"tests\":2,\"passes\":2,\"pending\":0,\"failures\":0,\"start\":\"2021-11-05T15:00:26.343Z\",\"end\":\"2021-11-05T15:00:26.352Z\",\"duration\":9},\"tests\":[{\"title\":\"should draw 3 rows when parameter are 2,3\",\"fullTitle\":\"Tabela crtaj() should draw 3 rows when parameter are 2,3\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"should draw 2 columns in row 2 when parameter are 2,3\",\"fullTitle\":\"Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"pending\":[],\"failures\":[],\"passes\":[{\"title\":\"should draw 3 rows when parameter are 2,3\",\"fullTitle\":\"Tabela crtaj() should draw 3 rows when parameter are 2,3\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"should draw 2 columns in row 2 when parameter are 2,3\",\"fullTitle\":\"Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}]}";

//console.log(TestoviParser.dajTacnost(test))