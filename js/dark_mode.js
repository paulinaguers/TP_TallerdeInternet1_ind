// boton modo oscuro   / claro
function crearBotonCambiarColor()  {
    // Crear el boton
    const botonColor = document.createElement('button');
    botonColor.id = 'btn-cambiar-color';
    botonColor.textContent = 'Modo Oscuro';
    
    // Estilos para integrar en el header
    botonColor.style.padding = '8px 16px';
    botonColor.style.marginLeft = '15px';
    botonColor.style.cursor = 'pointer';
    botonColor.style.fontSize = '14px';
    botonColor.style.borderRadius = '4px';
    botonColor.style.border = '1px solid  #ccc';
    botonColor.style.backgroundColor = '#f0f0f0';
    botonColor.style.color = '#000';
    
    // Agregar al menu del header
    const menu = document.querySelector('.menu');
    menu.appendChild(botonColor);
    
    let esModoOscuro = false;
    
    // Evento click para cambiar color
    botonColor.addEventListener('click', function()  {
        esModoOscuro = !esModoOscuro;
        
        if (esModoOscuro)  {
                    // Modo oscuro
                    document.body.style.backgroundColor = '#1a1a1a';
                    document.body.style.color = '#ffffff';
                    
                    // Header con fondo negro
                    const header = document.querySelector('.header-principal');
                    header.style.backgroundColor = '#000000';
                    header.style.color = '#ffffff';
                    header.style.borderColor = '#555';
                    
                    // Buscador
                    const buscador = document.querySelector('.contenedor-buscador input');
                    buscador.style.backgroundColor = '#333333';
                    buscador.style.color = '#ffffff';
                    buscador.style.borderColor = '#555';
                    
                    // Links del menú
                    const menuLinks = document.querySelectorAll('.menu a');
                    menuLinks.forEach(link => {
                        link.style.color = '#ffffff';
                    });
                    
                    botonColor.textContent = 'Modo Claro';
                    botonColor.style.backgroundColor = '#333';
                    botonColor.style.color = '#fff';
                    botonColor.style.borderColor = '#555';

                    // Cambiar color de las tarjetas de noticias
                    cambiarEstiloTarjetas(true);
                } else  {
                    // Modo claro
                    document.body.style.backgroundColor = '#ffffff';
                    document.body.style.color = '#000000';
                    
                    // Header con fondo gris claro
                    const header = document.querySelector('.header-principal');
                    header.style.backgroundColor = '#f4f4f4';
                    header.style.color = '#000000';
                    header.style.borderColor = '#000000';
                    
                    // Buscador
                    const buscador = document.querySelector('.contenedor-buscador input');
                    buscador.style.backgroundColor = '#ffffff';
                    buscador.style.color = '#000000';
                    buscador.style.borderColor = '#000000';
                    
                    // Links del menú
                    const menuLinks = document.querySelectorAll('.menu a');
                    menuLinks.forEach(link => {
                        link.style.color = '#000000';
                    });
                    
                    botonColor.textContent = 'Modo Oscuro';
                    botonColor.style.backgroundColor = '#f0f0f0';
                    botonColor.style.color = '#000';
                    botonColor.style.borderColor = '#ccc';
        
                    // Cambiar color de las tarjetas de noticias
                    cambiarEstiloTarjetas(false);
                }

        // Guardar preferencia en localStorage
        localStorage.setItem('colorPagina', esModoOscuro ?'oscuro' :'claro');
    });

    // Recuperar color guardado
            const colorGuardado = localStorage.getItem('colorPagina');
            if (colorGuardado === 'oscuro')  {
                esModoOscuro = true;
                document.body.style.backgroundColor = '#1a1a1a';
                document.body.style.color = '#ffffff';
                
                // Header con fondo negro
                const header = document.querySelector('.header-principal');
                header.style.backgroundColor = '#000000';
                header.style.color = '#ffffff';
                header.style.borderColor = '#555';
                
                // Buscador
                const buscador = document.querySelector('.contenedor-buscador input');
                buscador.style.backgroundColor = '#333333';
                buscador.style.color = '#ffffff';
                buscador.style.borderColor = '#555';
                
                // Links del menú
                const menuLinks = document.querySelectorAll('.menu a');
                menuLinks.forEach(link => {
                    link.style.color = '#ffffff';
                });
                
                botonColor.textContent = 'Modo Claro';
                botonColor.style.backgroundColor = '#333';
                botonColor.style.color = '#fff';
                botonColor.style.borderColor = '#555';
                // Pequeño delay para asegurar que las tarjetas ya estén en el DOM
                setTimeout(function() {
                    cambiarEstiloTarjetas(true);
                }, 100);
            }

    // Guardar estado en variable global para acceder desde main.js
    window.modoOscuroActivo = esModoOscuro;












    // Observador para detectar cuando se agreguen tarjetas al DOM
        const observador = new MutationObserver(function()  {
            const colorGuardado = localStorage.getItem('colorPagina');
            if (colorGuardado === 'oscuro')  {
                cambiarEstiloTarjetas(true);
            }
        });

        observador.observe(document.getElementById('contenedor-noticias'), { childList: true });
    }




// Funcion para cambiar el estilo de las tarjetas de noticias
function cambiarEstiloTarjetas(esOscuro)  {
    const tarjetas = document.querySelectorAll('.noticia-card');
    tarjetas.forEach(card => {
        if (esOscuro)  {
            card.style.backgroundColor = '#2d2d2d';
            card.style.borderColor = '#555';
            card.style.color = '#ffffff';
        } else  {
            card.style.backgroundColor = '#ffffff';
            card.style.borderColor = '#000000';
            card.style.color = '#000000';
        }
    });
}

window.addEventListener('load', function()  {
    crearBotonCambiarColor();
});

