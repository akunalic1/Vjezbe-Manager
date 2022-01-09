

const divVjezbe = document.getElementById('odabirVjezbe')

 dohvatiPodatke((error, data)=>{
    iscrtajVjezbe(divVjezbe, JSON.parse(data))
});
// ! pomocne funckije

