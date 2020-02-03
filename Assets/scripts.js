$(document).ready(function (event) {
  let hoursArr = ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm']
  let toDo = JSON.parse(localStorage.getItem('toDoListTable')) || []
  toDo.length = hoursArr.length
  let currentTime = moment()
  $('#currentDay').html(currentTime.format('MMMM DD, YYYY'))

  const createHourlyRows = _ => {
    for (let i = 0; i < hoursArr.length; i++) {
      $('#toDoListTable').append(
        `<div id=box${i} class='text-lg-left z-depth-4 ${colorRow(i)}'>` +
        `<div class="modal-header"><label class="textarea2" for=input${i}>${hoursArr[i]}` +
        `</label><textarea id=input${i} class="description materialize-textarea" placeholder="Add To-Do Item"></textarea>` +
        `<div class="col-md-1"><button id=save${i} class="saveBtn btn-floating btn-large waves-effect waves-light blue">Add` +
        `</button>`
      )
    }
    for (let i = 0; i < hoursArr.length; i++) {
      if (toDo[i]) {
        document.getElementById(`input${i}`).value = toDo[i]
      }
    }
  }
  const colorRow = x => {
    const hour = parseInt(parseInt(currentTime.format('H')) - 9)
    if (x < hour) {
      return 'past'
    } else if (x > hour) {
      return 'upcoming'
    }
    return 'current'
  }
  const saveArrToLocalStorage = id => {
    const keyValPair = id[4]
    toDo[keyValPair] = document.getElementById(`input${keyValPair}`).value
    localStorage.setItem('toDoListTable', JSON.stringify(toDo))
  }
  const saveArray = { save1: saveArrToLocalStorage, save2: saveArrToLocalStorage, save3: saveArrToLocalStorage, save4: saveArrToLocalStorage, save5: saveArrToLocalStorage, save6: saveArrToLocalStorage, save7: saveArrToLocalStorage, save8: saveArrToLocalStorage, save9: saveArrToLocalStorage, save0: saveArrToLocalStorage }

  const saveTargetValues = _ => {
    $('#toDoListTable').on('click', event => {
      try {
        saveArray[event.target.id](event.target.id)
      } catch (e) {

      }
    })
  }

  saveTargetValues()
  createHourlyRows()
})
