const panel = document.getElementById("panel"); //panel para modificar

// elementos para generar vista previa y modificar
const nuevoTitulo = document.getElementById("nuevo-titulo"); 
const nuevoTexto = document.getElementById("nuevo-texto");
const nuevoImagen = document.getElementById("nuevo-imagen");
const guardar = document.getElementById("guardar");


// elementos para login
const mensaje         = document.getElementById("mensaje");
const zonaLogin      = document.getElementById("zonaLogin");
const zonaBienvenida = document.getElementById("zonaBienvenida");
const btnLogin       = document.getElementById("btnLogin");
const btnSalir       = document.getElementById("btnSalir");
const inputUsuario   = document.getElementById("usuario");
const inputPassword  = document.getElementById("password");
const salir = document.getElementById("salir");

// Variable para rastrear si se está editando una noticia
let noticiasEnEdicion = -1;

// mostrar noticias actuales
const NEWS_KEY = "noticias";
const listaNoticiasContainer = document.getElementById("lista-noticias");


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
    listaNoticiasContainer.innerHTML = "<p>No hay noticias aún.</p>";
    return;
  }

  noticias.forEach(function (n, index) {
    const item = document.createElement("div");
    item.className = "noticia-item";

    const descripcion = n.descripcion || "";

    // Imagen (opcional)
    if (n.imagen) {
      const img = document.createElement("img");
      img.src = n.imagen;
      img.style.maxWidth = "150px";
      img.style.display = "block";
      img.style.marginBottom = "6px";
      item.appendChild(img);
    }

    // Título
    const titulo = document.createElement("h3");
    titulo.textContent = n.titulo;

    // Texto
    const texto = document.createElement("p");
    texto.textContent = descripcion;

    // Botones
    const acciones = document.createElement("div");
    acciones.className = "noticia-acciones";

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.addEventListener("click", function () {
      editarNoticia(index);
    });

    const btnBorrar = document.createElement("button");
    btnBorrar.textContent = "Borrar";
    btnBorrar.addEventListener("click", function () {
      borrarNoticia(index);
    });

    acciones.appendChild(btnEditar);
    acciones.appendChild(btnBorrar);

    // Armar todo
    item.appendChild(titulo);
    item.appendChild(texto);
    item.appendChild(acciones);

    listaNoticiasContainer.appendChild(item);
  });
}

function agregarNoticia() {
  const titulo = nuevoTitulo.value.trim();
  const texto = nuevoTexto.value.trim();
  const imagen = nuevoImagen.value.trim();
  if (!titulo || !texto) {
    alert('Completá todos los campos.');
    return;
  }
  const noticias = cargarNoticias();
  
  if (noticiasEnEdicion >= 0 && noticiasEnEdicion < noticias.length) {
      noticias[noticiasEnEdicion] = { 
        titulo, 
        descripcion: texto, 
        imagen: imagen
      };
      guardarNoticias(noticias);
      renderNoticias();
      nuevoTitulo.value = "";
      nuevoTexto.value = "";
      nuevoImagen.value = "";
      guardar.textContent = "Agregar noticia";
      noticiasEnEdicion = -1;
      alert('La noticia fue modificada correctamente.');
      window.location.href = 'index.html'; 
    } else {

    // Modo agregar: crear noticia nueva
    noticias.unshift({ titulo, descripcion: texto, imagen: imagen });
    guardarNoticias(noticias);
    renderNoticias();
    nuevoTitulo.value = "";
    nuevoTexto.value = "";
    nuevoImagen.value = "";
    alert('La noticia fue agregada correctamente.');
    window.location.href = 'index.html';
  }
}

function editarNoticia(index) {
  const noticias = cargarNoticias();
  if (index < 0 || index >= noticias.length) return;
  
  const n = noticias[index];
  nuevoTitulo.value = n.titulo;
  nuevoTexto.value = n.descripcion || "";
  nuevoImagen.value = n.imagen || "";
  
  noticiasEnEdicion = index;
  guardar.textContent = "Guardar cambios";
  
  // Mostrar botón cancelar
  const btnCancelar = document.getElementById('cancelar-edicion');
  if (btnCancelar) btnCancelar.style.display = "inline-block";

  // Scroll al formulario para que vea los cambios
  document.querySelector('.form-agregar').scrollIntoView({ behavior: 'smooth' });
}

function cancelarEdicion() {
  nuevoTitulo.value = "";
  nuevoTexto.value = "";
  nuevoImagen.value = "";
  
  noticiasEnEdicion = -1;
  guardar.textContent = "Agregar noticia";
  
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
  window.location.href = 'index.html';
}

// conectar boton guardar al nuevo comportamiento
guardar.addEventListener('click', function (e) {
  e.preventDefault();
  agregarNoticia();
});

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
if (!localStorage.getItem(NEWS_KEY)) {
  guardarNoticias([]);
}

// render inicial
document.addEventListener('DOMContentLoaded', function () {
  renderNoticias();
  iniciarApp();
});
//  Cuando arranca la página, ¿hay un token guardado?
//  Si ya hay token, el usuario ya se logueó antes -> pedimos sus datos.
function iniciarApp() {
  const token = sessionStorage.getItem("token");

  if (token) {
    mostrarBienvenida();
  }
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
      sessionStorage.setItem("token", data.accessToken);  // guardar al navegador en session
      
      sessionStorage.setItem("usuario", JSON.stringify(data));
      
      mostrarBienvenida();
    })
    .catch(function (error) {  // otros errores
      mensaje.textContent = error.message;
    });
});

// cambia la vista de login a panel de admin
function mostrarBienvenida() {
  zonaLogin.hidden = true;
  zonaBienvenida.hidden = false;
  panel.classList.remove("oculto");
}

function cerrarSesion() {
  sessionStorage.removeItem("token");
  zonaLogin.hidden      = false;
  zonaBienvenida.hidden = true;
  panel.classList.add("oculto");
}

//  cerrar sesion
btnSalir.addEventListener("click", cerrarSesion);
salir.addEventListener("click", cerrarSesion);