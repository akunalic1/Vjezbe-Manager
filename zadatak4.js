let assert = chai.assert;
describe('TestoviParser', function() {
 describe('porediRezultate()', function() {
   it('---TEST 1---', function() {
     let objekat = TestoviParser.porediRezultate(stringTest1PR, stringTest1PR)
     assert.equal(Object.keys(objekat.greske).length, 2,"Broj gresaka");
   });
   it('---TEST 2---', function() {
    let objekat = TestoviParser.porediRezultate(stringTest2PR, stringTest3PR)
    assert.equal(Object.keys(objekat.greske).length, 2,"Broj gresaka");
  });
  it('---TEST 3---', function() {
    let objekat = TestoviParser.porediRezultate(stringTest2PR, stringTest4PR)
    assert.equal(Object.keys(objekat.greske).length, 1,"Broj gresaka");
    assert.equal(objekat.promjena, "50%", "Promjena")
  });
  it('---TEST 4---', function() {
    let objekat = TestoviParser.porediRezultate(stringTest5PR, stringTest2PR)
    assert.equal(Object.keys(objekat.greske).length, 2,"Broj gresaka");
    assert.equal(objekat.promjena, "50%", "Promjena")
  });
  it('---TEST 5---', function() {
    let objekat = TestoviParser.porediRezultate(stringTest6PR, stringTest7PR)
    assert.equal(Object.keys(objekat.greske).length, 2,"Broj gresaka");
    assert.equal(objekat.promjena, "100%", "Promjena")
  });
  it('---TEST 6---', function() {
    let objekat = TestoviParser.porediRezultate(stringTest8PR, stringTest7PR)
    assert.equal(Object.keys(objekat.greske).length, 4,"Broj gresaka");
    assert.equal(objekat.promjena, "100%", "Promjena")
  });
 });
});

{
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

    var stringTest8PR = "{\"tacnost\":\"0%\",\"greske\":[\"Testovi se ne mogu izvršiti\"]}";
}