let VjezbeAjax = (function(){
    let listaVjezbi = []
    const poruka = document.createElement('div');
    poruka.id='poruka'
   const form = document.getElementById('form')
   if( form != null)
    form.appendChild(poruka);
    const dodajInputPolja = function(DOMelementDIVauFormi, brojVjezbi){
        if(brojVjezbi > 0 && brojVjezbi <= 15){
            DOMelementDIVauFormi.innerHTML = ''
            console.log(typeof DOMelementDIVauFormi)
            for(let i = 0; i < brojVjezbi; i++){
                // console.log(i);
                let div = document.createElement('div');
                div.innerHTML = `<label for="z${i}">Unesite broj zadataka za vjezbu ${i+1}:</label>` + `<input type="number" name="z${i}" id="z${i}" value="4">`;
                div.getElementsByTagName('input').value = 4;
                DOMelementDIVauFormi.append(div);
            }
        }
    }
    
    const posaljiPodatke = function(vjezbeObjekat, callbackFunkcija){
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/vjezbe', false);
        xhr.setRequestHeader("Content-Type", "application/json");
        
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
               if(form != null){
                   poruka.innerHTML = 'Vasi podaci su sacuvani'
                   poruka.classList.remove('red')
                    poruka.classList.add('green')
               }
                callbackFunkcija(null, this.responseText)           
            }else if(this.readyState == 4){
                if(form != null){
                    poruka.classList.remove('green')
                    poruka.classList.add('red')
                    poruka.innerHTML = 'Pogresno ste unjeli podatke'
                }
                callbackFunkcija(this.responseText , null) 
            }
        };
        xhr.send(JSON.stringify(vjezbeObjekat));
    }
    
    const dohvatiPodatke = function(callbackFunkcija){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/vjezbe', false);
        xhr.setRequestHeader("Content-Type", "application/json");
        
        xhr.onreadystatechange = function () {
            console.log(this.responseText);
            if (this.readyState == 4 && this.status == 200) {
                callbackFunkcija(null, this.responseText)               
            }else if(this.readyState == 4){
                callbackFunkcija(this.responseText , null) 
            }
        };
        xhr.onload = function() {
            console.log(this.responseText);
        }
        xhr.send();
    }
    
    const iscrtajVjezbe = function(divDOMelement, obj){
        if(obj.brojVjezbi == obj.brojZadataka.length && obj.brojZadataka.every(it=> it > 0) && obj.brojVjezbi <=15 && obj.brojZadataka.length <=10){
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
                    iscrtajZadatke(innerDiv, -1)
                })
                listaVjezbi.push(innerDiv)
                divDOMelement.append(div)
                divDOMelement.append(innerDiv)
            }
        }
    }
    const iscrtajZadatke = function(divDOMelement, brojVjezbi){
        if(brojVjezbi > 0){
            for(let i = 0; i < brojVjezbi; i++){
                let div = document.createElement('div')
                div.classList.add('zadatak')
                 div.id =`z${i}`
                div.innerText = `Zadatak ${i+1}`
                divDOMelement.style.display = 'none'
                divDOMelement.append(div)
            }    
        }else{
            for(let ii in listaVjezbi){
                if(listaVjezbi[ii].style.display === 'flex'){
                    listaVjezbi[ii].style.display = 'none'
                    console.log('kliknuto' + ii)
                }
            }
            if(divDOMelement.style.display === 'flex')
                divDOMelement.style.display = 'none';
            else
                divDOMelement.style.display = 'flex';
        }
    }

    return { dodajInputPolja,iscrtajZadatke,posaljiPodatke,dohvatiPodatke,iscrtajVjezbe}
})();
