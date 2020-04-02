    var chai = require("chai");
    var chaiHttp = require("chai-http");
    var server = require("../server");
    var should = require("chai").should();



    chai.use(chaiHttp);

    
    describe('Yksikot API', () => {

        //GET Testi
        describe("GET /yksikot", () =>{
            it("Hakee kaikki yksiköt", ()=>{
                chai.request(server)
                    .get('/yksikot')
                    .end((err, res) => {
                        res.should.have.status(200);
                        should.exist(res.body);                       
                    
                    });
            });  
            it("EI HAE yksiköitä", ()=>{
                chai.request(server)
                    .get('/yksikoot')
                    .end((err, res) => {
                        res.should.have.status(404);                   
                    });
            });                
        });

        //GET Testi (id:llä)

        describe("GET /yksikot/:id", () =>{
            it("Hakee yksikön id:llä 1", ()=>{
                chai.request(server)
                    .get("/yksikot?yksikkoID=" + "1")
                    .end((err, res) => {
                        res.should.have.status(200);
                        should.exist(res.body);                       
                    
                    });
            });  
            it("EI HAE yksiköitä id:llä", ()=>{
                chai.request(server)
                    .get("/yksikoot?yksikkoID=" + "1")
                    .end((err, res) => {
                        res.should.have.status(404);                   
                    });
            });                
        });

        //POST Testi

        //PUT Testi

        //DELETE Testi

       
    });

  