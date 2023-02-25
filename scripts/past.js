const contendorCards = document.querySelector('#cardpast')

let eventsPast = feEvents(data.events.filter(n => (n.date < data.currentDate)));

contendorCards.innerHTML = eventsPast
function feEvents(arrayEvents) {
    let cardsPast = ''
    for (const event of arrayEvents) {
        cardsPast += `
  <div class="card">
   <img src="${event.image}" class="card-img-top" alt="${event.name}">
<div class="card-body">
  <h5 class="card-title">${event.name}</h5>
  <p class="card-text">${event.date}</p>
  <p class="card-text">${event.description}</p>
 </div> 
 <div class="d-grid gap-2 d-md-flex justify-content-md-end">
  <a href="" class="btn btn-outline-primary btn-sm me-md-2">Go somewhere</a>
 </div>
</div>  `
    }
    return cardsPast;
}
