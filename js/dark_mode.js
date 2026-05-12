// Definir colores para modos
const colores = {
    claro: {
        body: { backgroundColor: '#ffffff', color: '#000000' },
        header: { backgroundColor: '#f4f4f4', color: '#000000', borderColor: '#000000' },
        buscador: { backgroundColor: '#ffffff', color: '#000000', borderColor: '#000000' },
        menuLinks: '#000000',
        boton: { textContent: 'Modo Oscuro', backgroundColor: '#f0f0f0', color: '#000', borderColor: '#ccc' },
        tarjetas: { backgroundColor: '#ffffff', borderColor: '#000000', color: '#000000' }
    },
    oscuro: {
        body: { backgroundColor: '#1a1a1a', color: '#ffffff' },
        header: { backgroundColor: '#000000', color: '#ffffff', borderColor: '#555' },
        buscador: { backgroundColor: '#333333', color: '#ffffff', borderColor: '#555' },
        menuLinks: '#ffffff',
        boton: { textContent: 'Modo Claro', backgroundColor: '#333', color: '#fff', borderColor: '#555' },
        tarjetas: { backgroundColor: '#2d2d2d', borderColor: '#555', color: '#ffffff' }
    }
};

// Funcion para aplicar tema
function aplicarTema(isDark) {
    const tema = isDark ? colores.oscuro : colores.claro;

    // Body
    Object.assign(document.body.style, tema.body);

    // Header
    const header = document.querySelector('.header-principal');
    if (header) Object.assign(header.style, tema.header);

    // Buscador
    const buscador = document.querySelector('.contenedor-buscador input');
    if (buscador) Object.assign(buscador.style, tema.buscador);

    // Links del menu
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => link.style.color = tema.menuLinks);

    // Boton
    const boton = document.getElementById('btn-cambiar-color');
    if (boton) {
        boton.textContent = tema.boton.textContent;
        Object.assign(boton.style, { backgroundColor: tema.boton.backgroundColor, color: tema.boton.color, borderColor: tema.boton.borderColor });
    }

    cambiarEstiloTarjetas(isDark);
}

// Funcion para cambiar estilo
function cambiarEstiloTarjetas(isDark) {
    const tema = isDark ? colores.oscuro.tarjetas : colores.claro.tarjetas;
    const tarjetas = document.querySelectorAll('.noticia-card');
    tarjetas.forEach(card => Object.assign(card.style, tema));
}

// Crear boton y manejar eventos
function crearBotonCambiarColor() {
    const botonColor = document.createElement('button');
    botonColor.id = 'btn-cambiar-color';
    botonColor.textContent = 'Modo Oscuro';

    // Estilos iniciales
    Object.assign(botonColor.style, {
        padding: '8px 16px',
        marginLeft: '15px',
        cursor: 'pointer',
        fontSize: '14px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        backgroundColor: '#f0f0f0',
        color: '#000'
    });

    const menu = document.querySelector('.menu');
    if (menu) menu.appendChild(botonColor);

    let esModoOscuro = false;

    // Evento click
    botonColor.addEventListener('click', () => {
        esModoOscuro = !esModoOscuro;
        aplicarTema(esModoOscuro);
        localStorage.setItem('colorPagina', esModoOscuro ? 'oscuro' : 'claro');
    });

    // Recuperar preferencia
    const colorGuardado = localStorage.getItem('colorPagina');
    if (colorGuardado === 'oscuro') {
        esModoOscuro = true;
        setTimeout(() => aplicarTema(true), 100); // Delay para DOM
    }

    // Observer para noticias new
    const contenedor = document.getElementById('contenedor-noticias');
    if (contenedor) {
        const observer = new MutationObserver(() => {
            if (localStorage.getItem('colorPagina') === 'oscuro') {
                cambiarEstiloTarjetas(true);
            }
        });
        observer.observe(contenedor, { childList: true });
    }

    window.modoOscuroActivo = esModoOscuro;
}

window.addEventListener('load', crearBotonCambiarColor);