var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var should = require("chai").should();
var expect = require("chai").expect;

describe('Autentikointi', () => {

it('Sisäänkirjautuminen oikealla käyttäjätunnuksella ja salasanalla', function(done) {
    chai.request('http://localhost:3002') 
        .post('/login')
        .set('Token', 'text/plain')
        .set('content-type', 'application/x-www-form-urlencoded')
        .type('form')
        .send('grant_type=password')
        .send('kayttajatunnus=opettaja')
        .send('salasana=opettaja')
        .end(function(err, res) {
            res.should.have.status(200);
            expect(res).to.redirectTo('http://localhost:3002/');
            done();
        });
});
it('Sisäänkirjautumisen epäonnistuminen väärällä käyttäjätunnuksella ja salasanalla', function(done) {
    chai.request('http://localhost:3002') 
        .post('/login')
        .set('Token', 'text/plain')
        .set('content-type', 'application/x-www-form-urlencoded')
        .type('form')
        .send('grant_type=password')
        .send('kayttajatunnus=opettaj')
        .send('salasana=opettaj')
        .end(function(err, res) {
            expect(res).to.redirectTo('http://localhost:3002/login');
            done();
        });
});

});
