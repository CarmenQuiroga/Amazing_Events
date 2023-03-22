const nodoCards = document.getElementById('cardnews')
const listCategory = document.getElementById('cat')
let search = document.getElementById("buscar")



function traerDatos() {
  /*fetch('.data.json')*/
  fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(dataApi => {
      console.log(dataApi)
      eventos = dataApi.events
      console.log(dataApi.events);
      eventosFuturos = eventUp(dataApi.events, dataApi.currentDate)

      newsEvents(eventosFuturos, nodoCards)

      crearCheckbox(eventosFuturos, listCategory)


    })

    .catch(error => console.error(error.message))

}
traerDatos()

function eventUp(dataApi, currentDate) {
  return dataApi.filter(event => event.date > currentDate)
}

function newsEvents(arrayEvents) {
  if (arrayEvents.length == 0) {
    nodoCards.innerHTML = `<p class='display-3 fst-italic'>Event not found</p>`
    return false
  }
  let cardsNews = ''
  arrayEvents.forEach(event => {
    cardsNews += `
  <div class="card">
   <img src="${event.image}" class="card-img-top" alt="${event.name}">
<div class="card-body">
  <h5 class="card-title">${event.name}</h5>
  <p class="card-text font-size:10px">${event.date}</p>
  <p class="card-text">${event.description}</p>
 </div> 
 <div class="d-grid gap-2 d-md-flex justify-content-md-end">
  <a href="../details.html?_id=${event._id}" class="btn btn-outline-primary btn-sm me-md-2">Go somewhere</a>
 </div>
</div>  `
  })
  nodoCards.innerHTML = cardsNews
}


function crearCheckbox(arrayC, ubicacion) {
  categ = []
  arrayC.forEach(event => {
    if (!categ.includes(event.category)) {
      categ += `<label class="form-check form-check-inline">
    <input onclick="filtrarEventos()" class="form-check-input" name="status" type="checkbox"   id="${event.category}" value="${event.category}">
    ${event.category}</label>`
    }

  })
  ubicacion.innerHTML = categ
}

function filtrarEventos() {
  const buscar = search.value.toLowerCase()
  let categoriasFiltradas = []
  let checkbox =
    document.querySelectorAll('input[name="status"]:checked')
  checkbox.forEach(function (inputs) {
    categoriasFiltradas.push(inputs.value)
  })
  let arrayNuevo = eventosFuturos.filter(events => events.description.toLowerCase().includes(buscar) && (categoriasFiltradas.length == 0 ||
    categoriasFiltradas.includes(events.category)))
  console.log(arrayNuevo);
  newsEvents(arrayNuevo, nodoCards)
}
buscar.addEventListener('keyup', filtrarEventos)



