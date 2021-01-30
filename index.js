const scramble = new Scrambo()

const timerText = document.getElementById('timerText')
const timerButton = document.getElementById('timerButton')

let timerInterval = null
let timerState = 0

let spaceDownTime = 0
let spaceUpTime = 0
let keyUpCount = 0

let minutes = 0
let seconds = 0
let milliseconds = 0

generateScramble()

document.addEventListener('keydown', (event) => {
  if (event.code == 'Space') {
    if (spaceDownTime == 0) {
      if (timerState == 0) {
        spaceDownTime = Date.now()
        spaceUpTime = 0
      } else if (timerState == 1) {
        timer()
      }
    }
  }
})

document.addEventListener('keyup', (event) => {
  if (event.code == 'Space') {
    if (timerState == 0) {
      spaceUpTime = Date.now()
      let spaceTimePressed = spaceUpTime - spaceDownTime
      spaceDownTime = 0

      if (spaceTimePressed > 300) {
        timer()
      }
    } else if (timerState == 2) {
      if (keyUpCount == 0) {
        keyUpCount++
      } else {
        keyUpCount = 0
        timer()
      }
    }
  }
})

timerButton.addEventListener('click', () => {
  timer()
})

function generateScramble() {
  if (timerState == 0) {
    const scrambles = scramble.get()
    document.getElementById('scramble').textContent = scrambles.join('<br>')
  }
}

function timer() {
  // Remove focus from all buttons
  document.querySelectorAll('button').forEach(function (element) {
    element.blur()
  })

  switch (timerState) {
    case 0:
      timerState = 1
      timerText.classList.add('active')
      timerButton.textContent = 'Stop'

      timerInterval = window.setInterval(updateTimer, 10)
      break
    case 1:
      timerState = 2
      timerButton.textContent = 'Reset'

      minutes = 0
      seconds = 0
      milliseconds = 0

      window.clearInterval(timerInterval)
      break
    case 2:
      timerState = 0
      timerText.classList.remove('active')
      timerText.textContent = '00.00.00'
      timerButton.textContent = 'Start'

      generateScramble()
      break
  }
}

function updateTimer() {
  milliseconds++
  if (milliseconds > 100) {
    milliseconds = 0
    seconds++
  }
  if (seconds > 60) {
    seconds = 0
    minutes++
  }

  timerText.textContent =
    ('00' + minutes).substr(-2, 2) + '.' + ('00' + seconds).substr(-2, 2) + '.' + ('00' + milliseconds).substr(-2, 2)
}
