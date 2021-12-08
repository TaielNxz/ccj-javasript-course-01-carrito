/* =========================================
                 Variables
========================================= */
/*
 * 1 seleccionar carrito de compras
 * 2 seleccionar div que contiene los cursos 
 */
const carrito = document.querySelector("#carrito"); /*1*/
const listaCursos = document.querySelector("#lista-cursos"); /*2*/

/* =========================================
               EventListeners
========================================= */
cargarEventListeners();
function cargarEventListeners() {
    // Agregar un curso al precionar "Agregar el Carrito"
    listaCursos.addEventListener('click', seleccionarCurso);
}


/* =========================================
               Funciones
========================================= */
function seleccionarCurso(e) {
    // Evitar que se recargue la página
    e.preventDefault();

    // Si hacemos click en el boton "Agregar al Carrito"
    if( e.target.classList.contains('agregar-carrito') ) {
        // Seleccionar el DIV del curso desde el hijo
        const cursoSeleccionado = e.target.parentElement.parentElement;
        // Pasar el DIV
        extraerInfoCurso(cursoSeleccionado)
    }
}

function extraerInfoCurso(curso) {
    // Crear un objeto con el contenido del curso seleccionado
    const infoCurso = {
        imagen   : curso.querySelector('img').src,
        titulo   : curso.querySelector('h4').textContent,
        precio   : curso.querySelector('.precio span').textContent,
        id       : curso.querySelector('a').getAttribute('data-id'),
        cantidad : 1
    }

    // Mostrar objeto en consola
    console.log(infoCurso);
}