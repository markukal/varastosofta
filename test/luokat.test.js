var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var should = require("chai").should();
var expect = require("chai").expect;




chai.use(chaiHttp);


describe('Luokat API', () => {
    describe("Poista kaikki", ()=>{
        it("Poistaa kaikki", ()=>{
            chai.request(server)
            .delete("/luokat")
            .send({})
            .end((err, res)=>{
                res.should.have.status(200);
            })
        })
    })

    describe("POST /luokat", () =>{
        var luokka =[{
            "luokkaID": "12345",
            "nimi": "test"
        }, {
            "luokkaID": "123456",
            "nimi": "test2"
        }]
        it("Lisää luokka", () =>{
            for (luokka in luokka){
                chai.request(server)
                .post("/luokat")
                .send(luokka[luokka])
                .end((err, res) => {
                    res.should.have.status(200);
                })
            }
        })
    })

    describe("GET /luokat", () =>{
        it("Hakee kaikki luokat", ()=>{
            chai.request(server)
                .get('/luokat')
                .end((err, res) => {
                    res.should.have.status(200);
                    should.exist(res.body);                       
                
                });
        });  
           
    });


    describe("GET /luokat/:id", () =>{
        it("Hakee luokat id:llä", ()=>{
            chai.request(server)
                .get("/luokat?luokkaID=" + "12345")
                .end((err, res) => {
                    res.should.have.status(200);
                    should.exist(res.body);                       
                
                });
        });  
           
    });

    describe("PUT /luokat", () => {

        it("Päivittää yhden tiedon", () => {
            chai.request(server)
            .get("/luokat?luokkaID=" + "12345")
            .end((err, result) => {
                result.should.have.status(200);
            })
        })

        it("Päivitys valmis", () => {
            chai.request(server)
            .get("/luokat?luokkaID=" + "12345")
            .end((err, result) => {
                result.should.have.status(200);
                result.body.data.nimi.should.equal("test");
            })
        })
    })

    describe("DELETE /luokat", () => {

        it("Poistaa yhden", () => {
            chai.request(server)
            .delete("/luokat?luokkaID=" + "12345")
            .end((err, result) => {
                result.should.have.status(200);
            })
        })

        it("Varmista poisto", () => {
            chai.request(server)
            .get("/luokat")
            .end((err, result) => {
                result.should.have.status(200);
                expect(result).body.to.have.lenghtOf(1);
            })
        })
    })

});