let StudentAjax = (function () {

    const poruka = document.getElementById('ajaxstatus')

    const dodajStudenta = function (student, callbackFunction) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/student', false);
        xhr.setRequestHeader("Content-Type", "application/json");
     
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (form != null) {
                    poruka.innerHTML = JSON.parse(this.responseText).status
                    poruka.classList.remove('red')
                    poruka.classList.add('green')
                }
                callbackFunction(null, this.responseText)
            } else if (this.readyState == 4) {
                if (form != null) {
                    poruka.classList.remove('green')
                    poruka.classList.add('red')
                    poruka.innerHTML = JSON.parse(this.responseText).status
                }
                callbackFunction(this.responseText, null)
            }
        };
        xhr.send(JSON.stringify(student));
    }

    const postaviGrupu = function (index, grupa, callbackFunction) {  
        var xhr = new XMLHttpRequest();
        
       xhr.open('PUT', `/student/${index}`, false);
      xhr.setRequestHeader('Content-type', 'application/json');
     
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (form != null) {
                    poruka.innerHTML = JSON.parse(this.responseText).status
                    poruka.classList.remove('red')
                    poruka.classList.add('green')
                }
                callbackFunction(null, this.responseText)
            } else if (this.readyState == 4) {
                if (form != null) {
                    poruka.classList.remove('green')
                    poruka.classList.add('red')
                    poruka.innerHTML = JSON.parse(this.responseText).status
                }
                callbackFunction(this.responseText, null)
            }
        };
        xhr.send(JSON.stringify({'grupa':grupa}));
        //xhr.send(JSON.stringify({'grupa':grupa}));
    }

    const dodajBatch = function (csvStudenti, callbackFunction) {
        var xhr = new XMLHttpRequest();
      
        xhr.open('POST', `/batch/student`, false);
       // xhr.setRequestHeader('Content-type', 'text/csv');
      
         xhr.onreadystatechange = function () {
             if (this.readyState == 4 && this.status == 200) {
                 if (form != null) {
                     poruka.innerHTML = JSON.parse(this.responseText).status
                     poruka.classList.remove('red')
                     poruka.classList.add('green')
                 }
                 callbackFunction(null, this.responseText)
             } else if (this.readyState == 4) {
                 if (form != null) {
                     poruka.classList.remove('green')
                     poruka.classList.add('red')
                     poruka.innerHTML = JSON.parse(this.responseText).status
                 }
                 callbackFunction(this.responseText, null)
             }
         };
         xhr.send(csvStudenti);
    }

   

    return {
        dodajStudenta, 
        dodajBatch,
        postaviGrupu
    }
})();