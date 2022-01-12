let assert = chai.assert;
describe('TestoviParser', function() {
 describe('dajTacnost()', function() {
   it('------ TEST 1 ------', function() {
     let objekat = TestoviParser.dajTacnost(stringTest1)
     assert.equal(objekat.tacnost, "100%","Procenat");
   });
   it('------ TEST 2 ------', function() {
    let objekat = TestoviParser.dajTacnost(stringTest2)
    assert.equal(objekat.tacnost, "50%","Procenat");
  });
  it('------ TEST 3 ------', function() {
    let objekat = TestoviParser.dajTacnost(stringTest3)
    assert.equal(objekat.tacnost, "33.3%","Procenat");
  });
  it('------ TEST 4 ------', function() {
    let objekat = TestoviParser.dajTacnost(stringTestNijedanTestSeNijeIZvrio)
    assert.equal(objekat.tacnost, "0%","Procenat");
  });
  it('------ TEST 5 ------', function() {
    let objekat = TestoviParser.dajTacnost(stringTestSviPadaju)
    assert.equal(objekat.tacnost, "0%","Procenat");
  });
  it('------ TEST 6 ------', function() {
    let objekat = TestoviParser.dajTacnost(stringJedanProlazi)
    assert.equal(objekat.tacnost, "25%","Procenat");
  });
  it('------ TEST 7 ------', function() {
    let objekat = TestoviParser.dajTacnost("nevalidan json format &//&/&/?)(")
    assert.equal(objekat.tacnost, "0%","Procenat");
    assert.equal(objekat.greske, "Testovi se ne mogu izvršiti", "Greske")
  });
 });
});

{
    var stringTest1 = "{\"stats\":{\"suites\":2,\"tests\":2,\"passes\":2,\"pending\":0,\"failures\":0,\"start\":\"2021-11-05T15:00:26.343Z\",\"end\":\"2021-11-05T15:00:26.352Z\",\"duration\":9},\"tests\":[{\"title\":\"should draw 3 rows when parameter are 2,3\",\"fullTitle\":\"Tabela crtaj() should draw 3 rows when parameter are 2,3\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"should draw 2 columns in row 2 when parameter are 2,3\",\"fullTitle\":\"Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"pending\":[],\"failures\":[],\"passes\":[{\"title\":\"should draw 3 rows when parameter are 2,3\",\"fullTitle\":\"Tabela crtaj() should draw 3 rows when parameter are 2,3\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"should draw 2 columns in row 2 when parameter are 2,3\",\"fullTitle\":\"Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}]}";

    var stringTest2 = "{\"stats\":{\"suites\":2,\"tests\":4,\"passes\":2,\"pending\":0,\"failures\":2,\"start\":\"2021-11-24T21:16:29.210Z\",\"end\":\"2021-11-24T21:16:29.224Z\",\"duration\":14},\"tests\":[{\"title\":\"Ocekivana vrijednost procenta 50%\",\"fullTitle\":\"TestoviParser dajTacnost() Ocekivana vrijednost procenta 50%\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Ocekivana vrijednost procenta 50%\",\"fullTitle\":\"TestoviParser dajTacnost() Ocekivana vrijednost procenta 50%\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Ocekivana vrijednost procenta 50%\",\"fullTitle\":\"TestoviParser dajTacnost() Ocekivana vrijednost procenta 50%\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Ocekivana vrijednost procenta 50%\",\"fullTitle\":\"TestoviParser dajTacnost() Ocekivana vrijednost procenta 50%\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"pending\":[],\"failures\":[{\"title\":\"test failed (3)\",\"fullTitle\":\"TestoviParser dajTacnost() Ocekivana vrijednost procenta 100%\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"test failed (4)\",\"fullTitle\":\"TestoviParser dajTacnost() Ocekivana vrijednost procenta 100%\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"passes\":[{\"title\":\"Ocekivana vrijednost procenta 100%\",\"fullTitle\":\"TestoviParser dajTacnost() Ocekivana vrijednost procenta 100%\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Ocekivana vrijednost procenta 100%\",\"fullTitle\":\"TestoviParser dajTacnost() Ocekivana vrijednost procenta 100%\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}]}";
    
    var stringTest3 = "{\"stats\":{\"suites\":3,\"tests\":3,\"passes\":1,\"pending\":1,\"failures\":1,\"start\":\"2021-11-24T21:16:29.210Z\",\"end\":\"2021-11-24T21:16:29.224Z\",\"duration\":14},\"tests\":[{\"title\":\"Test (1) prošao\",\"fullTitle\":\"TestoviParser dajTacnost() Test (1)\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Test (2) se nije izvršio\",\"fullTitle\":\"TestoviParser dajTacnost() Test (2)\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Test (3) nije prošao\",\"fullTitle\":\"TestoviParser dajTacnost() Test (3)\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"pending\":[{\"title\":\"Test (2) se nije izvršio\",\"fullTitle\":\"TestoviParser dajTacnost() Test (2)\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"failures\":[{\"title\":\"Test (3) nije prošao\",\"fullTitle\":\"TestoviParser dajTacnost() Test (3)\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"passes\":[{\"title\":\"Test (1) prošao\",\"fullTitle\":\"TestoviParser dajTacnost() Test (1)\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}]}"
    
    var stringTestNijedanTestSeNijeIZvrio = "{\"stats\":{\"suites\":3,\"tests\":3,\"passes\":0,\"pending\":3,\"failures\":0,\"start\":\"2021-11-24T21:16:29.210Z\",\"end\":\"2021-11-24T21:16:29.224Z\",\"duration\":14},\"tests\":[{\"title\":\"Test (1) se nije izvršio\",\"fullTitle\":\"TestoviParser dajTacnost() Test (1)\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Test (2) se nije izvršio\",\"fullTitle\":\"TestoviParser dajTacnost() Test (2)\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Test (3) se nije izvršio\",\"fullTitle\":\"TestoviParser dajTacnost() Test (3)\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"pending\":[{\"title\":\"Test (1) se nije izvršio\",\"fullTitle\":\"TestoviParser dajTacnost() Test (1)\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Test (2) se nije izvršio\",\"fullTitle\":\"TestoviParser dajTacnost() Test (2)\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Test (3) se nije izvršio\",\"fullTitle\":\"TestoviParser dajTacnost() Test (3)\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"failures\":[],\"passes\":[]}"
    
    var stringTestSviPadaju = "{\"stats\":{\"suites\":3,\"tests\":3,\"passes\":0,\"pending\":0,\"failures\":3,\"start\":\"2021-11-24T21:16:29.210Z\",\"end\":\"2021-11-24T21:16:29.224Z\",\"duration\":14},\"tests\":[{\"title\":\"Test (1) nije prošao\",\"fullTitle\":\"TestoviParser dajTacnost() Test (1)\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Test (2) nije prošao\",\"fullTitle\":\"TestoviParser dajTacnost() Test (2)\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Test (3) nije prošao\",\"fullTitle\":\"TestoviParser dajTacnost() Test (3)\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"pending\":[],\"failures\":[{\"title\":\"Test (1) nije prošao\",\"fullTitle\":\"TestoviParser dajTacnost() Test (1)\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Test (2) nije prošao\",\"fullTitle\":\"TestoviParser dajTacnost() Test (2)\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Test (3) nije prošao\",\"fullTitle\":\"TestoviParser dajTacnost() Test (3)\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"passes\":[]}"

    var stringJedanProlazi = "{\"stats\":{\"suites\":3,\"tests\":4,\"passes\":1,\"pending\":0,\"failures\":3,\"start\":\"2021-11-24T21:16:29.210Z\",\"end\":\"2021-11-24T21:16:29.224Z\",\"duration\":14},\"tests\":[{\"title\":\"Test (1) prošao\",\"fullTitle\":\"TestoviParser dajTacnost() Test (1)\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Test (2) nije prošao\",\"fullTitle\":\"TestoviParser dajTacnost() Test (2)\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Test (3) nije prošao\",\"fullTitle\":\"TestoviParser dajTacnost() Test (3)\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Test (4) nije prošao\",\"fullTitle\":\"TestoviParser dajTacnost() Test (4)\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"pending\":[],\"failures\":[{\"title\":\"Test (2) nije prošao\",\"fullTitle\":\"TestoviParser dajTacnost() Test (2)\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Test (3) nije prošao\",\"fullTitle\":\"TestoviParser dajTacnost() Test (3)\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Test (4) nije prošao\",\"fullTitle\":\"TestoviParser dajTacnost() Test (4)\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"passes\":[{\"title\":\"Test (1) prošao\",\"fullTitle\":\"TestoviParser dajTacnost() Test (1)\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}]}"
}
