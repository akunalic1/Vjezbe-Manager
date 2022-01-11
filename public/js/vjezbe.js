const divVjezbe = document.getElementById('odabirVjezbe')

 VjezbeAjax.dohvatiPodatke((error, data)=>{
    VjezbeAjax.iscrtajVjezbe(divVjezbe, JSON.parse(data))
});
// ! pomocne funckije

