let TestoviParser = (function () {
  let tacnost = 0,
    procenat;
  let greske = [];
  const dajTacnost = function (JsonString) {
    let obj = JSON.parse(JsonString);
    //console.log(JsonString);
    let ukupanBrojTestova = obj.stats.tests;
    let brojUspjesnihTestova = obj.stats.passes;
    let brojPalihTestova = obj.stats.failures;
    let brojNeizvrsenihTestova = obj.stats.pending;

    let listaProslihTestova = obj.passes;
    let listaPalihTestova = obj.failures;
    let listaNeizvrsenihtestova = obj.pending;

    tacnost = 0.0;
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
  const porediRezultate = function (rezultat1, rezultat2) {
    var promjena;
    let greske = [];

    let obj1 = JSON.parse(rezultat1);
    let obj2 = JSON.parse(rezultat2);

    let greske1 = Object.values(obj1.greske);
    let greske2 = Object.values(obj2.greske);
    if (
      greske1.every((item) => greske2.includes(item)) &&
      greske2.every((item) => greske1.includes(item))
    ) {
      promjena = JSON.parse(rezultat2).tacnost;
    } else {
      let difference = greske1.filter((x) => !greske2.includes(x));
      promjena =
        ((difference.length + greske2.length) /
          (difference.length +
            (greske2.length * 100) / parseInt(100 - rezultat2.tacnost))) *
        100;
    }
    if (
      greske1.every((item) => greske2.includes(item)) &&
      greske2.every((item) => greske1.includes(item))
    ) {
      greske = greske2;
      greske.sort(function (a, b) {
        return a.localeCompare(b);
      });
    } else {
      let difference1 = greske1.filter((x) => !greske2.includes(x));
      let difference2 = greske2.filter((x) => !greske1.includes(x));

      difference1.sort(function (a, b) {
        return a.localeCompare(b);
      });
      difference2.sort(function (a, b) {
        return a.localeCompare(b);
      });
      greske = [];
      greske = greske.concat(difference1);
      greske = greske.concat(difference2);
      let procenatNespjehaRezultata2 = (100 - parseFloat(obj2.tacnost)) / 100.0;
      let brojTestovaRez2 = Math.round(
        greske2.length / procenatNespjehaRezultata2
      );
      if (procenatNespjehaRezultata2 > 100) procenatNespjehaRezultata2 = 100;
      promjena =
        ((difference1.length + greske2.length) /
          (difference1.length + brojTestovaRez2)) *
          100 +
        "%";
    }
    console.log(
      JSON.stringify({
        promjena: promjena,
        greske: greske,
      })
    );
    return {
      promjena: promjena,
      greske: greske,
    };
  };
  return {
    dajTacnost,
    porediRezultate,
  };
})();
