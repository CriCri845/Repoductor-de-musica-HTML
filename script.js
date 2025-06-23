const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const currentTimeText = document.getElementById("current-time");
const durationText = document.getElementById("duration");
const songTitle = document.getElementById("song-title");

const songs = [
  { title: "BonJovi", file: "audio/BonJovi.mp3" },
  { title: "La Flaca", file: "audio/La Flaca.mp3" },
  { title: "Running90", file: "audio/Running90.mp3" }
];

let currentSong = 0;

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${min}:${sec}`;
}

function loadSong(index) {
  audio.src = songs[index].file;
  songTitle.textContent = `🎵 Canción actual: ${songs[index].title}`;
}

function updateTime() {
  currentTimeText.textContent = formatTime(audio.currentTime);
  durationText.textContent = formatTime(audio.duration);
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
}

playBtn.addEventListener("click", () => {
  audio.play();
  playBtn.classList.add("hidden");
  pauseBtn.classList.remove("hidden");
});

pauseBtn.addEventListener("click", () => {
  audio.pause();
  pauseBtn.classList.add("hidden");
  playBtn.classList.remove("hidden");
});

nextBtn.addEventListener("click", () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  audio.play();
});

prevBtn.addEventListener("click", () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  audio.play();
});

audio.addEventListener("timeupdate", updateTime);
progress.addEventListener("input", () => {
  audio.currentTime = (progress.value * audio.duration) / 100;
});
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});
audio.addEventListener("ended", () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  audio.play();
});

loadSong(currentSong);
