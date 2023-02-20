let chai = require('chai');
let chaiHttp = require('chai-http');
const {
    fstat
} = require('fs');
const db = require('../../db');
let should = chai.should();

const server = require('../../index');

chai.use(chaiHttp);


describe('Testiranje web servisa', function () {
    this.beforeEach(function (done) {
        var fs = require("fs");
        fs.writeFile("studenti.csv", "Test,Test,1-ST,GrupaAzra\n", function () {});
        done();
    })

    describe('POST /student', function () {
        it('treba dodati studenta', function (done) {
            let student = {
                "ime": "Student",
                "prezime": "Studentic",
                "index": "StudentIndex",
                "grupa": "StudentGrupa"
            }
            chai.request(server)
                .post("/student")
                .set("Content-Type", "application/json")
                .send(student)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql("Kreiran student!");

                    db.student.findOne({
                        where: {
                            ime: "Student",
                            prezime: "Studentic",
                            index: "StudentIndex",
                            grupa: "StudentGrupa"
                        }
                    }).then(student => {
                        assert.isNotNull(student, "Student nije dodan sa ispravnim podacima");
                    }).then(() => done()).catch(done);
                }).catch(done);
        });
        it('ne treba dodati studenta', function (done) {
            let student = {
                "ime": "TestIme",
                "prezime": "TestPrezime",
                "index": "1-ST",
                "grupa": "TestGrupa"
            }
            chai.request(server)
                .post("/student")
                .send(student)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql("Student sa indexom {1-ST} već postoji!");
                    done();
                })
        });
    });

    // describe('PUT /student/1-ST', function () {
    //     it('treba promijeniti grupu postojeÄ‡eg studenta', function (done) {
    //         let student = {
    //             "ime": "TestIme",
    //             "prezime": "TestPrezime",
    //             "index": "TestIndex",
    //             "grupa": "TestGrupa"
    //         }
    //         chai.request(server)
    //             .put("/student/1-ST")
    //             .send(student)
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 res.body.should.be.a('object');
    //                 res.body.should.have.property('status').eql("Promjenjena grupa studentu 1-ST");
    //                 done();
    //             })
    //     });
    //     it('ne postoji student sa poslanim indexom', function (done) {
    //         let student = {
    //             "ime": "TestIme",
    //             "prezime": "TestPrezime",
    //             "index": "99999",
    //             "grupa": "TestGrupa"
    //         }
    //         chai.request(server)
    //             .put("/student/99999")
    //             .send(student)
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 res.body.should.be.a('object');
    //                 res.body.should.have.property('status').eql("Student sa indexom 99999 ne postoji");
    //                 done();
    //             })
    //     });
    // });

    // describe('POST /batch/student', function () {
    //     it('treba dodati novog studenta iz CSV texta', function (done) {
    //         let textCsv = "Azra,Varnica,Index-ST,Grupa";
    //         chai.request(server)
    //             .post("/batch/student")
    //             .set('content-type', 'text/csv')
    //             .send(textCsv)
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 res.body.should.be.a('object');
    //                 res.body.should.have.property('status').eql("Dodano 1 studenata!");
    //                 done();
    //             })
    //     });
    //     it('treba dodati novog studenta iz CSV texta, a jedan student veÄ‡ postoji', function (done) {
    //         let textCsv = "Azra,Varnica,Index-ST,Grupa\nTest,Test,1-ST,GrupaAzra";
    //         chai.request(server)
    //             .post("/batch/student")
    //             .set('content-type', 'text/csv')
    //             .send(textCsv)
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 res.body.should.be.a('object');
    //                 res.body.should.have.property('status').eql("Dodano 1 studenata, a studenti 1-ST veÄ‡ postoje!");
    //                 done();
    //             })
    //     });
    //     it('svi poslani studenti veÄ‡ postoje', function (done) {
    //         let textCsv = "Test,Test,1-ST,GrupaAzra";
    //         chai.request(server)
    //             .post("/batch/student")
    //             .set('content-type', 'text/csv')
    //             .send(textCsv)
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 res.body.should.be.a('object');
    //                 res.body.should.have.property('status').eql("Svi studenti veÄ‡ postoje!");
    //                 done();
    //             })
    //     });
    //     it('poslani content-type nije ispravan', function (done) {
    //         let student = {
    //             "ime": "TestIme",
    //             "prezime": "TestPrezime",
    //             "index": "TestIndex",
    //             "grupa": "TestGrupa"
    //         }
    //         chai.request(server)
    //             .post("/batch/student")
    //             .set('content-type', 'application/json')
    //             .send(student)
    //             .end((err, res) => {
    //                 res.should.have.status(400);
    //                 res.body.should.be.a('object');
    //                 res.body.should.have.property('status').eql("Content-type nije text/csv ili text/plain!");
    //                 done();
    //             })
    //     });
    // });
});