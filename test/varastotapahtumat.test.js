var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var should = require("chai").should();
var expect = require("chai").expect;




chai.use(chaiHttp);


describe('Varastotapahtumat API', () => {
    describe("Poista kaikki", ()=>{
        it("Poistaa kaikki", ()=>{
            chai.request(server)
            .delete("/varastotapahtumat")
            .send({})
            .end((err, res)=>{
                res.should.have.status(200);
            })
        })
    })

    describe("POST /varastotapahtumat", () =>{
        var varastotapahtuma =[{
            "tapahtumaID": "12345",
            "ttyyppinimi": "test",
            "luokkanimi": "test",
            "tarvikenimi": "test",
            "maara": "123",
            "yksikkonimi": "test",
            "kasittelija": "test",
            "pvm": "test"
        }, {
            "tapahtumaID": "1234567",
            "ttyyppinimi": "test2",
            "luokkanimi": "test2",
            "tarvikenimi": "test2",
            "maara": "12345",
            "yksikkonimi": "test2",
            "kasittelija": "test2",
            "pvm": "test2"
        }]
        it("Lisää varastotapahtuma", () =>{
            for (varastotapahtuma in varastotapahtuma){
                chai.request(server)
                .post("/varastotapahtumat")
                .send(varastotapahtuma[varastotapahtuma])
                .end((err, res) => {
                    res.should.have.status(200);
                })
            }
        })
    })

    describe("GET /varastotapahtumat", () =>{
        it("Hakee kaikki varastotapahtumat", ()=>{
            chai.request(server)
                .get('/varastotapahtumat')
                .end((err, res) => {
                    res.should.have.status(200);
                    should.exist(res.body);                       
                
                });
        });  
           
    });


    describe("GET /varastotapahtumat/:id", () =>{
        it("Hakee varastotapahtumat id:llä", ()=>{
            chai.request(server)
                .get("/varastotapahtumat?tapahtumaID=" + "12345")
                .end((err, res) => {
                    res.should.have.status(200);
                    should.exist(res.body);                       
                
                });
        });  
           
    });

    describe("PUT /varastotapahtumat", () => {

        it("Päivittää yhden tiedon", () => {
            chai.request(server)
            .get("/varastotapahtumat?tapahtumaID=" + "12345")
            .end((err, result) => {
                result.should.have.status(200);
            })
        })

        it("Päivitys valmis", () => {
            chai.request(server)
            .get("/varastotapahtumat?tapahtumaID=" + "12345")
            .end((err, result) => {
                result.should.have.status(200);
                result.body.data.nimi.should.equal("test");
            })
        })
    })

    describe("DELETE /varastotapahtumat", () => {

        it("Poistaa yhden", () => {
            chai.request(server)
            .delete("/varastotapahtumat?tapahtumaID=" + "12345")
            .end((err, result) => {
                result.should.have.status(200);
            })
        })

        it("Varmista poisto", () => {
            chai.request(server)
            .get("/varastotapahtumat")
            .end((err, result) => {
                result.should.have.status(200);
                expect(result).body.to.have.lenghtOf(1);
            })
        })
    })

});