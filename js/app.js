/* =========================================
                 Variables
========================================= */
/*
 * 1 seleccionar el <div> que contiene los cursos 
 * 2 seleccionar carrito de compras
 * 3 seleccionar el contenido del carrito de compras 
 */
const listaCursos = document.querySelector("#lista-cursos"); /*1*/
const carrito = document.querySelector("#carrito"); /*2*/
const contenidoCarritoHtml = document.querySelector("#contenido-carrito"); /*3*/

// para Guardar los cursos en el carrito
let cursosCarrito = [];

/* =========================================
               EventListeners
========================================= */
cargarEventListeners();
function cargarEventListeners() {
    // Agregar un curso al precionar "Agregar el Carrito"
    listaCursos.addEventListener('click', seleccionarCurso);
};


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
    };
};

function extraerInfoCurso(curso) {
    // Crear un objeto con el contenido del curso seleccionado
    const infoCurso = {
        imagen   : curso.querySelector('img').src,
        titulo   : curso.querySelector('h4').textContent,
        precio   : curso.querySelector('.precio span').textContent,
        id       : curso.querySelector('a').getAttribute('data-id'),
        cantidad : 1
    };

    // Revisar si un elemento ya existe en el carrito
    const existe = cursosCarrito.some( curso => curso.id === infoCurso.id );
    
    // Si existe... Actualizar Cantidad
    if( existe ) {
        // Crear nuevo arreglo con .map
        const cursos = cursosCarrito.map( curso => {
            if( curso.id === infoCurso.id ) {       
                curso.cantidad++;
                // retorna el objeto actualizado
                return curso;  
            } else {
                // retorna los objetos que no son duplicados
                return curso;
            };
        });
        // Actualizar el arreglo de carrito
        cursosCarrito = [ ...cursos ]

        carritoHTML(cursosCarrito)
    } else {
        // Agregar elemento al arreglo de carrito
        cursosCarrito = [ ...cursosCarrito, infoCurso ];

        // Mostrar arreglo de cursos en el HTML
        carritoHTML(cursosCarrito);
    };
};

function carritoHTML(cursosCarrito) {

    // Eliminar el HTML del carrito para evitar que se duplique
    limpiarHTML();

    console.log(cursosCarrito)

    // Iterar el arreglo de cursos
    cursosCarrito.forEach(curso => {
        // Crear un <tr> con los datos de cada curso
        const { imagen, titulo, precio, cantidad, id } = curso;
        const cursoHtml = document.createElement('tr');

        cursoHtml.innerHTML = `
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `;

        // Agrega el HTML del carrito en el tbody
        contenidoCarritoHtml.appendChild(cursoHtml);
    });
};

function limpiarHTML() {
    // Elimina los hijos del tbody
    while( contenidoCarritoHtml.firstChild ) {
        contenidoCarritoHtml.removeChild( contenidoCarritoHtml.firstChild );
    };
};