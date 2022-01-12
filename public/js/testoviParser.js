let TestoviParser = (function () {
    /**
     * !                                   dajTacnost(string)
     */
    const dajTacnost = function (JsonString) {
      let tacnost = 0,
        greske = [];
        try {
          JSON.parse(JsonString);
      } catch (e) {
        return{
          'tacnost': "0%",
          'greske': ["Testovi se ne mogu izvršiti"]
        }
      }
  
      let obj = JSON.parse(JsonString);
  
      let ukupanBrojTestova = obj.stats.tests;
      let brojUspjesnihTestova = obj.stats.passes;
      let brojPalihTestova = obj.stats.failures;
      let brojNeizvrsenihTestova = obj.stats.pending;
  
      let listaPalihTestova = obj.failures;
      let listaNeizvrsenihtestova = obj.pending;
  
      // tacnost = 0.0;
      if (brojUspjesnihTestova != 0)
        tacnost = brojUspjesnihTestova / ukupanBrojTestova;
  
      greske = [];
  
      for (var i = 0; i < brojPalihTestova; i++) {
        greske.push(listaPalihTestova[i].title);
      }
      if (brojNeizvrsenihTestova != ukupanBrojTestova)
        for (var i = 0; i < brojNeizvrsenihTestova; i++) {
          greske.push(listaNeizvrsenihtestova[i].title);
        }
      else greske.push("Testovi se ne mogu izvršiti");
      tacnost = tacnost * 100.0;
      if (tacnost % 1 != 0.0) tacnost = tacnost.toFixed(1);
      console.log(
        JSON.stringify({
          tacnost: tacnost + "%",
          greske: greske,
        })
      );
      return {
        tacnost: tacnost + "%",
        greske: greske,
      };
    };
    /**
     * !                                   porediRezultate(string, string)
     */
    const porediRezultate = function (rezultat1, rezultat2) {
      var promjena;
      let greske = [];
  
      let obj1 = JSON.parse(rezultat1);
      let obj2 = JSON.parse(rezultat2);
     
      let greske1 = Object.values(obj1.failures);
      let greske2 = Object.values(obj2.failures);
  
      let svitestovi = obj1.tests;
      let nasloviSvihTestovaRezultata1=[];
      Object.values(obj1.tests).forEach((e)=>{nasloviSvihTestovaRezultata1.push(e.fullTitle);})
  
    
      let nasloviSvihTestovaKojiPadajuUReultatu1=[];
      greske1.forEach((e)=>{nasloviSvihTestovaKojiPadajuUReultatu1.push(e.fullTitle);})
      
      let nasloviSvihTestovaRezultata2=[];
      Object.values(obj2.tests).forEach((e)=>{nasloviSvihTestovaRezultata2.push(e.fullTitle);})
      
      let nasloviSvihTestovaKojiPadajuUReultatu2=[];
      greske2.forEach((e)=>{nasloviSvihTestovaKojiPadajuUReultatu2.push(e.fullTitle);})
  
      let brojTestovaURez2 = obj2.stats.tests;
      let brojTestovaKojiPadajuURez2 = obj2.stats.failures
      if (
        nasloviSvihTestovaRezultata1.every((item) => nasloviSvihTestovaRezultata2.includes(item)) &&
        nasloviSvihTestovaRezultata2.every((item) => nasloviSvihTestovaRezultata1.includes(item))
      ) {
        promjena = TestoviParser.dajTacnost(rezultat2).tacnost;
        greske = nasloviSvihTestovaKojiPadajuUReultatu2;
        greske.sort(function (a, b) {
          return a.localeCompare(b);
        });
      } else {
        let difference1 = nasloviSvihTestovaKojiPadajuUReultatu1.filter((x) => !nasloviSvihTestovaRezultata2.includes(x));
        let difference2 = nasloviSvihTestovaKojiPadajuUReultatu2.filter((x) => !nasloviSvihTestovaRezultata2.includes(x));
  
        difference1.sort(function (a, b) {
          return a.localeCompare(b);
        });
        difference2.sort(function (a, b) {
          return a.localeCompare(b);
        });
        if(difference1 != null) greske = greske.concat(difference1);
        if(difference2 != null) greske = greske.concat(difference2);
        promjena =
          ((difference1.length + brojTestovaKojiPadajuURez2) /
            (difference1.length + brojTestovaURez2)) *
            100;
      }
      if(parseFloat(promjena) %1 != 0.0)
      promjena = parseFloat(promjena).toFixed(1);
      else
        promjena = parseInt(promjena)
      console.log(
        JSON.stringify({
          promjena: parseFloat(promjena) + "%",
          greske: greske,
        })
      );
      return {
        'promjena': promjena + "%",
        'greske': greske,
      };
    };
    return {
      dajTacnost,
      porediRezultate,
    };
  })();
  