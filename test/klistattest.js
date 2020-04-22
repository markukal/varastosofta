var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var should = require("chai").should();
var expect = require("chai").expect;




chai.use(chaiHttp);


describe('Klistat API', () => {
    describe("Poista kaikki", ()=>{
        it("Poistaa kaikki", ()=>{
            chai.request(server)
            .delete("/klistat")
            .send({})
            .end((err, res)=>{
                res.should.have.status(200);
            })
        })
    })

    describe("POST /klistat", () =>{
        var klistat =[{
            "klistaID": "12345",
            "tarvikeID": "12345"
        }, {
            "klistaID": "123456",
            "tarvikeID": "123456"
        }]
        it("Lisää klistat", () =>{
            for (klistat in klistat){
                chai.request(server)
                .post("/klistat")
                .send(klistat[klistat])
                .end((err, res) => {
                    res.should.have.status(200);
                })
            }
        })
    })

    describe("GET /klistat", () =>{
        it("Hakee kaikki klistat", ()=>{
            chai.request(server)
                .get('/klistat')
                .end((err, res) => {
                    res.should.have.status(200);
                    should.exist(res.body);                       
                
                });
        });  
           
    });


    describe("GET /klistat/:id", () =>{
        it("Hakee klistat id:llä", ()=>{
            chai.request(server)
                .get("/klistat?klistaID=" + "12345")
                .end((err, res) => {
                    res.should.have.status(200);
                    should.exist(res.body);                       
                
                });
        });  
           
    });

    describe("PUT /klistat", () => {

        it("Päivittää yhden tiedon", () => {
            chai.request(server)
            .get("/klistat?klistaID=" + "12345")
            .end((err, result) => {
                result.should.have.status(200);
            })
        })

        it("Päivitys valmis", () => {
            chai.request(server)
            .get("/klistat?klistaID=" + "12345")
            .end((err, result) => {
                result.should.have.status(200);
                result.body.data.nimi.should.equal("test");
            })
        })
    })

    describe("DELETE /klistat", () => {

        it("Poistaa yhden", () => {
            chai.request(server)
            .delete("/klistat?klistaID=" + "12345")
            .end((err, result) => {
                result.should.have.status(200);
            })
        })

        it("Varmista poisto", () => {
            chai.request(server)
            .get("/klistat")
            .end((err, result) => {
                result.should.have.status(200);
                expect(result).body.to.have.lenghtOf(1);
            })
        })
    })

});