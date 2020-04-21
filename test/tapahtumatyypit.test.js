var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var should = require("chai").should();
var expect = require("chai").expect;
var sleep = require("sleep");



chai.use(chaiHttp);


describe('Tapahtumatyypit API', () => {
    describe("Poista kaikki", ()=>{
        it("Poistaa kaikki", ()=>{
            chai.request(server)
            .delete("/tapahtumatyypit")
            .send({})
            .end((err, res)=>{
                res.should.have.status(200);
            })
        })
    })

    describe("POST /tapahtumatyypit", () =>{
        var tapahtumatyyppi =[{
            "tyyppiID": "12345",
            "nimi": "test"
        }, {
            "tyyppiID": "123456",
            "nimi": "test2"
        }]
        it("Lisää tarviketyyppi", () =>{
            for (tapahtumatyyppi in tapahtumatyyppi){
                chai.request(server)
                .post("/tapahtumatyypit")
                .send(tapahtumatyyppi[tapahtumatyyppi])
                .end((err, res) => {
                    res.should.have.status(200);
                })
            }
        })
    })

    describe("GET /tapahtumatyypit", () =>{
        it("Hakee kaikki yksiköt", ()=>{
            chai.request(server)
                .get('/tapahtumatyypit')
                .end((err, res) => {
                    res.should.have.status(200);
                    should.exist(res.body);                       
                
                });
        });  
           
    });


    describe("GET /tapahtumatyypit/:id", () =>{
        it("Hakee tapahtumatyypit id:llä", ()=>{
            chai.request(server)
                .get("/tapahtumatyypit?ttyyppiID=" + "12345")
                .end((err, res) => {
                    res.should.have.status(200);
                    should.exist(res.body);                       
                
                });
        });  
           
    });

    describe("PUT /tapahtumatyypit", () => {

        it("Päivittää yhden tiedon", () => {
            chai.request(server)
            .get("/tapahtumatyypit?ttyyppiID=" + "12345")
            .end((err, result) => {
                result.should.have.status(200);
            })
        })

        it("Päivitys valmis", () => {
            chai.request(server)
            .get("/tapahtumatyypit?ttyyppiID=" + "12345")
            .end((err, result) => {
                result.should.have.status(200);
                result.body.data.nimi.should.equal("test");
            })
        })
    })

    describe("DELETE /tapahtumatyypit", () => {

        it("Poistaa yhden", () => {
            chai.request(server)
            .delete("/tapahtumatyypit?ttyyppiID=" + "12345")
            .end((err, result) => {
                result.should.have.status(200);
            })
        })

        it("Varmista poisto", () => {
            chai.request(server)
            .get("/tapahtumatyypit")
            .end((err, result) => {
                result.should.have.status(200);
                expect(result).body.to.have.lenghtOf(1);
            })
        })
    })

});