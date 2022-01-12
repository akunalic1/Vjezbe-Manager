
chai.should();

describe('Vjezbe Ajax Modul', function () {
  //All the tests would go here
  beforeEach(function () {
    this.xhr = sinon.useFakeXMLHttpRequest();

    this.requests = [];
    this.xhr.onCreate = function (xhr) {
      this.requests.push(xhr);
    }.bind(this);
  });

  afterEach(function () {
    this.xhr.restore();
  });
  it('Testiranje posaljiPodatke 1', function (done) {
    const data = {
      brojVjezbi: 5,
      brojZadataka: [1, 2, 3, 4, 5],
    }

    let dataJson = JSON.stringify(data)
    VjezbeAjax.posaljiPodatke(null, function (err, result) {
      result.should.deep.equal(dataJson);
      done();
    });

    this.requests[0].respond(200, { 'Content-Type': 'text/json' }, dataJson);
  });
  it('Testiranje posaljiPodatke 2', function (done) {
    let data = {
      "brojVjezbi": 5,
      "brojZadataka": [1,2,9,6,4,-1,0]
    }
    let error = {
      "status": "error",
      "data": "Pogrešan parametar z5,z6,brojZadataka"
  }
    VjezbeAjax.posaljiPodatke(data, function (err, result) {
      chai.assert(result === null);
      done();
    });
    this.requests[0].respond(400, { 'Content-Type': 'application/json' }, JSON.stringify(error));
  });
  it('Testiranje posaljiPodatke 3', function (done) {
    let data = {
      "brojVjezbi": 0,
      "brojZadataka": [1,2,9,6,4,-1,0]
    }
    let error = {
      "status": "error",
      "data": "Pogrešan parametar brojVjezbi,z5,z6,brojZadataka"
    }
    VjezbeAjax.posaljiPodatke(data, function (err, result) {
      chai.assert(result === null);
      done();
    });
    this.requests[0].respond(400, { 'Content-Type': 'application/json' }, JSON.stringify(error));
  });
  it('Testiranje posaljiPodatke 4', function (done) {
    let data = {
      "brojVjezbi": 0,
      "brojZadataka": []
    }
    let error = {
      "status": "error",
      "data": "Pogrešan parametar brojVjezbi"
  }
    VjezbeAjax.posaljiPodatke(data, function (err, result) {
      chai.assert(result === null);
      done();
    });
    this.requests[0].respond(400, { 'Content-Type': 'application/json' }, JSON.stringify(error));
  });
  it('Testiranje posaljiPodatke 5', function (done) {
    let data = {
      "brojVjezbi": -6,
      "brojZadataka": []
    }
    let error = {
      "status": "error",
      "data": "Pogrešan parametar brojVjezbi,brojZadataka"
  }
    VjezbeAjax.posaljiPodatke(data, function (err, result) {
      chai.assert(result === null);
      done();
    });
    this.requests[0].respond(400, { 'Content-Type': 'application/json' }, JSON.stringify(error));
  });
  it('Testiranje posaljiPodatke 6', function (done) {
    let data = {
      "brojVjezbi": 0,
      "brojZadataka": [1,2,-2,-3,0,10,90,1]
    }
    let error = {
      "status": "error",
      "data": "Pogrešan parametar brojVjezbi,z2,z3,z4,z6,brojZadataka"
  }
    VjezbeAjax.posaljiPodatke(data, function (err, result) {
      chai.assert(result === null);
      done();
    });
    this.requests[0].respond(400, { 'Content-Type': 'application/json' }, JSON.stringify(error));
  });

  it('Testiranje dodajInputPolja 1', function (done) {
    
   
  });

});