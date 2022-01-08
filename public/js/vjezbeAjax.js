function dodajInputPolja(DOMelementDIVauFormi, brojVjezbi){
    DOMelementDIVauFormi.empty();
     for(let i = 0; i < brojVjezbi; i++){
         console.log(i);
         let div = document.createElement('div');
         div.innerHTML = `<label for="z${i}">Unesite broj zadataka za vjezbu ${i+1}:</label>` + `<input type="number" name="z${i}" id="z${i}">`;
         $('#polja').append(div);
     }

     $('#polja').append('<button id="submitBtn" type="submit">Pošalji zadatke</button>');
}

function konzola(){
    console.log('Pozvano iz moj jsa')
}