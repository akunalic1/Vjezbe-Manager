function dodajInputPolja(DOMelementDIVauFormi, brojVjezbi){
    DOMelementDIVauFormi.innerHTML = ''
    console.log(typeof DOMelementDIVauFormi)
     for(let i = 0; i < brojVjezbi; i++){
        // console.log(i);
         let div = document.createElement('div');
         div.innerHTML = `<label for="z${i}">Unesite broj zadataka za vjezbu ${i+1}:</label>` + `<input type="number" name="z${i}" id="z${i}" value="4">`;
         div.getElementsByTagName('input').value = 4;
         $('#polja').append(div);
     }

    // $('#polja').append('<button id="submitBtn" type="submit">Pošalji zadatke</button>');
}
//Parametar error sadrži tekst greške ili null ako je ispravno, a data sadrži podatke okreiranoj vježbi ili null ako je bilo greške.
function posaljiPodatke(vjezbeObjekat, callbackFunkcija){
    console.log('funkcija')
    console.log('poslan objekat' + (JSON.stringify(vjezbeObjekat)))
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/vjezbe', false);
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.onreadystatechange = function () {
        // do something to response
        console.log('---------onreadystatechange---------------')
     //   console.log(this.responseText.);
        console.log(this.readyState);
        console.log(this.status);
        console.log('0: request not initialized\n1: server connection established\n2: request received\n3: processing request\n4: request finished and response is ready')
       // xhr.send(JSON.stringify(vjezbeObjekat));
    };
    xhr.onload = function() {
        console.log('---------onload---------------')
      //  console.log(this.responseText);
        console.log(this.readyState);
        console.log(this.status);
        console.log('0: request not initialized\n1: server connection established\n2: request received\n3: processing request\n4: request finished and response is ready')
    }
    
    xhr.send(JSON.stringify(vjezbeObjekat));
}


