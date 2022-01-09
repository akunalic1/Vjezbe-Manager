const express = require('express')
const crypto = require('crypto')
const fs = require('fs')
const bodyParser = require('body-parser')
const app = express();

// middlewares
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static('public'));
app.use(express.static('public/html'));
app.use(express.static('public'));

//Serves all the request which includes /images in the url from Images folder
//app.use('/images', express.static(__dirname + '/Images'));

//  ?port
let PORT = 3000;

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
app.post('/vjezbe', (req, res) => {
  //  res.setHeader('content-type', 'application/json')
    console.log('u post zahtjevu sam')
    console.log(typeof req.body)
    let odgovor = kreirajOdgovor(req.body)
    if(!odgovor.pogresno){
        zapisiUCSV(req.body.brojZadataka)
        res.send(procitajVjezbeCSV())
    }else{
        res.send({
            status: odgovor.status,
            data: odgovor.data
        })
    }
})
app.listen(PORT);

//  ?pomocne funkcije

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
    console.log('kreiran odgovor' + JSON.stringify(responseBody))
    let brojVjezbi = responseBody.brojVjezbi;
    let brojZadataka = responseBody.brojZadataka;
    let odgovor = '';
    if(brojVjezbi < 1 || brojVjezbi > 10)
        odgovor+='brojVjezbi,'
    if(brojZadataka.length != brojVjezbi)
        odgovor+='brojZadataka,'
    for(let i in brojZadataka){
        if(brojZadataka[i] < 1 || brojZadataka[i] > 15)
            odgovor+='z' + i + ','
    }
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