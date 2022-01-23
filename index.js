const express = require('express')
const crypto = require('crypto')
const fs = require('fs')
const bodyParser = require('body-parser')
const app = express();
const db = require('./db');
const Student = require('./models/Student');
const Grupa = require('./models/Grupa');
const { type } = require('express/lib/response');
//!                                             MIDDLEWARES
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json())
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
    let data = procitajVjezbeCSV()
    console.log(data)
    res.send({
        brojVjezbi: data.length,
        brojZadataka: data
    });
})

//!                                             POST
app.post('/vjezbe', (req, res) => {
  let odgovor = kreirajOdgovor(req.body)
  console.log('odgvor u post' +  JSON.stringify(odgovor))
    if(!odgovor.pogresno){
        zapisiUCSV(req.body.brojZadataka)
        res.send(procitajVjezbeCSV())
    }else{
        res.status(400).send({
            status: odgovor.status,
            data: odgovor.data
        })
    }
})

//!                                         POST/STUDENT
app.post('/student', (req, res) => {
    let s = req.body;
    let {ime, prezime, index, grupa} = s
    
    Student.findAll({where: {'index':index}}).then(t => {
        if(t.length != 0){
            res.send({status:`Student sa indeksom ${index} već postoji`});
        }else{
            Student.create({ime,prezime,index,grupa}).then(ss => console.log(ss)).catch(e => console.log(e))
            Grupa.findAll({where:{'naziv': grupa}}).then(tt => {
                if(tt.length == 0)
                Grupa.create({grupa}).then(ss => console.log(s)).catch(e => console.log(e))
                res.send({status: 'Kreiran student'});
        })}
    }).catch(e => console.log(e))
})
app.listen(PORT);

 function provjeriImaLi(index){
    let data =  Student.findAll({where: {'index':index}})
    console.log('podaci ' +  data)
    return data.length != 0
}
//!                                             FUNCTIONS

function procitajVjezbeCSV() {
    return izdvoji(fs.readFileSync('vjezbe.csv', 'utf-8'));
}
function izdvoji(data) {
    let lista = [];
    let redovi = (data.toString()).split('\r\n');
    let prviRed = true;
    for (let red of redovi) {
        lista.push(parseInt(red.split(',')[1]));
    }
    lista.pop();
    return lista;
}
function zapisiUCSV(brojVjezbi){
    let data = '';
    for(let ii in brojVjezbi){
        data+= crypto.randomBytes(3).toString('hex') + ',' + brojVjezbi[ii] + '\r\n';
    }
    fs.writeFileSync('vjezbe.csv', data)
}
function kreirajOdgovor(responseBody){
    let brojVjezbi = responseBody.brojVjezbi;
    let brojZadataka = responseBody.brojZadataka;
    let odgovor = '';
    if(brojVjezbi < 1 || brojVjezbi > 15 )
        odgovor+='brojVjezbi,'
    for(let i in brojZadataka){
        if(brojZadataka[i] < 1 || brojZadataka[i] > 10)
        odgovor+='z' + i + ','
    }
    console.log('broj zadataka i vjezbi = ' + brojZadataka + ' ' + brojVjezbi)
    if(brojZadataka.length != brojVjezbi)
        odgovor+='brojZadataka,'
    let pogresno = odgovor.length != 0;
    if(pogresno){
        odgovor = 'Pogrešan parametar ' + odgovor;
        odgovor = odgovor.substring(0, odgovor.length - 1);
    }
    return {
        "pogresno": pogresno,
        status: 'error',
        data: odgovor
    }
}

// !                    Test DB
db.authenticate()
.then(() => console.log('Database connected...'))
.catch((err) => console.log(err))

db.sync();