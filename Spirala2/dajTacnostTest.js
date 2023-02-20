let assert = chai.assert;
describe('TestoviParser', function () {
    describe('Funkcija dajTacnost', function () {

        it('Svi testovi prolaze', function () {
            var test = TestoviParser.dajTacnost(JSON.stringify(testovi[0]));
            assert.equal(JSON.stringify(test), JSON.stringify({ "tacnost": "100%", "greske": []  }))
        });

        it('Prolaznost je 33.3%', function () {
            var test = TestoviParser.dajTacnost(JSON.stringify(testovi[1]));
            assert.equal(JSON.stringify(test), JSON.stringify({ "tacnost": "33.3%", "greske": ["Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3", "Tabela crtaj() should draw 4 columns in row 4 when parameter are 4,3"]}))
        });

        it('Pola testova prolazi', function () {
            var test = TestoviParser.dajTacnost(JSON.stringify(testovi[2]));
            assert.equal(JSON.stringify(test), JSON.stringify({ "tacnost": "50%", "greske": ["Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3"]            }))
        });

        it('Svi testovi padaju', function () {
            var test = TestoviParser.dajTacnost(JSON.stringify(testovi[3]));
            assert.equal(JSON.stringify(test), JSON.stringify({ "tacnost": "0%", "greske": ["Tabela crtaj() should draw 3 rows when parameter are 2,3", "Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3"]}))
        });
        
        it('Testovi se ne mogu izvrsiti, izuzetak !', function () {
            var test = TestoviParser.dajTacnost("");
            assert.equal(JSON.stringify(test), JSON.stringify({ "tacnost": "0%", "greske": ["Testovi se ne mogu izvršiti"] }))
        });
        
    });
});