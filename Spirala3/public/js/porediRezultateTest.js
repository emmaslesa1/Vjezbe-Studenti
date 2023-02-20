let assert = chai.assert;
describe('TestoviParser', function () {
    describe('Funkcija porediRezultate', function () {

        it('Prolaze svi testovi', function () {
            var test = TestoviParser.porediRezultate(testovi[5], testovi[6]);
            assert.equal(JSON.stringify(test), JSON.stringify({ "promjena": "100%", "greske": [] }))
        });

        it('Promjena 50%', function () {
            var test = TestoviParser.porediRezultate(testovi[5], testovi[7]);
            assert.equal(JSON.stringify(test), JSON.stringify({ "promjena": "50%", "greske": []}))
        });

        it('Promjena 100% - postoje errori u testovima', function () {
            var test = TestoviParser.porediRezultate(testovi[6], testovi[9]);
            assert.equal(JSON.stringify(test), JSON.stringify({ "promjena": "100%", "greske": ["Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3","Tabela crtaj() should draw 1 columns in row 3 when parameter are 1,3","Tabela crtaj() should draw 5 rows when parameter are 5,3"]}))
        });

        it('Promjena 50%', function () {
            var test = TestoviParser.porediRezultate(testovi[8], testovi[10]);
            assert.equal(JSON.stringify(test), JSON.stringify({ "promjena": "50%", "greske": ["Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3"]}))
        });

        it('Promjena 66.7%', function () {
            var test = TestoviParser.porediRezultate(testovi[7], testovi[10]);
            assert.equal(JSON.stringify(test), JSON.stringify({ "promjena": "66.7%", "greske": ["Tabela crtaj() should draw 3 rows when parameter are 2,3","Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3"]}))
        });

        it('Promjena 50%', function () {
            var test = TestoviParser.porediRezultate(testovi[5], testovi[8]);
            assert.equal(JSON.stringify(test), JSON.stringify({ "promjena": "50%", "greske": [] }))
        });
    });
});