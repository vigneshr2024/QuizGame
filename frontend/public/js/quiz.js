let timerInterval;
let seconds = 5 * 60;
let timerRunning = false; // Track the timer status
let quizStarted = false; // Track if the quiz has started at least once

function startTimer() {
  timerRunning = true; // Set timer status to running
  timerInterval = setInterval(() => {
    seconds--;
    document.getElementById("timer").innerText = formatTime(seconds);

    if (seconds <= 60) {
      document.getElementById("leaderboard").classList.add("disabled");
    }

    if (seconds <= 0) {
      stopTimer();
      Swal.fire({
        icon: "warning",
        title: "Time's up!",
        timer: 2000, // Auto close after 2 seconds
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerRunning = false; // Set timer status to stopped
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${pad(mins)}:${pad(secs)}`;
}

function pad(num) {
  return num.toString().padStart(2, "0");
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("start-quiz").addEventListener("click", () => {
    console.log("Hello");
    // Check if player names are entered for both teams
    const teamAPlayers = document.getElementById("teamA-players").value.trim();
    const teamBPlayers = document.getElementById("teamB-players").value.trim();
    const language = document.getElementById("language").value.trim();

    if (teamAPlayers === "" || teamBPlayers === "" || language === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select program language enter player names for both Team A , Team B and select language to start quiz.",
        timer: 30000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }

    document.getElementById("leaderboard").classList.remove("disabled");
    seconds = 5 * 60;
    document.getElementById("timer").innerText = "05:00";
    startTimer();
    quizStarted = true; // Mark quiz as started
  });
});

function showQuizResult() {
  if (!quizStarted) {
    Swal.fire({
      icon: "warning",
      title: "Quiz not started",
      text: "Please start the quiz to view results.",
      timer: 30000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
    return;
  }

  if (!timerRunning) {
    Swal.fire({
      icon: "info",
      title: "Quiz results",
      html: `Winner: ${winnerName}`,
      timer: 30000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  } else {
    Swal.fire({
      icon: "warning",
      title: "Quiz in progress",
      text: "Please wait until the quiz ends to see the results.",
      timer: 30000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  }
}
