const polja = document.getElementById('polja')
const btn = document.getElementById('btn')
const submitBtn = document.getElementById('submitBtn')
const unosBrojVjezbi = document.getElementById('unosBrojVjezbi')


btn.addEventListener('click', function(){
    console.log( typeof VjezbeAjax)
    VjezbeAjax.dodajInputPolja(polja, unosBrojVjezbi.value);
})

submitBtn.addEventListener('click', function(){
    let objekat = kreirajObjekat( unosBrojVjezbi.value,polja)
    
    VjezbeAjax.posaljiPodatke(objekat, function(error, data){})
    return false;
})

function kreirajObjekat(brojVjezbi, divPolja){
    let children = divPolja.children;
    let lista = []
        for(var i=0; i<children.length; i++){
            console.log(children[i].children[1].value);
            lista.push(children[i].children[1].value)
        }
    return {
        'brojVjezbi': brojVjezbi,
        'brojZadataka': lista
    }
}

