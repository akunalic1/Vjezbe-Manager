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
  describe('Testiranje posaljiPodatke', function (){

    it('Isparavan format', function (done) {
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
    it('Veca lista od broja vjezbi', function (done) {
      let data = {
        "brojVjezbi": 5,
        "brojZadataka": [1, 2, 9, 6, 4, 1, 0]
      }
      let error = {
        "status": "error",
        "data": "Pogrešan parametar z6,brojZadataka"
    }
      VjezbeAjax.posaljiPodatke(data, function (err, result) {
        chai.assert(result === null);
        done();
      });
      this.requests[0].respond(400, { 'Content-Type': 'application/json' }, JSON.stringify(error));
    });
    it('Broj vjezbi 0 sa nepraznom listom', function (done) {
      let data = {
        "brojVjezbi": 0,
        "brojZadataka": [1, 2, 9, 6, 4, 1, 0]
      }
      let error = {
        "status": "error",
        "data": "Pogrešan parametar brojVjezbi,z6,brojZadataka"
    }
      VjezbeAjax.posaljiPodatke(data, function (err, result) {
        chai.assert(result === null);
        done();
      });
      this.requests[0].respond(400, { 'Content-Type': 'application/json' }, JSON.stringify(error));
    });
    it('Broj vjezbi 0 sa praznom listom', function (done) {
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
    it('Negativan broj vjezbi', function (done) {
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
    it('Prekoračeni brojevi zadataka', function (done) {
      let data = {
        "brojVjezbi": 8,
        "brojZadataka": [1, 2, 2, 3, 0, 10, 90, 1]
      }
      let error = {
        "status": "error",
        "data": "Pogrešan parametar z4,z6"
    }
      VjezbeAjax.posaljiPodatke(data, function (err, result) {
        chai.assert(result === null);
        done();
      });
      this.requests[0].respond(400, { 'Content-Type': 'application/json' }, JSON.stringify(error));
    });
    it('Negativni brojevi zadataka', function (done) {
      let data = {
        "brojVjezbi": 8,
        "brojZadataka": [1, 2, -2, -3, -0, -10, 90, 1]
      }
      let error = {
        "status": "error",
        "data": "Pogrešan parametar z2,z3,z4,z5,z6"
    }
      VjezbeAjax.posaljiPodatke(data, function (err, result) {
        chai.assert(result === null);
        done();
      });
      this.requests[0].respond(400, { 'Content-Type': 'application/json' }, JSON.stringify(error));
    });
    it('Prekoračen broj vježbi', function (done) {
      let data = {
        "brojVjezbi": 88,
        "brojZadataka": [1, 2, -2, -3, -0, -10, 90, 1]
      }
      let error = {
        "status": "error",
        "data": "Pogrešan parametar brojVjezbi,z2,z3,z4,z5,z6,brojZadataka"
    }
      VjezbeAjax.posaljiPodatke(data, function (err, result) {
        chai.assert(result === null);
        done();
      });
      this.requests[0].respond(400, { 'Content-Type': 'application/json' }, JSON.stringify(error));
    });
  })

  describe('Testiranje dodajInputPolja', function (){

    it('Negativan broj polja', function (done) {
      let div = document.createElement('div')
      VjezbeAjax.dodajInputPolja(div, -10);
      div.innerHTML.should.deep.eq('')
      done();
    });
    it('Broj polja > 15', function (done) {
      let div = document.createElement('div')
      VjezbeAjax.dodajInputPolja(div, 910);
      div.innerHTML.should.deep.eq('')
      done();

    });
    it('Broj polja == 0', function (done) {
      let div = document.createElement('div')
      VjezbeAjax.dodajInputPolja(div, 0);
      div.innerHTML.should.deep.eq('')
      done();
    });
    it('Ispravan broj polja', function (done) {
      let div = document.createElement('div')
      VjezbeAjax.dodajInputPolja(div, 2);
      div.innerHTML.should.deep.eq('<div><label for="z0">Unesite broj zadataka za vjezbu 1:</label><input type="number" name="z0" id="z0" value="4"></div><div><label for="z1">Unesite broj zadataka za vjezbu 2:</label><input type="number" name="z1" id="z1" value="4"></div>')
      done();
    });
  })

  describe('Testiranje dohvatiPodatke', function(){
    it('Dohvatanje podataka', function (done) {
      const data = {
        brojVjezbi: 5,
        brojZadataka: [1, 2, 3, 4, 5],
      }
      let dataJson = JSON.stringify(data)
      VjezbeAjax.dohvatiPodatke(function (err, result) {
        result.should.deep.equal(dataJson);
        done();
      });

      this.requests[0].respond(200, { 'Content-Type': 'text/json' }, dataJson);
    })
  })
  describe('Testiranje iscrtajVjezbe', function (){
    it('Isparavan format', function (done) {
      let div = document.createElement('div')
      const data = {
        brojVjezbi: 5,
        brojZadataka: [1, 2, 3, 4, 5],
      }

      let dataJson = JSON.stringify(data)
      VjezbeAjax.iscrtajVjezbe(div, data)
      div.innerHTML.should.deep.eq('<div class="vjezba" id="v0">Vjezba 1</div><div class="zadaci" style="display: none;"><div class="zadatak" id="z0">Zadatak 1</div></div><div class="vjezba" id="v1">Vjezba 2</div><div class="zadaci" style="display: none;"><div class="zadatak" id="z0">Zadatak 1</div><div class="zadatak" id="z1">Zadatak 2</div></div><div class="vjezba" id="v2">Vjezba 3</div><div class="zadaci" style="display: none;"><div class="zadatak" id="z0">Zadatak 1</div><div class="zadatak" id="z1">Zadatak 2</div><div class="zadatak" id="z2">Zadatak 3</div></div><div class="vjezba" id="v3">Vjezba 4</div><div class="zadaci" style="display: none;"><div class="zadatak" id="z0">Zadatak 1</div><div class="zadatak" id="z1">Zadatak 2</div><div class="zadatak" id="z2">Zadatak 3</div><div class="zadatak" id="z3">Zadatak 4</div></div><div class="vjezba" id="v4">Vjezba 5</div><div class="zadaci" style="display: none;"><div class="zadatak" id="z0">Zadatak 1</div><div class="zadatak" id="z1">Zadatak 2</div><div class="zadatak" id="z2">Zadatak 3</div><div class="zadatak" id="z3">Zadatak 4</div><div class="zadatak" id="z4">Zadatak 5</div></div>')
      done();
    });
    it('Negativan broj vjezbi', function (done) {
      let div = document.createElement('div')
      const data = {
        brojVjezbi: -5,
        brojZadataka: [1, 2, 3, 4, 5],
      }
      VjezbeAjax.iscrtajVjezbe(div, data)
      div.innerHTML.should.deep.eq('')
      done();
    });
    it('Broj vjezbi > 15', function (done) {
      let div = document.createElement('div')
      const data = {
        brojVjezbi: 25,
        brojZadataka: [1, 2, 3, 4, 5],
      }
      VjezbeAjax.iscrtajVjezbe(div, data)
      div.innerHTML.should.deep.eq('')
      done();
    });
    it('Broj vjezbi == 0', function (done) {
      let div = document.createElement('div')
      const data = {
        brojVjezbi: 0,
        brojZadataka: [1, 2, 3, 4, 5],
      }
      VjezbeAjax.iscrtajVjezbe(div, data)
      div.innerHTML.should.deep.eq('')
      done();
    });
    it('Negativni brojevi zadataka', function (done) {
      let div = document.createElement('div')
      const data = {
        brojVjezbi: 5,
        brojZadataka: [1, -2, -3, -4, 5],
      }
      VjezbeAjax.iscrtajVjezbe(div, data)
      div.innerHTML.should.deep.eq('')
      done();;
    });
    it('Prekoračeni brojevi vjezbi', function (done) {
      let div = document.createElement('div')
      const data = {
        brojVjezbi: 35,
        brojZadataka: [1, -2, -3, -4, 5],
      }
      VjezbeAjax.iscrtajVjezbe(div, data)
      div.innerHTML.should.deep.eq('')
      done();;
    });
    it('Prekoračeni brojevi zadataka', function (done) {
      let div = document.createElement('div')
      const data = {
        brojVjezbi: 15,
        brojZadataka: [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
      }
      VjezbeAjax.iscrtajVjezbe(div, data)
      div.innerHTML.should.deep.eq('')
      done();;
    });
  })

});