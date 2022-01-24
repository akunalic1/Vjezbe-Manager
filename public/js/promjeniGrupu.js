const index = document.getElementById('index')
const grupa = document.getElementById('grupa')
const promjenigrupuBtn = document.getElementById('btn')

promjenigrupuBtn.addEventListener('click', function(){
    StudentAjax.postaviGrupu(index.value, grupa.value, function(err, data){})
})
