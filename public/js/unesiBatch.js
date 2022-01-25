const csvPolje = document.getElementById('csv')
const posaljiCsvBtn = document.getElementById('btn')

posaljiCsvBtn.addEventListener('click', function(){
    console.log('kokokoko')
    StudentAjax.dodajBatch(csvPolje.value, function(err, data){})
})