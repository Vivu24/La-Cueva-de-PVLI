function mostrarOcultar(parrafoId) {
    var parrafos = document.querySelectorAll('.contenido');
    parrafos.forEach(function(parrafo) {
        if(parrafo.id === parrafoId) parrafo.style.display = "block";
        else parrafo.style.display = "none";
    });
}
function mostrarOcultarControles(parrafoId){
    var parrafos = document.querySelectorAll('.minijuegos');
    parrafos.forEach(function(parrafo) {
        if(parrafo.id === parrafoId) parrafo.style.display = "block";
        else parrafo.style.display = "none";
    });
}
