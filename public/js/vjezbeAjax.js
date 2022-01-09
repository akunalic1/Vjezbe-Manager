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
}

function posaljiPodatke(vjezbeObjekat, callbackFunkcija){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/vjezbe', false);
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.onreadystatechange = function () {
       /* if (this.readyState == 4 && this.status == 200) {
            callbackFunkcija(null, this.responseText)               // ! todo  provjeriti za parametre funckije
        }else{
            callbackFunkcija(this.responseText , null) 
        }*/
        console.log(this.responseText);
    };
    xhr.onload = function() {
      /*  if (this.readyState == 4 && this.status == 200) {
            callbackFunkcija(null, this.responseText)               // ! todo  provjeriti za parametre funckije
        }else{
            callbackFunkcija(this.responseText , null) 
        }*/
        console.log(this.responseText);
    }
    xhr.send(JSON.stringify(vjezbeObjekat));
}

function dohvatiPodatke(callbackFunkcija){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/vjezbe', false);
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.onreadystatechange = function () {
        console.log(this.responseText);
       callbackFunkcija(null, this.responseText)
    };
    xhr.onload = function() {
        console.log(this.responseText);
      //  callbackFunkcija(error, data)
    }
    xhr.send();
}

function iscrtajVjezbe(divDOMelement, obj){
    console.log('uslo i crta objekat' + JSON.stringify(obj))
    console.log(typeof obj)
    for(let i = 0; i < obj.brojVjezbi; i++){
        let div = document.createElement('div')
        div.classList.add('vjezba')
        div.id =`v${i}`
        div.innerText = `Vjezba ${i+1}`
        let innerDiv = document.createElement('div');
        innerDiv.classList.add('zadaci')
        //div.appendChild(innerDiv)
        iscrtajZadatke(innerDiv,obj.brojZadataka[i])
        div.addEventListener('click', function(){
            iscrtajZadatke(innerDiv, -1)                    // ! HARDKODIRANO
        })
        console.log(divDOMelement)
        divDOMelement.append(div)
        divDOMelement.append(innerDiv)
    }
}

function iscrtajZadatke(divDOMelement, brojVjezbi){
    if(brojVjezbi > 0){
        for(let i = 0; i < brojVjezbi; i++){
            let div = document.createElement('div')
            div.classList.add('zadatak')
            div.id =`z${i}`
            div.innerText = `Zadatak ${i+1}`
            divDOMelement.style.display = 'flex'
            divDOMelement.append(div)
        }    
    }else{
        if(divDOMelement.style.display === 'flex')
            divDOMelement.style.display = 'none';
        else
            divDOMelement.style.display = 'flex';

    }
}
