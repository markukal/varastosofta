var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var should = require("chai").should();
var expect = require("chai").expect;




chai.use(chaiHttp);


describe('Tarvikkeet API', () => {
    describe("Poista kaikki", ()=>{
        it("Poistaa kaikki", ()=>{
            chai.request(server)
            .delete("/tarvikkeet")
            .send({})
            .end((err, res)=>{
                res.should.have.status(200);
            })
        })
    })

    describe("POST /tarvikkeet", () =>{
        var tarvike =[{
            "tarvikeID": "12345",
            "tyyppiID": "12345",
            "varastoID": "12345",
            "yksikkoID": "12345",
            "nimi": "test",
            "kuvaus": "test",
            "maara": "123",
            "hinta": "123",
            "hpaikka": "test",
            "rarvo": "12"
        }, {
            "tarvikeID": "1234567",
            "tyyppiID": "1234567",
            "varastoID": "1234567",
            "yksikkoID": "1234567",
            "nimi": "test2",
            "kuvaus": "test2",
            "maara": "1234",
            "hinta": "1234",
            "hpaikka": "test2",
            "rarvo": "123"
        }]
        it("Lisää tarvike", () =>{
            for (tarvike in tarvike){
                chai.request(server)
                .post("/tarvikkeet")
                .send(tarvike[tarvike])
                .end((err, res) => {
                    res.should.have.status(200);
                })
            }
        })
    })

    describe("GET /tarvikkeet", () =>{
        it("Hakee kaikki tarvikkeet", ()=>{
            chai.request(server)
                .get('/tarvikkeet')
                .end((err, res) => {
                    res.should.have.status(200);
                    should.exist(res.body);                       
                
                });
        });  
           
    });

/*
    describe("GET /tarvikkeet/:id", () =>{
        it("Hakee yksikön id:llä", ()=>{
            chai.request(server)
                .get("/tarvikkeet?tarvikkeID=" + "12345")
                .end((err, res) => {
                    res.should.have.status(200);
                    should.exist(res.body);                       
                
                });
        });  
           
    });

    describe("PUT /tarvikkeet", () => {

        it("Päivittää yhden tiedon", () => {
            chai.request(server)
            .get("/tarvikkeet?tarvikeID=" + "12345")
            .end((err, result) => {
                result.should.have.status(200);
            })
        })

        it("Päivitys valmis", () => {
            chai.request(server)
            .get("/tarvikkeet?tarvikeID=" + "12345")
            .end((err, result) => {
                result.should.have.status(200);
                result.body.data.nimi.should.equal("test");
            })
        })
    })

    describe("DELETE /tarvikkeet", () => {

        it("Poistaa yhden", () => {
            chai.request(server)
            .delete("/tarvikkeet?tarvikeID=" + "12345")
            .end((err, result) => {
                result.should.have.status(200);
            })
        })
        
        it("Varmista poisto", () => {
            chai.request(server)
            .get("/tarvikkeet")
            .end((err, result) => {
                result.should.have.status(200);
                expect(result).body.to.have.lenghtOf(1);
            })
        })
        
    })
*/
});
