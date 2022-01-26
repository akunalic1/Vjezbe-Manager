const express = require('express')

const bodyParser = require('body-parser')
const app = express();
const db = require('./db');

const crypto = require('crypto')
const fs = require('fs')

const Student = require('./models/Student');
const Grupa = require('./models/Grupa');
const Vjezba = require('./models/Vjezba');
const Zadatak = require('./models/Zadatak');

//!                                             MIDDLEWARES
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(bodyParser.raw({ inflate: true, limit: '100kb', type: 'text/xml' }));
app.use(express.static('public/html'));
app.use(express.static('public/js'));
app.use(express.static('public/css'));
app.use(express.static('public/images'));

//!                                             PORT
let PORT = 3000;

//!                                             GET
app.get('/', (req, res) => {
    //console.log(req);
    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify({ message: 'Otvorili ste port 3000' }))
})

app.get('/vjezbe/', (req, res) => {
    res.setHeader('contet-type', 'application/json');
    res.status(200);
    Vjezba.findAll().then(vjezbe => {
        let data = vjezbe.map(x => x.brojZadataka)
        console.log(data)
        res.send({
            brojVjezbi: data.length,
            brojZadataka: data
        });
    })
})

//!                                             POST
app.post('/vjezbe', (req, res) => {
    let odgovor = kreirajOdgovor(req.body)
    if (!odgovor.pogresno) {
        Vjezba.findAll().then(vjezbe => {
            for (let i in req.body.brojZadataka) {
                let brZd = parseInt(req.body.brojZadataka[i])
                Vjezba.create({
                    naziv: `Vjezba ${parseInt(i) + 1 + vjezbe.length}`,
                    grupa: null,
                    brojZadataka: brZd
                }).then(v => {
                    for (let j = 0; j < brZd; j++) {
                        console.log(brZd)
                        Zadatak.create({
                            naziv: `Zadatak ${j + 1}`,
                            vjezbaId: v.id
                        })
                    }
                })
            }
        })
        Vjezba.findAll().then(v => res.send(v))
    } else {
        res.status(400).send({
            status: odgovor.status,
            data: odgovor.data
        })
    }
})

//!                                         POST/STUDENT
app.post('/student', (req, res) => {
    let s = req.body;
    let { ime, prezime, index, grupa } = s

    Student.findOne({ where: { 'index': index } })
            .then(t => {
                    if (t != null) {
                        res.status(400).send({ status: `Student sa indeksom ${index} već postoji` });
                    } else {
                        Grupa.findOrCreate({ where: { 'naziv': grupa } })
                             .then((kreirana, uspjesno) => {
                                 kreirana = JSON.parse(JSON.stringify(kreirana[0]))
                                 console.log(kreirana.id)
                                 console.log(typeof kreirana)
                                 let grupaId = kreirana.id
                                 Student.create({ ime, prezime, index, grupa,grupaId})
                                         .then(() => {
                                                 res.send({ status: 'Kreiran student' });
                                         }).catch(e => console.log(e))
                             }

                             ).catch(e => console.log(e))
                           // res.send({ status: 'Kreiran student' });         
        }
    }).catch(e => console.log(e))
})

// !                                            PUT/student/:index
app.put('/student/:index', (req, res) => {
    let grupa = req.body.grupa;
    console.log(grupa)
    console.log(req.params)
    Student.findOne({ where: { 'index': req.params.index } })
        .then(ss => {
            console.log(ss)
            if (ss != null) {
                        console.log('student za update: ' + ss)
                        Grupa.findOne({ where: { 'naziv': grupa } }).then(g => {
                            if(g != null){
                                ss.grupa = g.naziv;
                                ss.grupaId = g.id
                                ss.save();
                                res.send( {status:`promjenjena grupa studentu ${req.params.index}`})
                            }else{
                                Grupa.create({naziv:grupa}).then(ggg => {
                                    ggg = JSON.parse(JSON.stringify(ggg))
                                    ss.grupa = ggg.naziv;
                                    ss.grupaId = ggg.id
                                    ss.save();
                                    res.send( {status:`promjenjena grupa studentu ${req.params.index}`})
                                }).catch()
                            }
                        })
                   
            } else {
                res.status(400).send({ status: `Student sa indeksom ${req.params.index} ne postoji` });
            }
        })
})

// !                    post / batch & student csv
app.post('/batch/student', (req, res) => {
    req.body.toString('utf-8')
    console.log(req.body)
    let data = izdvoji(req.body)
    let { unikati, duplikati } = ukloniDuplikatePoIndexu(data)
    let listaPostojecih = [] //duplikati.map(x => x.index)
    let listaDodanih = []

    if (!data.hasOwnProperty('greska')) {
        Student.findAll().then((studenti) => {
            for (let i = 0; i < data.length; i++) {
                let postojiUBazi = studenti.filter(m => { return m.index === data[i].index }).length != 0
               
                let postojeUDuplikatima = duplikati.filter(x => x.index === data[i].index).length != 0
                let istaDuzina = duplikati.filter(x => x.index === data[i].index).length === listaPostojecih.filter(x => x === data[i].index).length
                
                if (postojiUBazi || postojeUDuplikatima && !istaDuzina) {
                        listaPostojecih.push(data[i].index) 
                }
                else {
                    Student.create(data[i])
                        .then((s) => {
                           
                            Grupa.findOne({ where: { 'naziv': data[i].grupa } })
                                .then(postojeca => {
                                    if(postojeca == null){
                                        console.log(s.grupa)
                                        Grupa.create({'naziv': s.grupa})
                                        .then(kreirana => {
                                            kreirana = JSON.parse(JSON.stringify(kreirana))
                                               console.log('kreirana id ' + kreirana.id)
                                                    s.update({grupaId:kreirana.id})
                                        }).catch(e => {
                                          console.log('student ' + s)
                                        })
                                    }else{
                                        postojeca = JSON.parse(JSON.stringify(postojeca))
                                        
                                         s.update({grupaId: postojeca.id})
                                       // s.save();
                                    }
                                    
                                })

                        }).catch(err => {

                        })
                }
            }

        }).then(() => {
            console.log('------------\nLista postojecih' + listaPostojecih + '\n------------------\n')
  
            let brojSvihStudenata = data.length //4
            let brojDodanihStudenata = brojSvihStudenata - listaPostojecih.length // 4 - 
            if (brojDodanihStudenata < 0) brojDodanihStudenata = 0
            if (brojDodanihStudenata === brojSvihStudenata)
                res.send({ status: `Dodano ${brojSvihStudenata} studenata` })
            else
                res.send({ status: `Dodano ${brojDodanihStudenata} studenata, a studenti ${listaPostojecih} već postoje!` })
        })
    } else {
        res.send({ status: data.greska })
    }
})


// !                                            Port
app.listen(PORT);

//!                                             FUNCTIONS

function izdvoji(data) {
    let lista = [];
    let regex = '\n';
    if (data.toString().includes('\r\n'))
        regex = '\r\n';
    let redovi = (data.toString()).split(regex);

    for (let red of redovi) {
        let podaci = red.split(',');
        console.log(isNaN(Number(podaci[2])))
        if (podaci.length != 4 || typeof podaci[0] != 'string' || isNaN(Number(podaci[2])) || typeof podaci[1] != 'string' || typeof podaci[3] != 'string' || podaci[0].length === 0 || podaci[0].length === 0 || podaci[1].length === 0 || podaci[3].length === 0)
            return {
                greska: 'Nevalidan format csv podataka.'
            }
        let objekat = {
            'ime': red.split(',')[0],
            'prezime': red.split(',')[1],
            'index': parseInt(red.split(',')[2]),
            'grupa': red.split(',')[3]
        }
        lista.push(objekat);
    }
    // lista.pop();
    return lista;
}

function kreirajOdgovor(responseBody) {
    let brojVjezbi = responseBody.brojVjezbi;
    let brojZadataka = responseBody.brojZadataka;
    let odgovor = '';
    if (brojVjezbi < 1 || brojVjezbi > 15)
        odgovor += 'brojVjezbi,'
    for (let i in brojZadataka) {
        if (brojZadataka[i] < 1 || brojZadataka[i] > 10)
            odgovor += 'z' + i + ','
    }
    console.log('broj zadataka i vjezbi = ' + brojZadataka + ' ' + brojVjezbi)
    if (brojZadataka.length != brojVjezbi)
        odgovor += 'brojZadataka,'
    let pogresno = odgovor.length != 0;
    if (pogresno) {
        odgovor = 'Pogrešan parametar ' + odgovor;
        odgovor = odgovor.substring(0, odgovor.length - 1);
    }
    return {
        "pogresno": pogresno,
        status: 'error',
        data: odgovor
    }
}

function ukloniDuplikatePoIndexu(data) {
    let unikati = [], duplikati = []
    for (let i = 0; i < data.length; i++) {
        if (unikati.filter(item => item.index === data[i].index).length != 0)
            duplikati.push(data[i])
        else
            unikati.push(data[i])
    }
    return { unikati, duplikati };
}
// !                    Test DB
//db.sync({ force: true });
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch((err) => console.log(err))
