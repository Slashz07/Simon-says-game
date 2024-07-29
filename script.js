const btn1 = document.querySelector(".btn1")
const btn2 = document.querySelector(".btn2")
const btn3 = document.querySelector(".btn3")
const btn4 = document.querySelector(".btn4")
const container = document.querySelector(".container")
const body = document.querySelector("body")
const gameStatus = document.querySelector(".status")
const buttonsArr = Array.from(document.querySelectorAll(".btn"))
let arrUser = []
let arrComp = []
let level = 1
let firstPressDone = false
// utility functions--->
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function removeClass(classlist) {
  await wait(150);

  classlist.remove('blink');
}

async function blinkButtons() {
  for (let i = 0; i < arrComp.length; i++) {
    await wait(500)
    buttonsArr[arrComp[i] - 1].classList.add("blink");

    await removeClass(buttonsArr[arrComp[i] - 1].classList);
  }
}

// code-->

async function compPattern() {
  gameStatus.innerHTML = `This is level ${level}`
  level++;

  let rand = Math.floor(Math.random() * 4 + 1)
  arrComp.push(rand)

  await blinkButtons()

  arrUser.length = 0
}

document.addEventListener("keypress", (e) => {
  if (!firstPressDone) {
    compPattern()
    firstPressDone = true
  }
})

container.addEventListener("click", async (e) => {
  if (e.target.nodeName === "DIV" && e.target.classList.contains("btn")) {

    if (e.target.classList.contains("btn1")) {
      arrUser.push(1)
      btn1.classList.add('blink');

    }
    else if (e.target.classList.contains("btn2")) {
      arrUser.push(2)
      btn2.classList.add('blink');

    }
    else if (e.target.classList.contains("btn3")) {
      arrUser.push(3)
      btn3.classList.add('blink');

    }
    else {
      arrUser.push(4)
      btn4.classList.add("blink")

    }

    await removeClass(e.target.classList)

    for (i = 0; i < arrUser.length; i++) {
      if (arrUser[i] !== arrComp[i]) {
        body.classList.add("game-lost")
        gameStatus.innerHTML = `you lost`
        arrComp.length = 0
        arrUser.length = 0
        level = 1
        firstPressDone = false
        break
      }
    }
    if (arrUser.length === arrComp.length && arrUser.length !== 0) {
      compPattern()
    }

  }
})
