var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var should = require("chai").should();



chai.use(chaiHttp);


describe('Tarvikkeet API', () => {

    //GET Testi
    describe("GET /tarvikkeet", () =>{
        it("Hakee kaikki tarvikkeet", ()=>{
            chai.request(server)
                .get('/tarvikkeet')
                .end((err, res) => {
                    res.should.have.status(200);
                    should.exist(res.body);                       
                
                });
        });  
        it("EI HAE tarvikkeita", ()=>{
            chai.request(server)
                .get('/tarvikkeeet')
                .end((err, res) => {
                    res.should.have.status(404);                   
                });
        });                
    });

    //GET Testi (id:llä)

    describe("GET /tarvikkeet/:id", () =>{
        it("Hakee tarvikkeen id:llä 1", ()=>{
            chai.request(server)
                .get("/tarvikkeet?tarvikeID=" + "1")
                .end((err, res) => {
                    res.should.have.status(200);
                    should.exist(res.body);                       
                
                });
        });  
        it("EI HAE tarvikkeita id:llä", ()=>{
            chai.request(server)
                .get("/tarvikkeeet?tarvikeID=" + "1")
                .end((err, res) => {
                    res.should.have.status(404);                   
                });
        });                
    });

    //POST Testi

    //PUT Testi

    //DELETE Testi

   
});
