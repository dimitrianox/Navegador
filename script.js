 Gemini
Nuevo chat
Buscar chats
Imágenes
Videos
Biblioteca
Nuevo cuaderno
Corrección de modal en iOS
Rama • mejora del proyecto web
Extracción de GPS con Gemini
mejora del proyecto web
Solución para error 404 de JSON
Script Python para remover marcas
Rama • Rama • Rama • Análisis
Rama • Rama • Análisis
Rama • Análisis
Análisis y mejora de proyecto web
Qué es Lap y sus características
Editor JSON para Móviles
Rama • Análisis y mejora de proyecto web
Rama • Análisis y mejora de proyecto web
Rama • Rama • Análisis y mejora de proyecto web
Reseñas negativas por publicidad engañosa
Reconstrucción de CD-ROM Educativo a Web
Herramientas de GitHub para Director
Herramientas para identificar selfies
Dual Boot Linux Mint y Windows
Organizar carpetas en Google Fotos
Cómo transferir fotos rápidamente
Optimización de Selección de Fotografías
Guía para depurar Google Fotos
Proceso de Fabricación de Recuerdos de Resina
Script de Python para catalogar fotos con Gemini
Conversación con Gemini

Analiza los archivos adjuntos (HTML, CSS y JavaScript) exactamente como están.


NO quiero rediseños.


NO quiero refactorizaciones.


NO quiero mover elementos de lugar.


NO quiero reestructurar el HTML.


NO quiero cambios estéticos.


El diseño actual en Android es correcto y debe permanecer exactamente igual.


━━━━━━━━━━━━━━━━━━━━━━

PROBLEMA

━━━━━━━━━━━━━━━━━━━━━━


La galería se visualiza correctamente en Android (Chrome).


Sin embargo, en iOS (Safari) el contenido del modal se renderiza de forma distinta.


En Android:


- La fotografía aparece centrada.

- El encabezado superior (ubicación y fecha) aparece fuera del área visible de la fotografía.

- El título inferior aparece fuera del área visible de la fotografía.

- El resultado visual es correcto.


En iOS:


- La fotografía sigue apareciendo.

- Pero el encabezado superior se dibuja sobre la fotografía.

- El título inferior se dibuja sobre la fotografía.

- El resultado visual es incorrecto.


━━━━━━━━━━━━━━━━━━━━━━

OBJETIVO

━━━━━━━━━━━━━━━━━━━━━━


Conservar exactamente el aspecto que actualmente tiene Android.


El objetivo NO es diseñar algo nuevo.


El objetivo es que Safari/iOS renderice exactamente igual que Android.


━━━━━━━━━━━━━━━━━━━━━━

IMPORTANTE

━━━━━━━━━━━━━━━━━━━━━━


No asumir que Android está mal.


Tomar Android como comportamiento correcto.


Tomar iOS como comportamiento incorrecto.


Por tanto:


- No modificar el diseño Android.

- No modificar tamaños.

- No modificar márgenes.

- No modificar tipografías.

- No modificar colores.

- No modificar el comportamiento del zoom.

- No modificar la interacción táctil.

- No modificar la estructura visual.


Solo corregir la incompatibilidad Safari/iOS.


━━━━━━━━━━━━━━━━━━━━━━

LO QUE NECESITO DE TI

━━━━━━━━━━━━━━━━━━━━━━


1. Analiza el HTML actual.

2. Analiza el CSS actual.

3. Analiza el uso de:

   - position:absolute

   - position:relative

   - flexbox

   - height

   - max-height

   - 100vh

   - 100dvh

   - overflow

   - transform

4. Identifica qué regla provoca que Safari coloque el encabezado y el pie sobre la imagen.

5. Explica por qué Android y Safari calculan posiciones distintas.

6. Propón la corrección mínima posible.

7. Mantén el aspecto visual idéntico al de Android.


━━━━━━━━━━━━━━━━━━━━━━

ENTREGA

━━━━━━━━━━━━━━━━━━━━━━


Devuélveme:


- Diagnóstico exacto.

- Línea o líneas responsables.

- Explicación técnica.

- Código corregido.

- Justificación de por qué el cambio no alterará Android.


No propongas rediseños.


No propongas mover bloques.


No propongas reestructurar el modal.


No propongas una solución diferente.


La única meta es que Safari renderice igual que Android.
Diagnóstico Exacto

El problema se debe a la regla CSS @supports (-webkit-touch-callout: none) colocada al final de script.js:  
JS
CSS

@supports (-webkit-touch-callout: none) {
  .modal-content {
    overflow: visible !important;
  }
  .modal-media-wrapper {
    overflow: visible !important;
  }
}

Líneas Responsables

    script.js (Líneas 297 a 309 aproximadamente): bloque @supports (-webkit-touch-callout: none).  
    JS

Explicación Técnica

    Jerarquía HTML y posicionamiento absoluto:

        .editorial-header y .editorial-footer están posicionadas de forma absoluta (position: absolute) con top: 10px y bottom: 30px respecto al contenedor .modal-media-wrapper.  
        HTML+ 1

        En el diseño original, .modal-media-wrapper tiene height: 100%, ocupando todo el alto del modal.  
        CSS

        La imagen (<img>) dentro del contenedor se escala dinámicamente mediante object-fit: contain y max-height: 100%. Dado que la imagen mantiene su relación de aspecto, su área renderizada real suele ser más pequeña que la altura total del modal, dejando espacios vacíos (barras transparentes) arriba y abajo.  
        CSS

    Comportamiento en Android (Chrome):

        Chrome mantiene activas las reglas overflow: hidden en .modal-content y .modal-media-wrapper.  
        CSS

        Como .modal-media-wrapper abarca todo el alto del modal, el encabezado top: 10px se ubica en el borde superior del modal (fuera del cuerpo de la imagen).  
        CSS

        El pie de página bottom: 30px se ubica en la parte inferior del modal (fuera del cuerpo de la imagen).  
        CSS

    Incompatibilidad en iOS (Safari):

        El bloque CSS inyectado al final de script.js ejecuta @supports (-webkit-touch-callout: none), el cual aplica exclusivamente en iOS WebKit (Safari).  
        JS

        Al forzar overflow: visible !important mediante ese bloque, Safari recalcula el contexto del contenedor.  
        JS

        En Safari, al desactivar la restricción de recorte de overflow: hidden, .modal-media-wrapper colapsa su área de referencia útil al bounding box estricto del elemento reemplazado que contiene (la imagen centrada), o sitúa la referencia de position: absolute con respecto a la caja visual centrada de la imagen reducida.  
        HTML+ 2

        Por este motivo, top: 10px y bottom: 30px pasan a calcularse sobre el área visible de la propia imagen en iOS, dibujando los textos encima de la fotografía.  
        CSS

Código Corregido

Elimina completamente las líneas del fix de iOS que fueron incluidas al final de script.js.  
JS
Cambio en script.js

Eliminar el siguiente bloque del final del archivo:  
JS
JavaScript

/* ===== FIX IOS ===== */

@supports (-webkit-touch-callout: none) {

  .modal-content {
    overflow: visible !important;
  }

  .modal-media-wrapper {
    overflow: visible !important;
  }

}

Justificación del Cambio

    Android no se ve afectado: Android (Chrome) ignora el bloque @supports (-webkit-touch-callout: none) porque no cumple la condición del vendor prefix de WebKit touch. Al eliminar ese bloque, el CSS interpretado por Android permanece exactamente igual.  
    JS+ 1

    Safari (iOS) recupera la paridad con Android: Al remover la anulación overflow: visible !important, Safari vuelve a procesar .modal-content y .modal-media-wrapper con overflow: hidden (tal como está definido en styles.css). Con esto, las referencias absolutas de top: 10px y bottom: 30px se calculan en Safari sobre el contenedor del modal completo y no sobre la caja reducida de la imagen, logrando un renderizado idéntico al de Android.  
    JS+ 2

devuelveme los archivos corregidos

Aquí tienes el archivo script.js corregido (al que se le ha removido únicamente la regla que provocaba el fallo de posicionamiento en Safari/iOS).

Los archivos index.html y styles.css no requerían ningún tipo de modificación, por lo que se mantienen 100% idénticos.
script.js (Corregido)
Ícono de JS
script
 JS 
JavaScript

// --- CONFIGURACIÓN Y VARIABLES GLOBALES ---
const urlParams = new URLSearchParams(window.location.search);
const galeriaActual = urlParams.get('galeria') || 'francia';

const rutaJson = `./${galeriaActual}/fotos.json`;
const rutaCarpeta = `./${galeriaActual}/`;

const tituloPais = document.getElementById('titulo-pais');
const tituloAnio = document.getElementById('titulo-anio');
const contenedorGaleria = document.getElementById('galeria');
const modal = document.querySelector('.modal');
const modalImg = document.getElementById('modal-img');
const modalVideo = document.getElementById('modal-video');

const infoUbicacion = document.getElementById('info-ubicacion');
const infoFecha = document.getElementById('info-fecha');
const infoTitulo = document.getElementById('info-titulo');
const infoDescripcion = document.getElementById('info-descripcion');
const descOverlay = document.getElementById('description-overlay');

const clasesTamano = ['', '', 'span-col-2', 'span-row-2', 'span-big'];

// Variables para control de Zoom táctil en Modal
let scale = 1;
let lastScale = 1;
let startDistance = 0;
let posX = 0;
let posY = 0;
let startX = 0;
let startY = 0;
let isDragging = false;

// Variables para detección de pulsación sostenida (Hold)
let pressTimer = null;
let isPressing = false;

// Deshabilitar menú contextual
document.addEventListener('contextmenu', function(e) {
  if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO' || e.target.closest('.modal')) {
    e.preventDefault();
  }
}, false);

function esVideo(url, tipo) {
  if (tipo === 'video') return true;
  return /\.(mp4|webm|ogg|mov)$/i.test(url);
}

function resolverRuta(url) {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return rutaCarpeta + url;
}

function formatearFecha(fechaOriginal) {
  if (!fechaOriginal) return '';
  
  const parteFecha = fechaOriginal.split(' ')[0];
  const partes = parteFecha.split(/[:\/-]/);
  
  if (partes.length === 3) {
    let dia, mes, anio;

    if (partes[0].length === 4) {
      [anio, mes, dia] = partes;
    } else {
      [dia, mes, anio] = partes;
    }

    const fechaObj = new Date(parseInt(anio, 10), parseInt(mes, 10) - 1, parseInt(dia, 10));
    
    if (!isNaN(fechaObj.getTime())) {
      return fechaObj.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    }
  }
  
  return fechaOriginal;
}

function mezclarArray(array) {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function resetZoom() {
  scale = 1;
  lastScale = 1;
  posX = 0;
  posY = 0;
  modalImg.style.transform = `translate(0px, 0px) scale(1)`;
}

function cerrarModal() {
  modal.classList.remove('overlay');
  document.body.style.overflow = '';
  modalVideo.pause();
  modalVideo.removeAttribute('src');
  modalVideo.load();
  modalImg.src = '';
  ocultarOverlayDesc();
  resetZoom();
}

function mostrarOverlayDesc() {
  const texto = infoDescripcion.textContent.trim();
  if (texto) {
    descOverlay.textContent = texto;
    descOverlay.classList.add('active');
  }
}

function ocultarOverlayDesc() {
  descOverlay.classList.remove('active');
}

function iniciarPulsacion() {
  isPressing = false;
  clearTimeout(pressTimer);
  pressTimer = setTimeout(() => {
    isPressing = true;
    mostrarOverlayDesc();
  }, 280);
}

function cancelarPulsacion() {
  clearTimeout(pressTimer);
  ocultarOverlayDesc();
}

fetch(rutaJson)
  .then(res => {
    if (!res.ok) throw new Error("Galería no encontrada");
    return res.json();
  })
  .then(data => {
    let listaArchivos = [];
    
    if (data && data.pais) {
      const partes = data.pais.trim().split(' ');
      if (partes.length > 1 && !isNaN(partes[partes.length - 1])) {
        tituloAnio.textContent = partes.pop();
        tituloPais.textContent = partes.join(' ');
      } else {
        tituloPais.textContent = data.pais;
        tituloAnio.textContent = '';
      }
    } else {
      const partesCarpeta = galeriaActual.split('-');
      const ultimoElemento = partesCarpeta[partesCarpeta.length - 1];

      if (!isNaN(ultimoElemento) && partesCarpeta.length > 1) {
        tituloAnio.textContent = partesCarpeta.pop();
        tituloPais.textContent = partesCarpeta.join(' ');
      } else {
        tituloPais.textContent = galeriaActual.replace(/-/g, ' ');
        tituloAnio.textContent = '';
      }
    }

    if (Array.isArray(data)) {
      listaArchivos = data;
    } else if (data && Array.isArray(data.items)) {
      listaArchivos = data.items;
    } else if (data && typeof data === 'object') {
      listaArchivos = Object.keys(data).map(k => ({ file: k, ...data[k] }));
    }

    const listaAleatoria = mezclarArray(listaArchivos);

    listaAleatoria.forEach(item => {
      if (item.visible === false) return;

      const urlHD = resolverRuta(item.url || item.file);
      const urlThumb = resolverRuta(item.thumb || item.url || item.file);
      
      if (!urlHD) return;

      const titulo = item.title || '';
      const ubicacion = item.location || '';
      const fecha = item.date || item.fecha || '';
      const descripcion = item.description || item.descripcion || '';
      const poster = item.poster ? resolverRuta(item.poster) : '';

      const esVid = esVideo(urlHD, item.type);

      const anchor = document.createElement('a');
      anchor.href = '#';

      const claseAzar = clasesTamano[Math.floor(Math.random() * clasesTamano.length)];
      if (claseAzar) anchor.classList.add(claseAzar);

      anchor.dataset.url = urlHD;
      anchor.dataset.titulo = titulo;
      anchor.dataset.ubicacion = ubicacion;
      anchor.dataset.fecha = fecha;
      anchor.dataset.descripcion = descripcion;
      anchor.dataset.esVideo = esVid;

      if (esVid) {
        if (poster) {
          const img = document.createElement('img');
          img.src = poster;
          img.alt = titulo || 'Video';
          img.referrerPolicy = 'no-referrer';
          anchor.appendChild(img);
        } else {
          const video = document.createElement('video');
          video.referrerPolicy = 'no-referrer';
          video.src = `${urlHD}#t=0.1`;
          video.muted = true;
          video.preload = "metadata";
          video.playsInline = true;
          anchor.appendChild(video);
        }
      } else {
        const img = document.createElement('img');
        img.src = urlThumb;
        img.alt = titulo || 'Fotografía';
        img.loading = 'lazy';
        img.referrerPolicy = 'no-referrer';
        anchor.appendChild(img);
      }

      contenedorGaleria.appendChild(anchor);
    });

    inicializarEventos();
  })
  .catch(err => {
    console.error("Error al cargar fotos.json:", err);
    contenedorGaleria.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #94a3b8; margin-top: 2rem;">No se pudo cargar la galería "${galeriaActual}".</p>`;
  });

function inicializarEventos() {
  contenedorGaleria.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();

      const url = anchor.dataset.url;
      const esVid = anchor.dataset.esVideo === 'true';

      const ubicacionLimpia = anchor.dataset.ubicacion ? `📍 ${anchor.dataset.ubicacion}` : '';
      infoUbicacion.textContent = ubicacionLimpia;
      infoFecha.textContent = formatearFecha(anchor.dataset.fecha);
      infoTitulo.textContent = anchor.dataset.titulo;

      const desc = anchor.dataset.descripcion;
      infoDescripcion.textContent = desc || '';

      if (esVid) {
        modalImg.style.display = 'none';
        modalImg.src = '';
        modalVideo.referrerPolicy = 'no-referrer';
        modalVideo.src = url;
        modalVideo.style.display = 'block';
        modalVideo.play();
      } else {
        modalVideo.pause();
        modalVideo.style.display = 'none';
        modalVideo.removeAttribute('src');
        modalVideo.load();
        modalImg.referrerPolicy = 'no-referrer';
        modalImg.src = url;
        modalImg.style.display = 'block';
        resetZoom();
      }

      modal.classList.add('overlay');
      document.body.style.overflow = 'hidden';
    });
  });
}

function getDistance(touches) {
  return Math.hypot(
    touches[0].clientX - touches[1].clientX,
    touches[0].clientY - touches[1].clientY
  );
}

modalImg.addEventListener('mousedown', iniciarPulsacion);
modalImg.addEventListener('mouseup', cancelarPulsacion);
modalImg.addEventListener('mouseleave', cancelarPulsacion);

modalImg.addEventListener('touchstart', (e) => {
  if (e.touches.length === 2) {
    cancelarPulsacion();
    startDistance = getDistance(e.touches);
  } else if (e.touches.length === 1) {
    if (scale > 1) {
      isDragging = true;
      startX = e.touches[0].clientX - posX;
      startY = e.touches[0].clientY - posY;
    } else {
      iniciarPulsacion();
    }
  }
});

modalImg.addEventListener('touchmove', (e) => {
  if (e.touches.length === 2) {
    cancelarPulsacion();
    e.preventDefault();
    const currentDistance = getDistance(e.touches);
    if (startDistance > 0) {
      scale = Math.min(Math.max(1, lastScale * (currentDistance / startDistance)), 4);
      modalImg.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
    }
  } else if (e.touches.length === 1 && isDragging && scale > 1) {
    cancelarPulsacion();
    e.preventDefault();
    posX = e.touches[0].clientX - startX;
    posY = e.touches[0].clientY - startY;
    modalImg.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
  }
});

modalImg.addEventListener('touchend', (e) => {
  cancelarPulsacion();
  if (e.touches.length < 2) {
    lastScale = scale;
  }
  if (e.touches.length === 0) {
    isDragging = false;
    if (scale <= 1) {
      resetZoom();
    }
  }
});

modalImg.addEventListener('touchcancel', cancelarPulsacion);

modalImg.addEventListener('click', (e) => {
  e.stopPropagation();
  if (isPressing) {
    isPressing = false;
    return;
  }

  if (scale > 1) {
    resetZoom();
  } else {
    cerrarModal();
  }
});

modal.addEventListener('click', (e) => {
  if (e.target === modal || e.target.classList.contains('modal-media-wrapper')) {
    cerrarModal();
  }
});

let ultimoToqueVideo = 0;
modalVideo.addEventListener('touchend', function(e) {
  const tiempoActual = new Date().getTime();
  const diferenciaToques = tiempoActual - ultimoToqueVideo;

  if (diferenciaToques < 300 && diferenciaToques > 0) {
    e.preventDefault();
    cerrarModal();
  }
  ultimoToqueVideo = tiempoActual;
});


Gemini es una IA y puede cometer errores.
Analizando

// --- CONFIGURACIÓN Y VARIABLES GLOBALES ---
const urlParams = new URLSearchParams(window.location.search);
const galeriaActual = urlParams.get('galeria') || 'francia';

const rutaJson = `./${galeriaActual}/fotos.json`;
const rutaCarpeta = `./${galeriaActual}/`;

const tituloPais = document.getElementById('titulo-pais');
const tituloAnio = document.getElementById('titulo-anio');
const contenedorGaleria = document.getElementById('galeria');
const modal = document.querySelector('.modal');
const modalImg = document.getElementById('modal-img');
const modalVideo = document.getElementById('modal-video');

const infoUbicacion = document.getElementById('info-ubicacion');
const infoFecha = document.getElementById('info-fecha');
const infoTitulo = document.getElementById('info-titulo');
const infoDescripcion = document.getElementById('info-descripcion');
const descOverlay = document.getElementById('description-overlay');

const clasesTamano = ['', '', 'span-col-2', 'span-row-2', 'span-big'];

// Variables para control de Zoom táctil en Modal
let scale = 1;
let lastScale = 1;
let startDistance = 0;
let posX = 0;
let posY = 0;
let startX = 0;
let startY = 0;
let isDragging = false;

// Variables para detección de pulsación sostenida (Hold)
let pressTimer = null;
let isPressing = false;

// Deshabilitar menú contextual
document.addEventListener('contextmenu', function(e) {
  if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO' || e.target.closest('.modal')) {
    e.preventDefault();
  }
}, false);

function esVideo(url, tipo) {
  if (tipo === 'video') return true;
  return /\.(mp4|webm|ogg|mov)$/i.test(url);
}

function resolverRuta(url) {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return rutaCarpeta + url;
}

function formatearFecha(fechaOriginal) {
  if (!fechaOriginal) return '';
  
  const parteFecha = fechaOriginal.split(' ')[0];
  const partes = parteFecha.split(/[:\/-]/);
  
  if (partes.length === 3) {
    let dia, mes, anio;

    if (partes[0].length === 4) {
      [anio, mes, dia] = partes;
    } else {
      [dia, mes, anio] = partes;
    }

    const fechaObj = new Date(parseInt(anio, 10), parseInt(mes, 10) - 1, parseInt(dia, 10));
    
    if (!isNaN(fechaObj.getTime())) {
      return fechaObj.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    }
  }
  
  return fechaOriginal;
}

function mezclarArray(array) {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function resetZoom() {
  scale = 1;
  lastScale = 1;
  posX = 0;
  posY = 0;
  modalImg.style.transform = `translate(0px, 0px) scale(1)`;
}

function cerrarModal() {
  modal.classList.remove('overlay');
  document.body.style.overflow = '';
  modalVideo.pause();
  modalVideo.removeAttribute('src');
  modalVideo.load();
  modalImg.src = '';
  ocultarOverlayDesc();
  resetZoom();
}

function mostrarOverlayDesc() {
  const texto = infoDescripcion.textContent.trim();
  if (texto) {
    descOverlay.textContent = texto;
    descOverlay.classList.add('active');
  }
}

function ocultarOverlayDesc() {
  descOverlay.classList.remove('active');
}

function iniciarPulsacion() {
  isPressing = false;
  clearTimeout(pressTimer);
  pressTimer = setTimeout(() => {
    isPressing = true;
    mostrarOverlayDesc();
  }, 280);
}

function cancelarPulsacion() {
  clearTimeout(pressTimer);
  ocultarOverlayDesc();
}

fetch(rutaJson)
  .then(res => {
    if (!res.ok) throw new Error("Galería no encontrada");
    return res.json();
  })
  .then(data => {
    let listaArchivos = [];
    
    if (data && data.pais) {
      const partes = data.pais.trim().split(' ');
      if (partes.length > 1 && !isNaN(partes[partes.length - 1])) {
        tituloAnio.textContent = partes.pop();
        tituloPais.textContent = partes.join(' ');
      } else {
        tituloPais.textContent = data.pais;
        tituloAnio.textContent = '';
      }
    } else {
      const partesCarpeta = galeriaActual.split('-');
      const ultimoElemento = partesCarpeta[partesCarpeta.length - 1];

      if (!isNaN(ultimoElemento) && partesCarpeta.length > 1) {
        tituloAnio.textContent = partesCarpeta.pop();
        tituloPais.textContent = partesCarpeta.join(' ');
      } else {
        tituloPais.textContent = galeriaActual.replace(/-/g, ' ');
        tituloAnio.textContent = '';
      }
    }

    if (Array.isArray(data)) {
      listaArchivos = data;
    } else if (data && Array.isArray(data.items)) {
      listaArchivos = data.items;
    } else if (data && typeof data === 'object') {
      listaArchivos = Object.keys(data).map(k => ({ file: k, ...data[k] }));
    }

    const listaAleatoria = mezclarArray(listaArchivos);

    listaAleatoria.forEach(item => {
      if (item.visible === false) return;

      const urlHD = resolverRuta(item.url || item.file);
      const urlThumb = resolverRuta(item.thumb || item.url || item.file);
      
      if (!urlHD) return;

      const titulo = item.title || '';
      const ubicacion = item.location || '';
      const fecha = item.date || item.fecha || '';
      const descripcion = item.description || item.descripcion || '';
      const poster = item.poster ? resolverRuta(item.poster) : '';

      const esVid = esVideo(urlHD, item.type);

      const anchor = document.createElement('a');
      anchor.href = '#';

      const claseAzar = clasesTamano[Math.floor(Math.random() * clasesTamano.length)];
      if (claseAzar) anchor.classList.add(claseAzar);

      anchor.dataset.url = urlHD;
      anchor.dataset.titulo = titulo;
      anchor.dataset.ubicacion = ubicacion;
      anchor.dataset.fecha = fecha;
      anchor.dataset.descripcion = descripcion;
      anchor.dataset.esVideo = esVid;

      if (esVid) {
        if (poster) {
          const img = document.createElement('img');
          img.src = poster;
          img.alt = titulo || 'Video';
          img.referrerPolicy = 'no-referrer';
          anchor.appendChild(img);
        } else {
          const video = document.createElement('video');
          video.referrerPolicy = 'no-referrer';
          video.src = `${urlHD}#t=0.1`;
          video.muted = true;
          video.preload = "metadata";
          video.playsInline = true;
          anchor.appendChild(video);
        }
      } else {
        const img = document.createElement('img');
        img.src = urlThumb;
        img.alt = titulo || 'Fotografía';
        img.loading = 'lazy';
        img.referrerPolicy = 'no-referrer';
        anchor.appendChild(img);
      }

      contenedorGaleria.appendChild(anchor);
    });

    inicializarEventos();
  })
  .catch(err => {
    console.error("Error al cargar fotos.json:", err);
    contenedorGaleria.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #94a3b8; margin-top: 2rem;">No se pudo cargar la galería "${galeriaActual}".</p>`;
  });

function inicializarEventos() {
  contenedorGaleria.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();

      const url = anchor.dataset.url;
      const esVid = anchor.dataset.esVideo === 'true';

      const ubicacionLimpia = anchor.dataset.ubicacion ? `📍 ${anchor.dataset.ubicacion}` : '';
      infoUbicacion.textContent = ubicacionLimpia;
      infoFecha.textContent = formatearFecha(anchor.dataset.fecha);
      infoTitulo.textContent = anchor.dataset.titulo;

      const desc = anchor.dataset.descripcion;
      infoDescripcion.textContent = desc || '';

      if (esVid) {
        modalImg.style.display = 'none';
        modalImg.src = '';
        modalVideo.referrerPolicy = 'no-referrer';
        modalVideo.src = url;
        modalVideo.style.display = 'block';
        modalVideo.play();
      } else {
        modalVideo.pause();
        modalVideo.style.display = 'none';
        modalVideo.removeAttribute('src');
        modalVideo.load();
        modalImg.referrerPolicy = 'no-referrer';
        modalImg.src = url;
        modalImg.style.display = 'block';
        resetZoom();
      }

      modal.classList.add('overlay');
      document.body.style.overflow = 'hidden';
    });
  });
}

function getDistance(touches) {
  return Math.hypot(
    touches[0].clientX - touches[1].clientX,
    touches[0].clientY - touches[1].clientY
  );
}

modalImg.addEventListener('mousedown', iniciarPulsacion);
modalImg.addEventListener('mouseup', cancelarPulsacion);
modalImg.addEventListener('mouseleave', cancelarPulsacion);

modalImg.addEventListener('touchstart', (e) => {
  if (e.touches.length === 2) {
    cancelarPulsacion();
    startDistance = getDistance(e.touches);
  } else if (e.touches.length === 1) {
    if (scale > 1) {
      isDragging = true;
      startX = e.touches[0].clientX - posX;
      startY = e.touches[0].clientY - posY;
    } else {
      iniciarPulsacion();
    }
  }
});

modalImg.addEventListener('touchmove', (e) => {
  if (e.touches.length === 2) {
    cancelarPulsacion();
    e.preventDefault();
    const currentDistance = getDistance(e.touches);
    if (startDistance > 0) {
      scale = Math.min(Math.max(1, lastScale * (currentDistance / startDistance)), 4);
      modalImg.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
    }
  } else if (e.touches.length === 1 && isDragging && scale > 1) {
    cancelarPulsacion();
    e.preventDefault();
    posX = e.touches[0].clientX - startX;
    posY = e.touches[0].clientY - startY;
    modalImg.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
  }
});

modalImg.addEventListener('touchend', (e) => {
  cancelarPulsacion();
  if (e.touches.length < 2) {
    lastScale = scale;
  }
  if (e.touches.length === 0) {
    isDragging = false;
    if (scale <= 1) {
      resetZoom();
    }
  }
});

modalImg.addEventListener('touchcancel', cancelarPulsacion);

modalImg.addEventListener('click', (e) => {
  e.stopPropagation();
  if (isPressing) {
    isPressing = false;
    return;
  }

  if (scale > 1) {
    resetZoom();
  } else {
    cerrarModal();
  }
});

modal.addEventListener('click', (e) => {
  if (e.target === modal || e.target.classList.contains('modal-media-wrapper')) {
    cerrarModal();
  }
});

let ultimoToqueVideo = 0;
modalVideo.addEventListener('touchend', function(e) {
  const tiempoActual = new Date().getTime();
  const diferenciaToques = tiempoActual - ultimoToqueVideo;

  if (diferenciaToques < 300 && diferenciaToques > 0) {
    e.preventDefault();
    cerrarModal();
  }
  ultimoToqueVideo = tiempoActual;
});

script.js
Mostrando script.js.