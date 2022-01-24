const ime = document.getElementById('ime')
const prezime = document.getElementById('prezime')
const index = document.getElementById('index')
const grupa = document.getElementById('grupa')
const dodajStudentaBtn = document.getElementById('btn')

dodajStudentaBtn.addEventListener('click', function(){
    let data = {
        'ime': ime.value,
        'prezime': prezime.value,
        'index': index.value,
        'grupa': grupa.value
    }
    console.log('---------------- data ---------------')
    console.log(data)    
   
    StudentAjax.dodajStudenta(data, function(err, data){})
})
