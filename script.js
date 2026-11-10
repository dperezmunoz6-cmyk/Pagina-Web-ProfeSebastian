/* =======================================================
   SCRIPT.JS
   Aqui va todo el comportamiento interactivo de la pagina.
   Esta dividido por secciones para que sea facil de entender
   y de explicar si te preguntan en clase.
   ======================================================= */


/* -------------------------------------------------------
   1) MENU DE NAVEGACION: scroll suave + resaltar el enlace activo
   ------------------------------------------------------- */

// Buscamos todos los enlaces del menu que SI tienen un destino real (#inicio, #content)
const enlacesNav = document.querySelectorAll('.nav-link');

enlacesNav.forEach(function (enlace) {
    enlace.addEventListener('click', function (evento) {
        evento.preventDefault(); // evita el salto brusco por defecto

        const destinoId = enlace.getAttribute('href'); // ej: "#content"
        const destino = document.querySelector(destinoId);

        if (destino) {
            destino.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Mientras el usuario hace scroll, revisamos en que seccion esta
// y le ponemos la clase "activo" al enlace correspondiente del menu.
const secciones = document.querySelectorAll('#inicio, #content, #requisitos');

function actualizarEnlaceActivo() {
    let seccionActual = '';

    secciones.forEach(function (seccion) {
        const topeSeccion = seccion.offsetTop - 80; // margen para que active un poco antes
        if (window.scrollY >= topeSeccion) {
            seccionActual = seccion.getAttribute('id');
        }
    });

    enlacesNav.forEach(function (enlace) {
        enlace.classList.remove('activo');
        if (enlace.getAttribute('href') === '#' + seccionActual) {
            enlace.classList.add('activo');
        }
    });
}

window.addEventListener('scroll', actualizarEnlaceActivo);


/* -------------------------------------------------------
   2) VALIDAR EL FORMULARIO DE BUSQUEDA
   ------------------------------------------------------- */

const formBusqueda = document.getElementById('form-busqueda');
const inputBusqueda = document.getElementById('input-busqueda');
const mensajeBusqueda = document.getElementById('mensaje-busqueda');

formBusqueda.addEventListener('submit', function (evento) {
    evento.preventDefault(); // esta pagina no tiene un backend real, asi que controlamos nosotros el envio

    const texto = inputBusqueda.value.trim();

    if (texto === '') {
        // Caso 1: el usuario no escribio nada
        mensajeBusqueda.textContent = 'Por favor escribe algo antes de buscar.';
        mensajeBusqueda.className = 'mensaje-busqueda error';
    } else {
        // Caso 2: hay texto, mostramos un mensaje de "exito"
        mensajeBusqueda.textContent = 'Buscando: "' + texto + '"...';
        mensajeBusqueda.className = 'mensaje-busqueda exito';
        inputBusqueda.value = '';
    }
});


/* -------------------------------------------------------
   3) GALERIA / LIGHTBOX: ampliar imagenes al hacer clic
   ------------------------------------------------------- */

const imagenesGaleria = document.querySelectorAll('.img-galeria');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

imagenesGaleria.forEach(function (imagen) {
    imagen.addEventListener('click', function () {
        lightboxImg.src = imagen.src;
        lightbox.classList.add('activo');
    });
});

// Cerrar el lightbox al hacer clic en cualquier parte del fondo oscuro
lightbox.addEventListener('click', function () {
    lightbox.classList.remove('activo');
});

// Tambien cerrarlo si el usuario presiona la tecla "Escape"
document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape') {
        lightbox.classList.remove('activo');
    }
});


/* -------------------------------------------------------
   4) BOTON "VOLVER ARRIBA"
   ------------------------------------------------------- */

const btnArriba = document.getElementById('btn-arriba');

window.addEventListener('scroll', function () {
    // Lo mostramos solo si el usuario ya bajo mas de 300px
    if (window.scrollY > 300) {
        btnArriba.classList.add('visible');
    } else {
        btnArriba.classList.remove('visible');
    }
});

btnArriba.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* -------------------------------------------------------
   5) PARTICULAS DE ESTATICA/DATOS (estetica neo-noir holograma)
   ------------------------------------------------------- */

const capaParticulas = document.getElementById('capa-particulas');
const CANTIDAD_PARTICULAS = 35;

for (let i = 0; i < CANTIDAD_PARTICULAS; i++) {
    const particula = document.createElement('div');
    particula.classList.add('particula');

    // Tamaño aleatorio entre 1px y 3px (polvo fino, no burbujas grandes)
    const tamano = Math.random() * 2 + 1;
    particula.style.width = tamano + 'px';
    particula.style.height = tamano + 'px';

    // Posicion horizontal aleatoria
    particula.style.left = Math.random() * 100 + 'vw';

    // Duracion y retraso aleatorios para que no caigan todas juntas
    const duracion = Math.random() * 10 + 10; // entre 10s y 20s
    const retraso = Math.random() * 20;
    particula.style.animationDuration = duracion + 's';
    particula.style.animationDelay = '-' + retraso + 's';

    capaParticulas.appendChild(particula);
}
