const express = require('express')
const bodyParser = require('body-parser')

const app = express();

// middlewares
app.use(bodyParser.urlencoded())
app.use(express.static('public'));
app.use(express.static('public/html'));

//Serves all the request which includes /images in the url from Images folder
//app.use('/images', express.static(__dirname + '/Images'));

//port
let PORT = 3000;

app.get('/',(req, res) => {
    //console.log(req);
    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify({message: 'Otvorili ste port 3000'}))
})

app.listen(PORT);