var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var should = require("chai").should();
var expect = require("chai").expect;


var timeOut = 50;

chai.use(chaiHttp);

setTimeout(() => { describe('Ostoskori API', () => {
    describe("Poista kaikki", ()=>{
        it("Poistaa kaikki", ()=>{
            chai.request(server)
            .delete("/ostoskori")
            .send({})
            .end((err, res)=>{
                res.should.have.status(200);
            })
            
        })
    }) }, timeOut);
    
describe('Ostoskori API', () => {
   describe("Poista kaikki", ()=>{
        it("Poistaa kaikki", ()=>{
            chai.request(server)
            .delete("/ostoskori")
            .send({})
            .end((err, res)=>{
                res.should.have.status(200);
            })
            
        })
    }) 
    setTimeout(() => { describe("POST /ostoskori", () =>{
        var ostoskori =[{
            "ostosID": "12345",
            "tarvikeID": "12345",
            "kasittelija": "test"
        }, {
            "tyyppiID": "123456",
            "tarvikeID": "123456",
            "kasittelija": "test2"
        }]
        it("Lisää ostoskori", () =>{
            for (ostoskori in ostoskori){
                chai.request(server)
                .post("/ostoskori")
                .send(ostoskori[ostoskori])
                .end((err, res) => {
                    res.should.have.status(200);
                })
            }
            
        })
    }) }, timeOut);
    
    setTimeout(() => { describe("GET /ostoskori", () =>{
        it("Hakee kaikki ostoskorit", ()=>{
            chai.request(server)
                .get('/ostoskori')
                .end((err, res) => {
                    res.should.have.status(200);
                    should.exist(res.body);                       
                
                });
                
        });  
           
    }); }, timeOut);
    

    setTimeout(() => { describe("GET /ostoskori/:id", () =>{
        it("Hakee ostoskorin id:llä", ()=>{
            chai.request(server)
                .get("/ostoskori?ostosID=" + "12345")
                .end((err, res) => {

                                         
                
                });
                
        });  
           
    }); }, timeOut);
    
    setTimeout(() => { describe("PUT /ostoskori", () => {

        it("Päivittää yhden tiedon", () => {
            chai.request(server)
            .get("/ostoskori?ostosID=" + "12345")
            .end((err, result) => {
                result.should.have.status(200);
            })
          
        })

        it("Päivitys valmis", () => {
            chai.request(server)
            .get("/ostoskori?ostosID=" + "12345")
            .end((err, result) => {
                result.should.have.status(200);
                result.body.data.nimi.should.equal("test");
            })
         
        })
    }) }, timeOut);
    
     describe("DELETE /ostoskori", () => {
        setTimeout(() => {
        it("Poistaa yhden", () => {
            chai.request(server)
            .delete("/ostoskori?ostosID=" + "12345")
            .end((err, result) => {
                result.should.have.status(200);
            })
             
        })}, timeOut);
        setTimeout(() => {
        it("Varmista poisto", () => {
            chai.request(server)
            .get("/ostoskori")
            .end((err, result) => {
                result.should.have.status(200);
                expect(result).body.to.have.lenghtOf(1);
                
            })
             
        })}, timeOut);
         
       }) 
    
       
});
});