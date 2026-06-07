// noticias hardcodeadas (se mostrarán junto con las guardadas en localStorage)
let noticias = [
    {
        titulo: "Un estudiante sin título universitario resuelve con ChatGPT un problema matemático que mantuvo en jaque a expertos durante 60 años",
        descripcion: "La IA encontró en 80 minutos un enfoque que ningún humano había probado. Los matemáticos admiten: 'Todos partimos de una premisa equivocada'.",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRb3sPcO4dEsfjX36uzZv0tG6AnJTwTuu-Xw&s"
    },
    {
        titulo: "Top 5 mejores looks de la Met Gala 2026 según críticos de Vogue",
        descripcion: "Del esqueleto enjoyado de Beyoncé al efecto 'mármol líquido' de Heidi Klum, pasando por Ayo Edebiri con un vestido que latía al ritmo de su corazón. Los críticos de Vogue eligieron los cinco outfits que convirtieron la alfombra roja en una galería de arte viviente.",
        imagen: "https://ew.com/thmb/5p-xhIw9L3HLUuUbmE3XXKOeMeI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Sabrina-Carpenter-Jordan-Roth-Lisa-Met-Gala-050426-483bed10e2ae42c191ad2853afd3e822.jpg"
    },
    {
        titulo: "Ministra de Economía envía mensaje por error al grupo de WhatsApp del gabinete y desata crisis interna",
        descripcion: "'Estos no saben nada, yo soluciono todo mientras ellos se sacan selfies', escribió la funcionaria pensando que hablaba en privado con su asesor. El Presidente pidió 'reflexión interna' y tres secretarios ya presentaron renuncias indeclinables.",
        imagen: "https://fotos.perfil.com//2022/10/24/900/0/sergio-massa-1441266.jpg"
    },
    {
        titulo: "Alcaraz enciende las alarmas tras confirmar su ausencia en Roland Garros, y afirmar que no sabe si jugará Wimbledon",
        descripcion: "El tenista murciano sufrió una recaída en la zona del antebrazo que lo había marginado varios meses en 2025. Los médicos recomiendan reposo total y el equipo guarda silencio sobre los plazos. Mientras tanto, Jannik Sinner ya suma tres títulos consecutivos y extiende su ventaja en la cima del ranking. 'Es una pena, pero yo tengo que seguir', declaró el italiano al ser consultado",
        imagen: "https://estaticos-cdn.prensaiberica.es/clip/6c91762a-ac16-43c0-9d88-c23af0eb1b21_alta-libre-aspect-ratio_default_0.jpg"
    },
    {
        titulo: "Samanta Schweblin factura un millón de euros y los críticos todavía discuten si sus cuentos son geniales o perturbadores",
        descripcion: "La escritora argentina ganó el Premio Aena de Narrativa 2026, el más millonario de España, por su última colección de cuentos. El jurado habló de 'prosa hipnótica y mundos incómodos'. Los lectores, mientras tanto, siguen sin dormir después del tercer cuento.",
        imagen: "https://cdn.zendalibros.com/wp-content/uploads/2025/03/ivan_gimenez_-_seix_barral_02-scaled.jpg"
    },
    {
        titulo: "Aumentan un 200% las consultas por ansiedad laboral entre jóvenes",
        descripcion: "Profesionales de la salud mental alertan sobre una 'generación quemada' antes de los 30. Los principales desencadenantes son la sobrecarga laboral, el home office sin límites y el miedo constante a ser reemplazado. 'No es falta de voluntad, es falta de aire', resume una psicóloga especializada.",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQeHcgQjyeO5CIs3XHD-jeO_ZWeB-ymg4CVQ&s"
    }

];

const NEWS_KEY = "noticias";

function inicializarNoticias() {
    const raw = localStorage.getItem(NEWS_KEY);

    if (!raw || raw === "[]") {
        const noticiasConFecha = noticias.map(n => ({
            ...n,
            fecha: new Date().toISOString()
        }));

        localStorage.setItem(NEWS_KEY, JSON.stringify(noticiasConFecha));

        console.log("Noticias inicializadas en main.js");
    }
}

// Si el admin guardó noticias en localStorage, usarlas. Si no, usar las hardcodeadas
try {
    const raw = localStorage.getItem('noticias');
    if (raw) {
        const stored = JSON.parse(raw);
        if (Array.isArray(stored) && stored.length > 0) {
            noticias = stored;
        }
    }
} catch (e) {
    console.log('No se pudieron cargar noticias desde localStorage:', e);
}

// noticias en el dom
function mostrarNoticias(filtro = "") {
    const contenedor = document.getElementById('contenedor-noticias');
   
    contenedor.innerHTML = "";

    for (let i = 0; i < noticias.length; i++) {
        if (noticias[i].titulo.toLowerCase().includes(filtro.toLowerCase())) {
        
            // Contenedor de cada noticia
            const card = document.createElement('div');
            card.classList.add("noticia-card");
            

            // Imagen
            const img = document.createElement('img');
            img.src = noticias[i].imagen;
            img.style.width = "100%";

            // Título
            const titulo = document.createElement('h2');
            titulo.textContent = noticias[i].titulo;

            // Descripción
            const desc = document.createElement('p');
            desc.textContent = noticias[i].descripcion;

            // Agregar todo al card
            card.appendChild(img);
            card.appendChild(titulo);
            card.appendChild(desc);

            // Agregar card al contenedor
            contenedor.appendChild(card);
        }
    }

}

document.getElementById('buscador').addEventListener('input', function(event) {
    mostrarNoticias(event.target.value);
});

// Ejecutar al cargar
window.addEventListener('load', function() {
    inicializarNoticias();
    mostrarNoticias();
    
    // Verificar si el usuario está logueado y actualizar el texto del menú
    const tokenGuardado = sessionStorage.getItem("token");
    const enlaceLogin = document.getElementById("enlace-login");
    if (enlaceLogin) {
        if (tokenGuardado) {
    const usuario = JSON.parse(sessionStorage.getItem("usuario"));

    if (usuario) {
        enlaceLogin.innerHTML = `
            <img src="${usuario.image}" style="width:30px;height:30px;border-radius:50%;vertical-align:middle;">
            ${usuario.firstName}•(Panel de admin)
        `;
    } else {
        enlaceLogin.textContent = "👩🏻‍💻Loguearse";
    }}}
});