var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var should = require("chai").should();
var expect = require("chai").expect;




chai.use(chaiHttp);


describe('Tarviketyypit API', () => {
    describe("Poista kaikki", ()=>{
        it("Poistaa kaikki", ()=>{
            chai.request(server)
            .delete("/tarviketyypit")
            .send({})
            .end((err, res)=>{
                res.should.have.status(200);
            })
        })
    })

    describe("POST /tarviketyypit", () =>{
        var tarviketyyppi =[{
            "tyyppiID": "12345",
            "nimi": "test"
        }, {
            "tyyppiID": "123456",
            "nimi": "test2"
        }]
        it("Lisää tarviketyyppi", () =>{
            for (tarviketyyppi in tarviketyyppi){
                chai.request(server)
                .post("/tarviketyypit")
                .send(tarviketyyppi[tarviketyyppi])
                .end((err, res) => {
                    res.should.have.status(200);
                })
            }
        })
    })

    describe("GET /tarviketyypit", () =>{
        it("Hakee kaikki yksiköt", ()=>{
            chai.request(server)
                .get('/tarviketyypit')
                .end((err, res) => {
                    res.should.have.status(200);
                    should.exist(res.body);                       
                
                });
        });  
           
    });


    describe("GET /tarviketyypit/:id", () =>{
        it("Hakee tarviketyypit id:llä", ()=>{
            chai.request(server)
                .get("/tarviketyypit?tyyppiID=" + "12345")
                .end((err, res) => {
                    res.should.have.status(200);
                    should.exist(res.body);                       
                
                });
        });  
           
    });

    describe("PUT /tarviketyypit", () => {

        it("Päivittää yhden tiedon", () => {
            chai.request(server)
            .get("/tarviketyypit?tyyppiID=" + "12345")
            .end((err, result) => {
                result.should.have.status(200);
            })
        })

        it("Päivitys valmis", () => {
            chai.request(server)
            .get("/tarviketyypit?tyyppiID=" + "12345")
            .end((err, result) => {
                result.should.have.status(200);
                result.body.data.nimi.should.equal("test");
            })
        })
    })

    describe("DELETE /tarviketyypit", () => {

        it("Poistaa yhden", () => {
            chai.request(server)
            .delete("/tarviketyypit?tyyppiID=" + "12345")
            .end((err, result) => {
                result.should.have.status(200);
            })
        })

        it("Varmista poisto", () => {
            chai.request(server)
            .get("/tarviketyypit")
            .end((err, result) => {
                result.should.have.status(200);
                expect(result).body.to.have.lenghtOf(1);
            })
        })
    })

});
