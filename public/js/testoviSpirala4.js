const chai = require('chai')
const chaiHttp = require('chai-http')
let should = require('chai').should();

chai.use(chaiHttp);
let server = require('../../index');
const Grupa = require('../../models/Grupa');
const Student = require('../../models/Student');

describe('Testovi spirale 4', function () {

    function ocistiTabele() {
        Grupa.destroy({
            truncate: true,
        });
        Student.destroy({
            truncate: true,
        });
    }

    describe('Testiranje forme za unos studenta', function () {

        it('[Test 1] Dodavanje prvog studenta', function (done) {
    
            ocistiTabele()
            let s = {
                ime: 'ime',
                prezime: 'prezime',
                index: 12345,
                grupa: 'prva'
            }
            chai.request(server)
                .post('/student')
                .send(s)
                .end(function (err, res) {
                    res.body.status.should.be.eq('Kreiran student')
                    done();
                });
    
    
        });
    
        it('[Test 2] Dodavanje istog studenta', function (done) {
    
            let s = {
                ime: 'ime',
                prezime: 'prezime',
                index: 12345,
                grupa: 'prva'
            }
            chai.request(server)
                .post('/student')
                .send(s)
                .end(function (err, res) {
    
                    res.body.status.should.be.eq('Student sa indeksom 12345 već postoji')
                    ocistiTabele()
                    done()
                });
        })
    })

    describe('Testiranje BATCH (CSV) za unos studenata', function () {
       
        
        it('[Test 3] Dodavanje jednog studenta', function (done) {
            
            ocistiTabele()

            let s = 'ime,prezime,1,grupa'
            chai.request(server)
                .post('/batch/student')
                .set('Content-Type', 'text/plain')
                .send(s)
                .end(function (err, res) {
                    res.body.status.should.be.eq('Dodano 1 studenata!')
                    done();
                });
        });

        it('[Test 4] Dodavanje dva ista studenta', function (done) {
    
            let s = 'ime,prezime,1,grupa\nime,prezime,1,grupa'
            chai.request(server)
                .post('/batch/student')
                .set('Content-Type', 'text/plain')
                .send(s)
                .end(function (err, res) {
                    res.body.status.should.be.eq('Dodano 1 studenata, a studenti 1 već postoje!')
                    done();
                });
            ocistiTabele()   
        })

        it('[Test 5] Dodavanje 10 istih studenta', function (done) {
            ocistiTabele() 
            let s = 'ime,prezime,1,grupa\nime,prezime,1,grupa\nime,prezime,1,grupa\nime,prezime,1,grupa\nime,prezime,1,grupa\nime,prezime,1,grupa\nime,prezime,1,grupa\nime,prezime,1,grupa\nime,prezime,1,grupa\nime,prezime,1,grupa'
            chai.request(server)
                .post('/batch/student')
                .set('Content-Type', 'text/plain')
                .send(s)
                .end(function (err, res) {
                    res.body.status.should.be.eq('Dodano 1 studenata, a studenti 1,1,1,1,1,1,1,1,1 već postoje!')
                    done();
                });
        })

        it('[Test 6] Dodavanje 2 ista i jednog različitog studenta', function (done) {
            ocistiTabele() 
            let s = 'ime,prezime,1,grupa\nime,prezime,1,grupa\nime,prezime,2,grupa'
            chai.request(server)
                .post('/batch/student')
                .set('Content-Type', 'text/plain')
                .send(s)
                .end(function (err, res) {
                    res.body.status.should.be.eq('Dodano 2 studenata, a studenti 1 već postoje!')
                    done();
                });
        })

        it('[Test 7] Dodavanje 2 x 2 ista studenta', function (done) {
            
            ocistiTabele()   
    
            let s = 'ime,prezime,1,grupa\nime,prezime,1,grupa\nime,prezime,2,grupa\nime,prezime,2,grupa'
            chai.request(server)
                .post('/batch/student')
                .set('Content-Type', 'text/plain')
                .send(s)
                .end(function (err, res) {
                    res.body.status.should.be.eq('Dodano 2 studenata, a studenti 1,2 već postoje!')
                    done();
                });
        })

        it('[Test 8] Dodavanje csv-a pogresnog formata 1', function (done) {
            
            ocistiTabele()   
            
            let s = 'ime,prezime,1,\nime,prezime,1,grupa\nime,prezime,2,grupa\nime,prezime,2,grupa'
            chai.request(server)
                .post('/batch/student')
                .set('Content-Type', 'text/plain')
                .send(s)
                .end(function (err, res) {
                    res.body.status.should.be.eq('Nevalidan format csv podataka.')
                    done();
                });
        })

        it('[Test 9]Dodavanje csv-a pogresnog formata 2', function (done) {
            
            ocistiTabele()   
    
            let s = 'ime,prezime,1'
            chai.request(server)
                .post('/batch/student')
                .set('Content-Type', 'text/plain')
                .send(s)
                .end(function (err, res) {
                    res.body.status.should.be.eq('Nevalidan format csv podataka.')
                    done();
                });
        })

        it('[Test 10] Dodavanje csv-a pogresnog formata 3', function (done) {
            
            ocistiTabele()   
    
            let s = 'ime,prezime,adada,adada'
            chai.request(server)
                .post('/batch/student')
                .set('Content-Type', 'text/plain')
                .send(s)
                .end(function (err, res) {
                    res.body.status.should.be.eq('Nevalidan format csv podataka.')
                    done();
                });
        })

        it('[Test 11] Dodavanje csv-a pogresnog formata 4 (prazno)', function (done) {
            
            ocistiTabele()   
    
            let s = ''
            chai.request(server)
                .post('/batch/student')
                .set('Content-Type', 'text/plain')
                .send(s)
                .end(function (err, res) {
                    res.body.status.should.be.eq('Nevalidan format csv podataka.')
                    done();
                });
        })

        it('[Test 12] Dodavanje 10 različitih studenta', function (done) {
            
            ocistiTabele()   
    
            let s = 'ime,prezime,1,grupa\nime,prezime,2,grupa\nime,prezime,3,grupa\nime,prezime,4,grupa\nime,prezime,5,grupa\nime,prezime,6,grupa\nime,prezime,7,grupa\nime,prezime,8,grupa\nime,prezime,9,grupa\nime,prezime,10,grupa'
            chai.request(server)
                .post('/batch/student')
                .set('Content-Type', 'text/plain')
                .send(s)
                .end(function (err, res) {
                    res.body.status.should.be.eq('Dodano 10 studenata!')
                    done();
                });
        })

    })

    describe('Testiranje forme za promjenu grupe studenta', function () {
       
        
        it('[Test 13] Promjena za nepostojeceg studenta', function (done) {
            
            //ocistiTabele()

            let s = {
                grupa : 'nepostojeca grupa'
            }
            chai.request(server)
                .put('/student/' + 12345)
                .send(s)
                .end(function (err, res) {
                    res.body.status.should.be.eq('Student sa indeksom 12345 ne postoji')
                    done();
                });
               
    
        });

        it('[Test 14] Promjena za postojeceg studenta', function (done) {
          
            let s = {
                grupa : 'nova grupa'
            }
            chai.request(server)
                .put('/student/' + 1)
                .send(s)
                .end(function (err, res) {
                    res.body.status.should.be.eq('Promjenjena grupa studentu 1')
                    done();
                });
        });
    })


})