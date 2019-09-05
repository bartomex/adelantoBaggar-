//SECCIONES
const comoFunciona = document.getElementById("como-funciona");
const socioSection = document.getElementById("socio");
const cotizaExpressSection = document.getElementById("cotiza-express-section");
const cosasSegurasSection = document.getElementById("cosas-seguras-section");
const dondeDejarCosasSection = document.getElementById("lugares-para-dejar-cosas-section");



//BARRA INFERIOR EN MENU
const target = document.querySelector(".target");
const links = document.querySelectorAll(".navegacion a");
const colors = ["deepskyblue", "orange", "firebrick", "gold", "magenta", "#FF4847"];

const canguro = document.querySelector(".canguro");

const regresaIcon = document.querySelector(".regresa-icon");

//FORM
const modal = document.querySelector(".home");
const formulario = document.querySelector("#form-datos");
const secConfirmaDatos = document.querySelector(".confirm-datos");

const ubicacionp = document.querySelector(".ubicacion");
const datos = document.querySelector(".datos");

//SECCION COMO FUNCIONA
const labelsFunc = document.querySelector(".bag-funciones");
const labelsFunc2 = document.querySelector(".bag-funciones2");
const labelsFunc3 = document.querySelector(".bag-funciones3");
const labelsFunc4 = document.querySelector(".bag-funciones4");


const pasoUno = document.querySelector(".paso1");
const imgpaso1 = document.querySelector(".img-paso1");
const paso1Reserva = document.querySelector(".paso1-reserva");

const pasoDos = document.querySelector(".paso2");
const imgpaso2 = document.querySelector(".img-paso2");
const paso2Resguarda = document.querySelector(".paso2-resguarda");

const pasoTres = document.querySelector(".paso3");
const imgpaso3 = document.querySelector(".img-paso3");
const paso3Resguarda = document.querySelector(".paso3-horaresguarda");

const pasoCuatro = document.querySelector(".paso4");
const imgpaso4 = document.querySelector(".img-paso4");
const paso4Recoge = document.querySelector(".paso4-recoge");

//COTIZA-EXPRESS-SECTION
const horasCotizaExpress = document.querySelector(".horas-cotiza-express");
const articulosCotizaExpress = document.querySelector(".articulos-cotiza-express");
const resultCotizaExpress = document.querySelector(".result-cotiza-express");

//RESERVACION CONFIRMADA
const aceptarReservacion = document.querySelector(".aceptar-datos2");


// ELEMENTOS DE LAS PREGUNTAS FRECUENTES
const resp1 = document.querySelector(".respuesta1");
const flechaAbajo = document.querySelector(".flecha-abajo");
const flechaArriba = document.querySelector(".flecha-arriba");

const pregunta1 = document.querySelector(".pregunta1");






// FUNCIONES PARA LAS RESPUESTAS A LAS PREGUNTAS FRECUENTES
function muestraInfo1() {
  resp1.style.display = "block";
  flechaAbajo.style.display = "none";
  flechaArriba.style.display = "block";
  //DESAPARECE LA FLECHA HACIA ABAJO, APARECE LA DE ARRIBA Y EN ESA LA FUNCION PARA DESAPARECER LA RESP
}

function desapareceResp1() {
  resp1.style.display = "none";
  flechaArriba.style.display = "none";
  flechaAbajo.style.display = "block";
}



//MAPA DE GOOGLE DE LOCALIZADOR

  // Función que se llama cuando se carga Google Maps
let markers = []
var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 19.412307, lng: -99.180670},
    zoom: 18,
  });

  // Creación del SearchBox
  var input = document.querySelector(".localizador");
  var searchBox = new google.maps.places.SearchBox(input);
  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  //Añade sugerencias al searchbox
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
    map.setZoom(18);   //AÑADIR UN NUEVO ZOOM
  });


  //DA info sobre el lugar seleccionado
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
    var bounds = new google.maps.LatLngBounds();
    markers = [];

    // Por cada place, obtén el icon, nombre y ubicación
    places.forEach(function(place) {



      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);  //MUEVE EL MAPA AL LUGAR SELECCIONADO

    //Busca los lugares que estan al rededor del seleccionado
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      bounds: bounds,
      radius: '50000',
      type: ['restaurant'] },
      callback)
  })
}

//Recibe cada lugar cercano y lo manda a marcar
function callback(results, status) {
  console.log('results:', results)
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i]
      createMarker(results[i]);
    }
  }
}

//Crea marcadores sobre cada lugar cercano
function createMarker(marker) {
  markers.push(new google.maps.Marker({
        map: map,
        icon: marker.icon,
        title: marker.name,
        position: marker.geometry.location
      }));
}


//FORMULARIO-COTIZADOR  PARA GUARDAR LOS DATOS INICIALES DEL COTIZADOR PRINCIPAL DEL HOME
function quitamodal() {
  modal.style.display = "none";
}

function costo(x, y) {
  return x*y
}

formulario.addEventListener("submit", function(event) {
  event.preventDefault();
  quitamodal();

  const ubicacion = formulario.ubicacion.value;
  const fecha = formulario.fecha.value;
  const maletas = parseInt(formulario.maletas.value);
  // FALTARIA AÑADIR LA OPCION PARA QUE EL USUARIO INGRESE EL NUMERO DE HORAS DEL SERVICIO

  // const total = (costo(maletas, 20))*horas;
  secConfirmaDatos.style.display = "flex";

  datos.innerHTML += `
    <p>1. Fecha de apartado:<br><strong><big>${fecha}</big></p>
    <p>2. Número de objetos que deseas que cuidemos:<br> <big>${maletas}</big></p>
  `
})

//APARTADO REGRESA
function regresa() {
  secConfirmaDatos.style.display = "none";

  modal.style.display = "inline-block";
}


// SECCION COSTO APROXIMADO
function costoExpress(x, y) {
  return x*y
}

function costoAprox() {
  const hrsCotExpressValue = horasCotizaExpress.value;
  const artCotizaExpressValue = articulosCotizaExpress.value;
  const totalExpress = (costoExpress(artCotizaExpressValue, 20))*hrsCotExpressValue;

  resultCotizaExpress.innerHTML = `
    <p class="precio-est-text">Precio estimado</p>
    <p class="total-precio-costo-aprox"><big>$${totalExpress}.00 MXN</big></p>
  `
  resultCotizaExpress.style.display = "block";
}





//SECCION COMO FUNCIONA

function paso1() {
  labelsFunc.style.backgroundColor = "#FF4847";
  labelsFunc2.style.backgroundColor = "";
  labelsFunc3.style.backgroundColor = "";
  labelsFunc4.style.backgroundColor = "";

  pasoUno.style.display = "inline-block";
  paso1Reserva.style.display = "inline-block";

  pasoDos.style.display = "none";
  paso2Resguarda.style.display = "none";

  pasoTres.style.display = "none";
  paso3Resguarda.style.display = "none";
  imgpaso3.style.display = "none";

  pasoCuatro.style.display = "none";
  paso4Recoge.style.display = "none";
  imgpaso4.style.display = "none";
}

function paso2() {
  labelsFunc2.style.backgroundColor = "#FF4847";
  labelsFunc.style.backgroundColor = "#33EEE6";
  labelsFunc3.style.backgroundColor = "";
  labelsFunc4.style.backgroundColor = "";


  pasoUno.style.display = "none";
  paso1Reserva.style.display = "none";

  pasoDos.style.display = "inline-block";
  paso2Resguarda.style.display = "inline-block";
  imgpaso2.style.display = "inline-block";

  pasoTres.style.display = "none";
  paso3Resguarda.style.display = "none";
  imgpaso3.style.display = "none";

  pasoCuatro.style.display = "none";
  paso4Recoge.style.display = "none";
  imgpaso4.style.display = "none";
}

function paso3() {
  labelsFunc3.style.backgroundColor = "#FF4847";
  labelsFunc.style.backgroundColor = "#33EEE6";
  labelsFunc2.style.backgroundColor = "";
  labelsFunc4.style.backgroundColor = "";

  pasoUno.style.display = "none";
  paso1Reserva.style.display = "none";

  pasoDos.style.display = "none";
  paso2Resguarda.style.display = "none";
  imgpaso2.style.display = "none";

  pasoCuatro.style.display = "none";
  paso4Recoge.style.display = "none";
  imgpaso4.style.display = "none";

  pasoTres.style.display = "inline-block";
  paso3Resguarda.style.display = "inline-block";
  imgpaso3.style.display = "inline-block";
}

function paso4() {
  labelsFunc4.style.backgroundColor = "#FF4847";
  labelsFunc.style.backgroundColor = "#33EEE6";
  labelsFunc2.style.backgroundColor = "";
  labelsFunc3.style.backgroundColor = "";


  pasoUno.style.display = "none";
  paso1Reserva.style.display = "none";

  pasoDos.style.display = "none";
  paso2Resguarda.style.display = "none";
  imgpaso2.style.display = "none";

  pasoTres.style.display = "none";
  paso3Resguarda.style.display = "none";
  imgpaso3.style.display = "none";

  pasoCuatro.style.display = "inline-block";
  paso4Recoge.style.display = "inline-block";
  imgpaso4.style.display = "inline-block";
}



//MENU FLOTANTE
for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("mouseenter", mouseOverFunc);
}

function mouseOverFunc() {
    for (let i = 0; i < links.length; i++) {
      if (links[i].parentNode.classList.contains("active")) {
        links[i].parentNode.classList.remove("active");
    }
    links[i].style.opacity = "0.25";
  }

  this.parentNode.classList.add("active");
  this.style.opacity = "1";

  const width = this.getBoundingClientRect().width;
  const height = this.getBoundingClientRect().height;
  const left = this.getBoundingClientRect().left;
  const top = this.getBoundingClientRect().top;
  const color = colors[Math.floor(Math.random() * colors.length)];

  target.style.width = `${width}px`;
  target.style.height = `${height}px`;
  target.style.left = `${left}px`;
  target.style.top = `${top}px`;
  target.style.borderColor = color;
  target.style.transform = "none";
}


//QUE EL SPAN DEL MENU SEA RESPONSIVO
window.addEventListener("resize", resizeFunc);

function resizeFunc() {
  const active = document.querySelector(".navegacion li.active");

  if (active) {
    const left = active.getBoundingClientRect().left + window.pageXOffset;
    const top = active.getBoundingClientRect().top + window.pageYOffset;

    target.style.left = `${left}px`;
    target.style.top = `${top}px`;
  }
}
