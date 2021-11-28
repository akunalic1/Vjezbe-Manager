let assert = chai.assert;
describe('TestoviParser', function() {
 describe('porediRezultate()', function() {
   it('---TEST 1---', function() {
    console.log("--------------TEST 1---_-------------")
     let objekat = TestoviParser.porediRezultate(stringTest1PR, stringTest1PR)
     assert.equal(Object.keys(objekat.greske).length, 0,"Broj gresaka");
   });
   it('---TEST 2---', function() {
    console.log("--------------TEST 2---_-------------")
    let objekat = TestoviParser.porediRezultate(stringTest1PR, stringTest2PR)
    assert.equal(Object.keys(objekat.greske).length, 0,"Broj gresaka");
    assert.equal(objekat.promjena, "0%","Promjena");
  });
  it('---TEST 3---', function() {
    console.log("--------------TEST 3---_-------------")
    let objekat = TestoviParser.porediRezultate(stringTest2PR, stringTest3PR)
    assert.equal(Object.keys(objekat.greske).length, 2,"Broj gresaka");
    assert.equal(objekat.promjena, "66.7%", "Promjena")
  });
  it('---TEST 4---', function() {
    console.log("--------------TEST 4---_-------------")
    let objekat = TestoviParser.porediRezultate(stringTest3PR, stringTest2PR)
    assert.equal(Object.keys(objekat.greske).length, 0,"Broj gresaka");
    assert.equal(objekat.promjena, "100%", "Promjena")
  });
  it('---TEST 5---', function() {
    console.log("--------------TEST 5---_-------------")
    let objekat = TestoviParser.porediRezultate(stringTest2PR, stringTest4PR)
    assert.equal(Object.keys(objekat.greske).length, 6,"Broj gresaka");
    assert.equal(objekat.promjena, "0%", "Promjena")
  });
  it('---TEST 6---', function() {
    console.log("--------------TEST 6---_-------------")
    let objekat = TestoviParser.porediRezultate(string4padaju2prolaze, string2prolaze4padaju)
    assert.equal(Object.keys(objekat.greske).length, 4,"Broj gresaka");
    assert.equal(objekat.promjena, "33.3%", "Promjena")
  });
  it('---TEST 7---', function() {
    console.log("--------------TEST 7---_-------------")
    let objekat = TestoviParser.porediRezultate(string4padaju2prolaze, string7testova3prolaze4padaju)
    assert.equal(Object.keys(objekat.greske).length, 0,"Broj gresaka");
    assert.equal(objekat.promjena, "57.1%", "Promjena")
  });
 });
});

{/*
    //Jedan string za oba parametra
    var stringTest1PR = "{\"tacnost\":\"50%\",\"greske\":[\"test failed (3)\",\"test failed (4)\"]}"

    //Razlicit redoslijed testova
    var stringTest2PR = "{\"tacnost\":\"50%\",\"greske\":[\"test 1\",\"test 2\"]}";

    var stringTest3PR = "{\"tacnost\":\"50%\",\"greske\":[\"test 2\",\"test 1\"]}";
    
    //Novi string
    var stringTest4PR = "{\"tacnost\":\"66.6%\",\"greske\":[\"test 1\"]}";
    
    //Problem
    var stringTest5PR = "{\"tacnost\":\"100%\",\"greske\":[]}";

    var stringTest6PR = "{\"tacnost\":\"25%\",\"greske\":[\"Test (2) nije prošao\",\"Test (3) nije prošao\",\"Test (4) nije prošao\"]}"

    var stringTest7PR = "{\"tacnost\":\"0%\",\"greske\":[\"Test (1) nije prošao\",\"Test (2) nije prošao\",\"Test (3) nije prošao\"]}"

    var stringTest8PR = "{\"tacnost\":\"0%\",\"greske\":[\"Testovi se ne mogu izvršiti\"]}";*/

    var stringTest1PR = "{\"stats\":{\"suites\":2,\"tests\":2,\"passes\":2,\"pending\":0,\"failures\":0,\"start\":\"2021-11-05T15:00:26.343Z\",\"end\":\"2021-11-05T15:00:26.352Z\",\"duration\":9},\"tests\":[{\"title\":\"should draw 3 rows when parameter are 2,3\",\"fullTitle\":\"Tabela crtaj() should draw 3 rows when parameter are 2,3\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"should draw 2 columns in row 2 when parameter are 2,3\",\"fullTitle\":\"Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"pending\":[],\"failures\":[],\"passes\":[{\"title\":\"should draw 3 rows when parameter are 2,3\",\"fullTitle\":\"Tabela crtaj() should draw 3 rows when parameter are 2,3\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"should draw 2 columns in row 2 when parameter are 2,3\",\"fullTitle\":\"Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}]}";

    var stringTest2PR = "{\"stats\":{\"suites\":2,\"tests\":6,\"passes\":6,\"pending\":0,\"failures\":0,\"start\":\"2021-11-28T14:40:05.134Z\",\"end\":\"2021-11-28T14:40:05.156Z\",\"duration\":22},\"tests\":[{\"title\":\"------ TEST 1 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 1 ------\",\"file\":null,\"duration\":3,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 2 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 2 ------\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 3 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 3 ------\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 4 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 4 ------\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 5 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 5 ------\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 6 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 6 ------\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"pending\":[],\"failures\":[],\"passes\":[{\"title\":\"------ TEST 1 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 1 ------\",\"file\":null,\"duration\":3,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 2 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 2 ------\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 3 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 3 ------\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 4 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 4 ------\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 5 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 5 ------\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 6 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 6 ------\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}]}";
    
    var stringTest3PR = "{\"stats\":{\"suites\":2,\"tests\":6,\"passes\":4,\"pending\":0,\"failures\":2,\"start\":\"2021-11-28T14:48:03.135Z\",\"end\":\"2021-11-28T14:48:03.166Z\",\"duration\":31},\"tests\":[{\"title\":\"------ TEST 1 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 1 ------\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 2 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 2 ------\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 3 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 3 ------\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 4 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 4 ------\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 5 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 5 ------\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 6 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 6 ------\",\"file\":null,\"duration\":6,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"pending\":[],\"failures\":[{\"title\":\"------ TEST 5 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 5 ------\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 6 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 6 ------\",\"file\":null,\"duration\":6,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"passes\":[{\"title\":\"------ TEST 1 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 1 ------\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 2 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 2 ------\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 3 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 3 ------\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 4 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 4 ------\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}]}"
    
    var stringTest4PR = "{\"stats\":{\"suites\":2,\"tests\":6,\"passes\":0,\"pending\":0,\"failures\":6,\"start\":\"2021-11-28T14:48:03.135Z\",\"end\":\"2021-11-28T14:48:03.166Z\",\"duration\":31},\"tests\":[{\"title\":\"------ TEST 1 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 1 ------\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 2 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 2 ------\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 3 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 3 ------\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 4 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 4 ------\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 5 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 5 ------\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 6 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 6 ------\",\"file\":null,\"duration\":6,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"pending\":[],\"failures\":[{\"title\":\"------ TEST 1 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 1 ------\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 2 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 2 ------\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 3 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 3 ------\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 4 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 4 ------\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 5 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 5 ------\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 6 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 6 ------\",\"file\":null,\"duration\":6,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"passes\":[]}"
    
    var string4padaju2prolaze = "{\"stats\":{\"suites\":2,\"tests\":6,\"passes\":2,\"pending\":0,\"failures\":4,\"start\":\"2021-11-28T14:48:03.135Z\",\"end\":\"2021-11-28T14:48:03.166Z\",\"duration\":31},\"tests\":[{\"title\":\"------ TEST 1 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 1 ------\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 2 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 2 ------\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 3 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 3 ------\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 4 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 4 ------\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 5 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 5 ------\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 6 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 6 ------\",\"file\":null,\"duration\":6,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"pending\":[],\"failures\":[{\"title\":\"------ TEST 2 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 2 ------\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 3 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 3 ------\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 4 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 4 ------\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 5 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 5 ------\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"passes\":[{\"title\":\"------ TEST 1 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 1 ------\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 6 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 6 ------\",\"file\":null,\"duration\":6,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}]}"

    var string2prolaze4padaju = "{\"stats\":{\"suites\":2,\"tests\":6,\"passes\":2,\"pending\":0,\"failures\":4,\"start\":\"2021-11-28T15:03:36.501Z\",\"end\":\"2021-11-28T15:03:36.524Z\",\"duration\":23},\"tests\":[{\"title\":\"------ TEST 1 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 1 ------\",\"file\":null,\"duration\":3,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 2 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 2 ------\",\"file\":null,\"duration\":3,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 3 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 3 ------\",\"file\":null,\"duration\":4,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 4 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 4 ------\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 5 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 5 ------\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 6 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 6 ------\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"pending\":[],\"failures\":[{\"title\":\"------ TEST 1 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 1 ------\",\"file\":null,\"duration\":3,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 2 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 2 ------\",\"file\":null,\"duration\":3,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 5 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 5 ------\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 6 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 6 ------\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"passes\":[{\"title\":\"------ TEST 3 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 3 ------\",\"file\":null,\"duration\":4,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 4 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 4 ------\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}]}"

    var stringTest7PR = "{\"stats\":{\"suites\":3,\"tests\":3,\"passes\":0,\"pending\":0,\"failures\":3,\"start\":\"2021-11-24T21:16:29.210Z\",\"end\":\"2021-11-24T21:16:29.224Z\",\"duration\":14},\"tests\":[{\"title\":\"Test (1) nije prošao\",\"fullTitle\":\"TestoviParser dajTacnost() Test (1)\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Test (2) nije prošao\",\"fullTitle\":\"TestoviParser dajTacnost() Test (2)\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Test (3) nije prošao\",\"fullTitle\":\"TestoviParser dajTacnost() Test (3)\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"pending\":[],\"failures\":[{\"title\":\"Test (1) nije prošao\",\"fullTitle\":\"TestoviParser dajTacnost() Test (1)\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Test (2) nije prošao\",\"fullTitle\":\"TestoviParser dajTacnost() Test (2)\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Test (3) nije prošao\",\"fullTitle\":\"TestoviParser dajTacnost() Test (3)\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"passes\":[]}"

    var string7testova3prolaze4padaju = "{\"stats\":{\"suites\":2,\"tests\":7,\"passes\":3,\"pending\":0,\"failures\":4,\"start\":\"2021-11-28T15:03:36.501Z\",\"end\":\"2021-11-28T15:03:36.524Z\",\"duration\":23},\"tests\":[{\"title\":\"------ TEST 1 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 1 ------\",\"file\":null,\"duration\":3,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 2 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 2 ------\",\"file\":null,\"duration\":3,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 3 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 3 ------\",\"file\":null,\"duration\":4,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 4 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 4 ------\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 5 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 5 ------\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 6 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 6 ------\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 7 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 7 ------\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"pending\":[],\"failures\":[{\"title\":\"------ TEST 1 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 1 ------\",\"file\":null,\"duration\":3,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 2 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 2 ------\",\"file\":null,\"duration\":3,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 5 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 5 ------\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 6 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 6 ------\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"passes\":[{\"title\":\"------ TEST 3 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 3 ------\",\"file\":null,\"duration\":4,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 4 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 4 ------\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"------ TEST 7 ------\",\"fullTitle\":\"TestoviParser dajTacnost() ------ TEST 7 ------\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}]}";

}