const table = document.getElementById("table")

function traerDatos() {
    /* fetch('./data.json')*/
    fetch('https://mindhub-xj03.onrender.com/api/amazing')
        .then(response => response.json())
        .then(dataApi => {
            arrayEventPast = eventPast(dataApi.events, dataApi.currentDate)
            console.log(arrayEventPast)
           const eventosFuturos = eventUp (dataApi.events, dataApi.currentDate)
           const eventosPasados = eventPast(dataApi.events, dataApi.currentDate)

            printTable1(result(percentage(arrayEventPast), percentage(arrayEventPast).reverse(), capacity(arrayEventPast)), "catpast")

           printTable(dataTable(eventosPasados),"tableUp")
           printTable(dataTable(eventosFuturos), "tablePast")

        })

        .catch(error => console.error(error.message))

}
traerDatos()


function eventPast(dataApi, currentDate) {
    return dataApi.filter(event => event.date < currentDate)
}

function eventUp(dataApi, currentDate) {
   return dataApi.filter(event => event.date > currentDate)
}

function percentage(arrayEvents) {
    const arrayPerc = arrayEvents.map(event => {
        return {
            attendance: ((event.assistance || event.estimate) / event.capacity) * 100,
            nameEvent: event.name
        }
    })
    arrayPerc.sort((a, b) => b.attendance - a.attendance)
    console.log(arrayPerc)
    return arrayPerc
}

function capacity(arrayEvents) {
    const arrayCapacity = arrayEvents.map(event => {
        return {
            capacity: event.capacity,
            nameEvent: event.name
        }
    })
    arrayCapacity.sort((a, b) => b.capacity - a.capacity)
    console.log(arrayCapacity)
    return arrayCapacity
}
function result(highestPercentage, lowestPercentage, largerCapacity) {
    let all = {
        highestPercentage: highestPercentage[0].nameEvent,
        lowestPercentage: lowestPercentage[0].nameEvent,
        largerCapacity: largerCapacity[0].nameEvent
    }
    return all
}

function printTable1(results, container) {
    const table = document.getElementById(container)
    table.innerHTML = `
  <tr>
      <td>${results.highestPercentage}</td>
      <td>${results.lowestPercentage}</td>
      <td>${results.largerCapacity}</td>
  </tr>
  `
}

function dataTable(arr) {
    let categories = Array.from(new Set(arr.map(a => a.category)));
    let eventCategories = categories.map(cat => arr.filter(event => event.category == cat))
    let result = eventCategories.map(eventCat => {
      let calculate = eventCat.reduce((acc, event) => {
        console.log(event)
        acc.category = event.category;
        acc.revenues += event.price * (event.assistance || event.estimate);
        acc.attendance += ((event.assistance || event.estimate) * 100) / event.capacity
        return acc
      }, {
        category: "",
        revenues: 0,
        attendance: 0
      })
      calculate.attendance = calculate.attendance / eventCat.length
      return calculate
    })
    return result;
  }
  
  function printTable(arr, idTag) {
    const upcomingTable = document.getElementById(idTag)
    let html =
    arr.map(events => {
      return `
        <tr>
                <td>${events.category}</td>
                <td>${events.revenues}</td>
                <td>${events.attendance.toFixed(2)}%</td>
            </tr>
        `
    })
    upcomingTable.innerHTML = html.join("")
  }

