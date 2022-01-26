const index = document.getElementById('index')
const grupa = document.getElementById('grupa')
const promjenigrupuBtn = document.getElementById('btn')

promjenigrupuBtn.addEventListener('click', function(){
    if(index.value.length != 0 && grupa.value.length != 0)
    StudentAjax.postaviGrupu(index.value, grupa.value, function(err, data){})
})
