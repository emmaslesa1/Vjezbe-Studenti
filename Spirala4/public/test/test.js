let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
var fs = require("fs");

const server = require('../../index');

chai.use(chaiHttp);
describe('Modul VjezbeAjax', function () {

    this.beforeEach(function (done) {
        let testFile = "brojVjezbe:1,brojZadatka:1\nbrojVjezbe:1,brojZadatka:2\nbrojVjezbe:2,brojZadatka:1\nbrojVjezbe:2,brojZadatka:2\nbrojVjezbe:2,brojZadatka:3\nbrojVjezbe:2,brojZadatka:4\n"
        fs.writeFile("vjezbe.csv", testFile, function () {});
        done();
    })

    this.afterEach(function (done) {
        let testFile = "brojVjezbe:1,brojZadatka:1\nbrojVjezbe:1,brojZadatka:2\nbrojVjezbe:2,brojZadatka:1\nbrojVjezbe:2,brojZadatka:2\nbrojVjezbe:2,brojZadatka:3\nbrojVjezbe:2,brojZadatka:4\n"
        fs.writeFile("vjezbe.csv", testFile, function () {});
        done();
    })

    it("Dohvati podatke", function (done) {
        let ocekivaniRezultat = {
            "brojVjezbi": 2,
            "brojZadataka": [2, 4]
        };
        chai.request(server)
            .get("/vjezbe")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.deep.equal(ocekivaniRezultat);
                done();
            })
    })

    it("Posalji podatke", function (done) {
        let ocekivaniRezultat = {
            "brojVjezbi": 3,
            "brojZadataka": [1,10,2]
        };
        let vjezbeObjekat = {
            "brojVjezbi": 3,
            "brojZadataka": [1,10,2]
        }
        chai.request(server)
            .post("/vjezbe")
            .send(vjezbeObjekat)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.deep.equal(ocekivaniRezultat);
                done();
            })
    })
});