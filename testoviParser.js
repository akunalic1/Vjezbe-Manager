let TestoviParser  = (function(){
    let tacnost = 0, procenat;
    let greske = [];
    const dajTacnost = function(JsonString){
        let obj = JSON.parse(JsonString);
       // console.log(obj);
       let ukupanBrojTestova = obj.stats.tests;
       let brojUspjesnihTestova = obj.stats.passes;
       let brojPalihTestova = obj.stats.failures;
       let brojNeizvrsenihTestova = obj.stats.pending;

       let listaProslihTestova = obj.passes;
       let listaPalihTestova = obj.failures;
       let listaNeizvrsenihtestova = obj.pending;

        console.log("Broj palih: " + Object.keys(listaPalihTestova).length)
        console.log("Broj proslih: " + Object.keys
        (listaProslihTestova).length)
        tacnost = 0.0;
        if(brojUspjesnihTestova != 0)
        tacnost = brojUspjesnihTestova/ukupanBrojTestova;
        
        greske = [];
        
        for(var i = 0; i < brojPalihTestova; i++){
            greske.push(listaPalihTestova[i].title);
        }
        if(brojNeizvrsenihTestova != ukupanBrojTestova)
            for(var i = 0; i < brojNeizvrsenihTestova; i++){
                greske.push(listaNeizvrsenihtestova[i].title);
            }
        else
            greske.push("Testovi se ne mogu izvršiti")
        tacnost = tacnost*100.0;
        if(tacnost % 1 != 0.0)
            tacnost = tacnost.toFixed(1);
        console.log({
            'tacnost': tacnost + "%",
            'greske': JSON.stringify(greske)
        })
        return{
            'tacnost': tacnost + "%",
            'greske': JSON.stringify(greske)
        }
    }
    return {
        dajTacnost
    }
}());

