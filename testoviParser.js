
let TestoviParser  = (function(){
    var tacnost = 0, procenat, greske = [];
    const dajTacnost = function(JsonString){
        var obj = JSON.parse(JsonString);
        console.log(obj);
        var listaProslihTestova = obj.passes;
        var listaPalihTestova = obj.failures;
        
        if(Object.keys(listaProslihTestova).length != 0)
        tacnost = (Object.values(listaProslihTestova).length + Object.keys(listaPalihTestova).length)/(Object.keys(listaProslihTestova).length);
        
       
        for(var i = 0; i < Object.keys(listaPalihTestova).length; i++){
            console.log(listaPalihTestova[i].title)
            greske.push(listaPalihTestova[i].title);
        }
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
TestoviParser.dajTacnost("{\"stats\":{\"suites\":2,\"tests\":2,\"passes\":2,\"pending\":0,\"failures\":0,\"start\":\"2021-11-05T15:00:26.343Z\",\"end\":\"2021-11-05T15:00:26.352Z\",\"duration\":9},\"tests\":[{\"title\":\"should draw 3 rows when parameter are 2,3\",\"fullTitle\":\"Tabela crtaj() should draw 3 rows when parameter are 2,3\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"should draw 2 columns in row 2 when parameter are 2,3\",\"fullTitle\":\"Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"pending\":[],\"failures\":[],\"passes\":[{\"title\":\"should draw 3 rows when parameter are 2,3\",\"fullTitle\":\"Tabela crtaj() should draw 3 rows when parameter are 2,3\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"should draw 2 columns in row 2 when parameter are 2,3\",\"fullTitle\":\"Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}]}");
