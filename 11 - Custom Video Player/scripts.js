const video = document.querySelector(".player__video.viewer");

const playButton = document.querySelector(".player__button.toggle");
const progressBar = document.querySelector(".progress");
const playerButtons = document.querySelectorAll("button.player__button");
const volume = document.querySelector('input.player__slider[name="volume"]');
const playbackRate = document.querySelector(
  'input.player__slider[name="playbackRate"]'
);

progressBar.addEventListener("mousedown", (e) => {
  console.log(e.target);
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
});

let playing = false;
let interval = null;

function playPause() {
  if (playing) {
    playButton.innerHTML = "►";
    video.pause();
    clearInterval(interval);
  } else {
    playButton.innerHTML = "&#9616;&#9616;";
    video.play();
    const duration = video.duration;
    interval = setInterval(() => {
      // console.log((video.currentTime * 100) / duration)
      document
        .querySelector(":root")
        .style.setProperty(
          "--progress_filled",
          `${(video.currentTime * 100) / duration}%`
        );
    }, 1000);
  }
  playing = !playing;
}

function skip(skipValue) {
  const currentTime = video.currentTime;
  const newTime = currentTime + skipValue;
  // console.log(
  //   skipValue,
  //   currentTime,
  //   newTime,
  //   newTime < 0 ? 0 : newTime > video.duration ? video.duration : newTime
  // );
  video.currentTime =
    newTime < 0 ? 0 : newTime > video.duration ? video.duration : newTime;
}
// playButton.addEventListener("click", playPause);

function playerSlideAction() {
  // console.log(this.name, this.value);
  video[this.name] = this.value;
}

volume.addEventListener("change", playerSlideAction);
playbackRate.addEventListener("change", playerSlideAction);
playerButtons.forEach((button) =>
  button.addEventListener("click", (e) => {
    if (button.classList.contains("toggle")) {
      playPause();
    } else {
      skip(parseInt(button.getAttribute("data-skip")));
    }
  })
);

video.addEventListener("ended", () => {
  playButton.innerHTML = "►";
  clearInterval(interval);
});
