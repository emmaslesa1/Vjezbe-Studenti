let assert = chai.assert;
describe('TestoviParser', function () {
    describe('Funkcija dajTacnost', function () {

        it('Rezultat treba vratiti 100% tacnost', function () {
            var test = TestoviParser.dajTacnost(JSON.stringify(testovi[0]));
            assert.equal(JSON.stringify(test), JSON.stringify({ "tacnost": "100%", "greske": []  }))
        });

        it('Rezultat treba vratiti 33.3% tacnost', function () {
            var test = TestoviParser.dajTacnost(JSON.stringify(testovi[1]));
            assert.equal(JSON.stringify(test), JSON.stringify({ "tacnost": "33.3%", "greske": ["Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3", "Tabela crtaj() should draw 4 columns in row 4 when parameter are 4,3"]}))
        });

        it('Rezultat treba vratiti 50% tacnost', function () {
            var test = TestoviParser.dajTacnost(JSON.stringify(testovi[2]));
            assert.equal(JSON.stringify(test), JSON.stringify({ "tacnost": "50%", "greske": ["Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3"]            }))
        });

        it('Rezultat treba vratiti 0% tacnost', function () {
            var test = TestoviParser.dajTacnost(JSON.stringify(testovi[3]));
            assert.equal(JSON.stringify(test), JSON.stringify({ "tacnost": "0%", "greske": ["Tabela crtaj() should draw 3 rows when parameter are 2,3", "Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3"]}))
        });
        
        it('Rezultat treba vratiti 0% tacnost (test se ne moze izvrsiti)', function () {
            var test = TestoviParser.dajTacnost(JSON.stringify(testovi[4]));
            assert.equal(JSON.stringify(test), JSON.stringify({ "tacnost": "0%", "greske": ["Testovi se ne mogu izvršiti"] }))
        });
        
    });
});