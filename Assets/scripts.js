$(document).ready(function (event) {
  let hours = ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm']
  let plan = JSON.parse(localStorage.getItem('toDoListTable')) || []
  plan.length = hours.length

  let now = moment()
  // let todayHeader = now.format('LL')
  // $("#currentDay").html(todayHeader)

  const colorRow = x => {
    const hour = parseInt(parseInt(now.format('H')) - 9)
    if (x < hour) {
      return 'past'
    } else if (x > hour) {
      return 'upcoming'
    }
    return 'current'
  }

  const buildTable = _ => {
    $('#currentDay').textContent = now.format('dddd, MMMM D, YYYY')
    for (let i = 0; i < hours.length; i++) {
      $('#toDoListTable').append(
        `<div id=box${i} class='${colorRow(i)}' text-lg-left z-depth-4">` +
        `<div class="modal-header"><label class="textarea2" for=input${i}>${hours[i]}` +
        `</label><input id=input${i} class="description materialize-textarea" placeholder="Add To-Do Item"></input>` +
        `<div class="col-md-1"><button id=save${i} class="saveBtn btn-floating btn-large waves-effect waves-light blue">Add` +
        `</button>`
      )
    }
    for (let i = 0; i < hours.length; i++) {
      if (plan[i]) {
        // console.log(`input${i}`)
        document.getElementById(`input${i}`).value = plan[i]
      }
    }
  }

  const doSave = id => {
    const slot = id[4]
    plan[slot] = document.getElementById(`input${slot}`).value
    localStorage.setItem('toDoListTable', JSON.stringify(plan))
  }

  const saveArray = { save1: doSave, save2: doSave, save3: doSave, save4: doSave, save5: doSave, save6: doSave, save7: doSave, save8: doSave, save9: doSave, save0: doSave }

  const setListener = _ => {
    $('#toDoListTable').on('click', event => {
      // console.log(event.target.id)
      try {
        saveArray[event.target.id](event.target.id)
      } catch (e) {
        console.log('No action taken!')
      }
    })
  }

  setListener()
  buildTable()
})
