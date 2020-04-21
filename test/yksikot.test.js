    var chai = require("chai");
    var chaiHttp = require("chai-http");
    var server = require("../server");
    var should = require("chai").should();
    var expect = require("chai").expect;
    var sleep = require("sleep");



    chai.use(chaiHttp);

    
    describe('Yksikot API', () => {
        describe("Poista kaikki", ()=>{
            it("Poistaa kaikki", ()=>{
                chai.request(server)
                .delete("/yksikot")
                .send({})
                .end((err, res)=>{
                    res.should.have.status(200);
                })
            })
        })

        describe("POST /yksikot", () =>{
            var yksikko =[{
                "yksikkoID": "12345",
                "nimi": "test"
            }, {
                "yksikkoID": "123456",
                "nimi": "test2"
            }]
            it("Lisää yksikko", () =>{
                for (yksikko in yksikko){
                    chai.request(server)
                    .post("/yksikot")
                    .send(yksikko[yksikko])
                    .end((err, res) => {
                        res.should.have.status(200);
                    })
                }
            })
        })

        describe("GET /yksikot", () =>{
            it("Hakee kaikki yksiköt", ()=>{
                chai.request(server)
                    .get('/yksikot')
                    .end((err, res) => {
                        res.should.have.status(200);
                        should.exist(res.body);                       
                    
                    });
            });  
               
        });


        describe("GET /yksikot/:id", () =>{
            it("Hakee yksikön id:llä", ()=>{
                chai.request(server)
                    .get("/yksikot?yksikkoID=" + "12345")
                    .end((err, res) => {
                        res.should.have.status(200);
                        should.exist(res.body);                       
                    
                    });
            });  
               
        });

        describe("PUT /yksikot", () => {

            it("Päivittää yhden tiedon", () => {
                chai.request(server)
                .get("/yksikot?yksikkoID=" + "12345")
                .end((err, result) => {
                    result.should.have.status(200);
                })
            })

            it("Päivitys valmis", () => {
                chai.request(server)
                .get("/yksikot?yksikkoID=" + "12345")
                .end((err, result) => {
                    result.should.have.status(200);
                    result.body.data.nimi.should.equal("test");
                })
            })
        })

        describe("DELETE /yksikot", () => {

            it("Poistaa yhden", () => {
                chai.request(server)
                .delete("/yksikot?yksikkoID=" + "12345")
                .end((err, result) => {
                    result.should.have.status(200);
                })
            })

            it("Varmista poisto", () => {
                chai.request(server)
                .get("/yksikot")
                .end((err, result) => {
                    result.should.have.status(200);
                    expect(result).body.to.have.lenghtOf(1);
                })
            })
        })
    
    });


  