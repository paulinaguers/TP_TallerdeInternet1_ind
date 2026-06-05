const panel = document.getElementById("panel");
const nuevoTitulo = document.getElementById("nuevo-titulo");
const nuevoTexto = document.getElementById("nuevo-texto");
const nuevoImagen = document.getElementById("nuevo-imagen");
const guardar = document.getElementById("guardar");

const tituloNoticia = document.getElementById("titulo-noticia");
const textoNoticia = document.getElementById("texto-noticia");

const salir = document.getElementById("salir");

// Variable para rastrear si se está editando una noticia
let noticiasEnEdicion = -1;

const btnLogin       = document.getElementById("btnLogin");
const btnSalir       = document.getElementById("btnSalir");
const inputUsuario   = document.getElementById("usuario");
const inputPassword  = document.getElementById("password");
const mensaje        = document.getElementById("mensaje");

const zonaLogin      = document.getElementById("zonaLogin");
const zonaBienvenida = document.getElementById("zonaBienvenida");

const nombre = document.getElementById("nombre");
const email  = document.getElementById("email");
const foto   = document.getElementById("foto");

// Noticias: almacenamiento y render
const NEWS_KEY = "noticias";
const listaNoticiasContainer = document.getElementById("lista-noticias");

// Noticias hardcodeadas (igual que en main.js)
const noticiasHardcodeadas = [
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

function cargarNoticias() {
  const raw = localStorage.getItem(NEWS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function guardarNoticias(noticias) {
  localStorage.setItem(NEWS_KEY, JSON.stringify(noticias));
}

function renderNoticias() {
  if (!listaNoticiasContainer) return;
  listaNoticiasContainer.innerHTML = "";
  
  const noticias = cargarNoticias();
  
  if (noticias.length === 0) {
    listaNoticiasContainer.innerHTML = '<p>No hay noticias aún.</p>';
    return;
  }
  
  noticias.forEach(function(n, index){
    const item = document.createElement("div");
    item.className = "noticia-item";
    
    const descripcion = n.descripcion || n.texto || "";
    const imagenHtml = n.imagen ? `<img src="${escapeHtml(n.imagen)}" alt="" style="max-width:150px;display:block;margin-bottom:6px;">` : "";
    
    // Todas las noticias pueden editarse/borrarse
    item.innerHTML = `
      ${imagenHtml}
      <h3>${escapeHtml(n.titulo)}</h3>
      <p>${escapeHtml(descripcion)}</p>
      <div class="noticia-meta">${n.fecha ? new Date(n.fecha).toLocaleString() : 'Sin fecha'}</div>
      <div class="noticia-acciones">
        <button class="editar-noticia" data-index="${index}">Editar</button>
        <button class="borrar-noticia" data-index="${index}">Borrar</button>
      </div>
    `;
    listaNoticiasContainer.appendChild(item);
  });
  
  listaNoticiasContainer.querySelectorAll('.editar-noticia').forEach(btn => {
    btn.addEventListener('click', function(){
      const idx = parseInt(this.dataset.index, 10);
      editarNoticia(idx);
    });
  });
  
  listaNoticiasContainer.querySelectorAll('.borrar-noticia').forEach(btn => {
    btn.addEventListener('click', function(){
      const idx = parseInt(this.dataset.index, 10);
      borrarNoticia(idx);
    });
  });
}

function agregarNoticia() {
  const titulo = nuevoTitulo.value.trim();
  const texto = nuevoTexto.value.trim();
  const imagen = nuevoImagen ? nuevoImagen.value.trim() : "";
  if (!titulo || !texto) {
    alert('Completá todos los campos.');
    return;
  }
  const noticias = cargarNoticias();
  
  if (noticiasEnEdicion >= 0) {
    // Modo edición: actualizar noticia existente
    if (noticiasEnEdicion < noticias.length) {
      noticias[noticiasEnEdicion] = { 
        titulo, 
        descripcion: texto, 
        imagen: imagen, 
        fecha: noticias[noticiasEnEdicion].fecha 
      };
      guardarNoticias(noticias);
      renderNoticias();
      tituloNoticia.textContent = titulo;
      textoNoticia.textContent = texto;
      nuevoTitulo.value = "";
      nuevoTexto.value = "";
      if (nuevoImagen) nuevoImagen.value = "";
      guardar.textContent = "Agregar noticia";
      noticiasEnEdicion = -1;
      alert('La noticia fue modificada correctamente.');
      try { window.location.href = 'index.html'; } catch (e) { console.log('No se pudo abrir index:', e); }
    }
  } else {
    // Modo agregar: crear noticia nueva
    noticias.unshift({ titulo, descripcion: texto, imagen: imagen, fecha: new Date().toISOString() });
    guardarNoticias(noticias);
    renderNoticias();
    tituloNoticia.textContent = titulo;
    textoNoticia.textContent = texto;
    nuevoTitulo.value = "";
    nuevoTexto.value = "";
    if (nuevoImagen) nuevoImagen.value = "";
    alert('La noticia fue agregada correctamente.');
    try { window.location.href = 'index.html'; } catch (e) { console.log('No se pudo abrir index:', e); }
  }
}

function editarNoticia(index) {
  const noticias = cargarNoticias();
  if (index < 0 || index >= noticias.length) return;
  
  const n = noticias[index];
  nuevoTitulo.value = n.titulo;
  nuevoTexto.value = n.descripcion || n.texto || "";
  if (nuevoImagen) nuevoImagen.value = n.imagen || "";
  
  noticiasEnEdicion = index;
  guardar.textContent = "Guardar cambios";
  
  // Mostrar botón cancelar
  const btnCancelar = document.getElementById('cancelar-edicion');
  if (btnCancelar) btnCancelar.style.display = "inline-block";
  
  tituloNoticia.textContent = n.titulo;
  textoNoticia.textContent = n.descripcion || n.texto || "";
  
  // Scroll al formulario para que vea los cambios
  document.querySelector('.form-agregar').scrollIntoView({ behavior: 'smooth' });
}

function cancelarEdicion() {
  nuevoTitulo.value = "";
  nuevoTexto.value = "";
  if (nuevoImagen) nuevoImagen.value = "";
  
  noticiasEnEdicion = -1;
  guardar.textContent = "Agregar noticia";
  
  tituloNoticia.textContent = "Título de la noticia";
  textoNoticia.textContent = "Texto de la noticia";
  
  // Ocultar botón cancelar
  const btnCancelar = document.getElementById('cancelar-edicion');
  if (btnCancelar) btnCancelar.style.display = "none";
}

function borrarNoticia(index) {
  const noticias = cargarNoticias();
  if (index < 0 || index >= noticias.length) return;
  if (!confirm('¿Querés borrar esta noticia?')) return;
  noticias.splice(index, 1);
  guardarNoticias(noticias);
  renderNoticias();
  // Volver a la página principal en la misma pestaña para revisar cambios
  try { window.location.href = 'index.html'; } catch (e) { console.log('No se pudo abrir index:', e); }
}

// conectar boton guardar al nuevo comportamiento
if (guardar) {
  guardar.addEventListener('click', function (e) {
    e.preventDefault();
    agregarNoticia();
  });
}
// conectar botón cancelar edición
const btnCancelar = document.getElementById('cancelar-edicion');
if (btnCancelar) {
  btnCancelar.addEventListener('click', function (e) {
    e.preventDefault();
    cancelarEdicion();
  });
}
// botón para ver la página principal desde admin
const btnVerMain = document.getElementById('ver-main');
if (btnVerMain) {
  btnVerMain.addEventListener('click', function () {
    window.location.href = 'index.html';
  });
}

// Inicializar localStorage con noticias hardcodeadas si está vacío (se ejecuta apenas carga el script)
function inicializarNoticiasGuardadas() {
  const noticiasGuardadas = localStorage.getItem(NEWS_KEY);
  if (!noticiasGuardadas || noticiasGuardadas === '[]') {
    // Copiar noticias hardcodeadas a localStorage para que se puedan editar/borrar
    const noticiasConFecha = noticiasHardcodeadas.map(n => ({
      ...n,
      fecha: new Date().toISOString()
    }));
    guardarNoticias(noticiasConFecha);
    console.log('Noticias inicializadas en localStorage:', noticiasConFecha.length);
  } else {
    console.log('Noticias ya existen en localStorage');
  }
}

// Inicializar apenas se carga el script (antes del DOMContentLoaded)
inicializarNoticiasGuardadas();

// render inicial
document.addEventListener('DOMContentLoaded', function(){
  renderNoticias();
});

//  Cuando arranca la página, ¿hay un token guardado?
//  Si ya hay token, el usuario ya se logueó antes -> pedimos sus datos.
const tokenGuardado = sessionStorage.getItem("token");
if (tokenGuardado) {
  obtenerDatosDelUsuario(tokenGuardado);
}


//  Cuando el usuario hace click en "Ingresar", mandamos
//  usuario + password a la API. Si está bien, nos devuelve un token.
btnLogin.addEventListener("click", function () {

  const datos = {
    username: inputUsuario.value,
    password: inputPassword.value
  };

  fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos)
  })
    .then(function (respuesta) {
      if (!respuesta.ok) {  // error 400 por credenciales inexistentes
        throw new Error("Usuario o contraseña incorrectos");
      }
      return respuesta.json();
    })
    .then(function (data) {
      console.log("Respuesta del login:", data);
      sessionStorage.setItem("token", data.accessToken);  // guardar al navegador en session
      mostrarBienvenida(data);
    })
    .catch(function (error) {  // otros errores
      mensaje.textContent = error.message;
    });
});

function obtenerDatosDelUsuario(token) {
  fetch("https://dummyjson.com/auth/me", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    }
  })
    .then(function (respuesta) {
      if (!respuesta.ok) {
        throw new Error("Token inválido o vencido");
      }
      return respuesta.json();
    })
    .then(function (data) {
      mostrarBienvenida(data);
    })
    .catch(function (error) {
      console.log("Error:", error.message);
      sessionStorage.removeItem("token");  // si el token no sirve, lo borramos y mostramos el login otra vez
    });
}

function mostrarBienvenida(data) {
  zonaLogin.hidden      = true;
  zonaBienvenida.hidden = false;
  panel.classList.remove("oculto");

  nombre.textContent = data.firstName + " " + data.lastName;
  email.textContent  = data.email;
  foto.src           = data.image;
  mensaje.textContent = "";
}

function cerrarSesion() {
  sessionStorage.removeItem("token");
  zonaLogin.hidden      = false;
  zonaBienvenida.hidden = true;
  panel.classList.add("oculto");
  mensaje.textContent   = "";
}

//  cerrar sesion
btnSalir.addEventListener("click", cerrarSesion);
salir.addEventListener("click", cerrarSesion);

// Función para actualizar el texto del enlace de login en index.html
function actualizarEnlaceLogin() {
  const enlaceLogin = document.getElementById("enlace-login");
  if (!enlaceLogin) return;
  
  const tokenGuardado = sessionStorage.getItem("token");
  if (tokenGuardado) {
    enlaceLogin.textContent = " 👩🏻‍💻Panel de admin";
  } else {
    enlaceLogin.textContent = " 👩🏻‍💻Loguearse";
  }
}
