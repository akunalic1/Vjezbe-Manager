const express = require('express')
const crypto = require('crypto')
const fs = require('fs')
const bodyParser = require('body-parser')
const app = express();

//!                                             MIDDLEWARES
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static('public/html')); // !ZAMJENITI ZA PATH.JOIN
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
app.listen(PORT);

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
    if(brojVjezbi < 1 || brojVjezbi > 10 )
        odgovor+='brojVjezbi,'
    for(let i in brojZadataka){
        if(brojZadataka[i] < 1 || brojZadataka[i] > 15)
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