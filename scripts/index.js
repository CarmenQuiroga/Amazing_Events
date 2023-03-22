const contendorCards = document.getElementById('card')
const listCategory = document.getElementById('cat')
let search = document.getElementById("buscar")

function traerDatos() {
 /* fetch('.data.json')*/
  fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(dataApi => {
      console.log(dataApi)
      eventos = dataApi.events
      console.log(dataApi.events);


      crearCards(eventos, contendorCards)

      crearCheckbox(eventos, listCategory)

      })

    .catch(error => console.error(error.message))

}
traerDatos()


function crearCards(arrayEvents, ubicacion) {
  if (arrayEvents.length == 0) {
    contendorCards.innerHTML = `<p class='display-3 fst-italic'>Event not found</p>`
    return false
  }
  let card = ''
  arrayEvents.forEach(event => {
    card += `
  <div class="card">
   <img src="${event.image}" class="card-img-top" alt="${event.name}">
<div class="card-body">
  <h5 class="card-title">${event.name}</h5>
  <p class="card-text">${event.description}</p>
 </div> 
 <div class="d-grid gap-2 d-md-flex justify-content-md-end">
  <a href="../details.html?_id=${event._id}" class="btn btn-outline-primary btn-sm me-md-2">Go somewhere</a>
 </div>
</div>  `

  });

  ubicacion.innerHTML = card
}



function crearCheckbox(arrayC, ubicacion) {
  categ = []
  arrayC.forEach(event => {
    if (!categ.includes(event.category)) {
      categ += `<label class="form-check form-check-inline">
    <input onclick="filtrarEventos()" class="form-check-input" name="status" type="checkbox"   id="${event.category}" value="${event.category}">
    ${event.category}</label>
  </label>`
    }
  })
  ubicacion.innerHTML = categ
}
 
 
 function filtrarEventos(){
    const buscar= search.value.toLowerCase()
    let categoriasFiltradas = []
      let checkbox =
      document.querySelectorAll('input[name="status"]:checked')
      checkbox.forEach(function(inputs){
        categoriasFiltradas.push(inputs.value)
      })
    let arrayNuevo = eventos.filter(events => events.description.toLowerCase().includes(buscar) && (categoriasFiltradas.length== 0 ||
      categoriasFiltradas.includes(events.category)))
      console.log(arrayNuevo);
      crearCards(arrayNuevo, contendorCards)
  }
  buscar.addEventListener('keyup', filtrarEventos)


