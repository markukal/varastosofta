var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var should = require("chai").should();
var expect = require("chai").expect;
var sleep = require("sleep");



chai.use(chaiHttp);


describe('Varastot API', () => {
    describe("Poista kaikki", ()=>{
        it("Poistaa kaikki", ()=>{
            chai.request(server)
            .delete("/varastot")
            .send({})
            .end((err, res)=>{
                res.should.have.status(200);
            })
        })
    })

    describe("POST /varastot", () =>{
        var varastot =[{
            "varastoID": "12345",
            "nimi": "test"
        }, {
            "varastotID": "123456",
            "nimi": "test2"
        }]
        it("Lisää varasto", () =>{
            for (varastot in varastot){
                chai.request(server)
                .post("/varastot")
                .send(varastot[varastot])
                .end((err, res) => {
                    res.should.have.status(200);
                })
            }
        })
    })

    describe("GET /varastot", () =>{
        it("Hakee kaikki varastot", ()=>{
            chai.request(server)
                .get('/varastot')
                .end((err, res) => {
                    res.should.have.status(200);
                    should.exist(res.body);                       
                
                });
        });  
           
    });


    describe("GET /varastot/:id", () =>{
        it("Hakee varastot id:llä", ()=>{
            chai.request(server)
                .get("/varastot?varastoID=" + "12345")
                .end((err, res) => {
                    res.should.have.status(200);
                    should.exist(res.body);                       
                
                });
        });  
           
    });

    describe("PUT /varastot", () => {

        it("Päivittää yhden tiedon", () => {
            chai.request(server)
            .get("/varastot?varastoID=" + "12345")
            .end((err, result) => {
                result.should.have.status(200);
            })
        })

        it("Päivitys valmis", () => {
            chai.request(server)
            .get("/varastot?varastoID=" + "12345")
            .end((err, result) => {
                result.should.have.status(200);
                result.body.data.nimi.should.equal("test");
            })
        })
    })

    describe("DELETE /varastot", () => {

        it("Poistaa yhden", () => {
            chai.request(server)
            .delete("/varastot?varastoID=" + "12345")
            .end((err, result) => {
                result.should.have.status(200);
            })
        })

        it("Varmista poisto", () => {
            chai.request(server)
            .get("/varastot")
            .end((err, result) => {
                result.should.have.status(200);
                expect(result).body.to.have.lenghtOf(1);
            })
        })
    })

});
