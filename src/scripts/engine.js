const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    lives: document.querySelector("#live"),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 10,
    live: 3,
  },
  actions: {
    timeId: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(countDown, 1000),
  },
};

let audioBackground = new Audio("/src/audios/background_music_loop.mp3");
let audioHit = new Audio("/src/audios/hit22.mp3");

function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;
  state.view.lives.textContent = "0" + state.values.live;
  if ((state.values.currentTime <= 0) & (state.values.live > 0)) {
    alert(
      "Muito bom! Seu resultado: " +
        state.values.result +
        " Lives :" +
        state.values.live
    );
    resetGame();
  } else if (state.values.live <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timeId);
    alert("!Game Over");

    state.values.live = 0;
    state.values.result = 0;
  }
}
function resetGame() {
  state.values.live--;
  state.values.result = 0;
  state.values.currentTime = 10;
}
function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function addListernerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        soundHit();
      }
    });
  });
}
function soundHit() {
  audioHit.play();
}

function soundBackground() {
  audioBackground.volume = 1;
  audioBackground.canPlayType("mp3");
  audioBackground.loop = true;
  audioBackground.play();
}

function init() {
  audioHit.canPlayType("mp3");
  audioHit.volume = 1;
  soundBackground();
  addListernerHitBox();
}

init();
