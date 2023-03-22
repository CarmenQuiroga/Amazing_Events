



function traerDatos() {
   /* fetch('.data.json')*/
    fetch('https://mindhub-xj03.onrender.com/api/amazing')
        .then(response => response.json())
        .then(dataApi => {
            console.log(dataApi)
            eventos = dataApi.events.results

            console.log(dataApi.events);

const queryString = window.location.search

const params = new URLSearchParams(queryString)

const _id = params.get("_id")


const detalle = dataApi.events.find(data => data._id == _id);
const contenedorCards = document.getElementById("cards");

            contenedorCards.innerHTML = `<div class="row">

<div class="col-sm-6" id="image">

                <img class="img-thumbnail mx-auto d-block" src="${detalle.image}"  alt="...">

            </div>
            <div class="col-sm-6" id="details">

                <div class="fst-italic tex-wrap ">
                   <ul>
                    <li> <h4>${detalle.name}</h4></li>
                   <li> ${detalle.date}</li>
                   <li> ${detalle.description}</li>
                   <li> ${detalle.category}</li>
                   <li> ${detalle.place}</li>
                   <li>Capacity: ${detalle.capacity} </li>
                   <li>Assitance: ${detalle.assistance}</li>
                   <li>Price: ${detalle.price}</li>

                </ul>     

                </div>
            </div>`



           
        })



        .catch(error => console.error(error.message))

}
traerDatos()            
