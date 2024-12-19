const quizDataSet = [
  { question: "Who developed the theory of relativity?", options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei"], answer: "Albert Einstein" },
  { question: "What is the largest planet in our solar system?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Jupiter" },
  { question: "Which country is known as the Land of the Rising Sun?", options: ["China", "South Korea", "Japan", "Thailand"], answer: "Japan" },
  { question: "What is the chemical symbol for water?", options: ["H2O", "O2", "CO2", "H2"], answer: "H2O" },
  { question: "In which year did World War II end?", options: ["1940", "1945", "1950", "1960"], answer: "1945" },
  { question: "Which planet is closest to the Sun?", options: ["Mercury", "Venus", "Earth", "Mars"], answer: "Mercury" },
  { question: "What is the smallest continent by land area?", options: ["Africa", "Asia", "Australia", "Europe"], answer: "Australia" },
];

let currentQuestionIndex = 0;
let totalScore = 0;
let countdown;
let timeRemaining = 15;

const questionDisplay = document.getElementById("current-question");
const optionsDisplay = document.getElementById("answer-options");
const nextBtnDisplay = document.getElementById("next-question-btn");
const finalScoreDisplay = document.getElementById("final-score");
const timerDisplay = document.getElementById("countdown-timer");
const startBtnDisplay = document.getElementById("start-btn");
const quizDisplay = document.getElementById("quiz-content");

function startCountdown() {
  timeRemaining = 15;
  timerDisplay.innerText = `Time left: ${timeRemaining}s`;
  countdown = setInterval(() => {
    timeRemaining--;
    timerDisplay.innerText = `Time left: ${timeRemaining}s`;
    if (timeRemaining === 0) {
      clearInterval(countdown);
      moveToNextQuestionAutomatically();
    }
  }, 1000);
}

function stopCountdown() {
  clearInterval(countdown);
}

function moveToNextQuestionAutomatically() {
  Array.from(optionsDisplay.children).forEach((btn) => btn.disabled = true); // Disable all options
  nextBtnDisplay.style.display = "block"; // Show the next button
}

function loadNextQuestion() {
  stopCountdown();
  startCountdown();

  const current = quizDataSet[currentQuestionIndex];
  questionDisplay.innerText = current.question;
  optionsDisplay.innerHTML = "";

  current.options.forEach((option) => {
    const optionBtn = document.createElement("button");
    optionBtn.classList.add("option-btn");
    optionBtn.innerText = option;
    optionBtn.addEventListener("click", () => selectOption(option, optionBtn));
    optionsDisplay.appendChild(optionBtn);
  });

  nextBtnDisplay.style.display = "none"; // Hide next button initially
}

function selectOption(selected, button) {
  stopCountdown();
  const correctAnswer = quizDataSet[currentQuestionIndex].answer;

  if (selected === correctAnswer) {
    totalScore++;
    button.classList.add("correct");
  } else {
    button.classList.add("incorrect");
  }

  Array.from(optionsDisplay.children).forEach((btn) => (btn.disabled = true)); // Disable all options after selection
  nextBtnDisplay.style.display = "block"; // Show next button
}

function moveToNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizDataSet.length) {
    loadNextQuestion();
  } else {
    displayFinalScore();
  }
}

function displayFinalScore() {
  stopCountdown();
  questionDisplay.style.display = "none";
  optionsDisplay.style.display = "none";
  timerDisplay.style.display = "none";
  nextBtnDisplay.style.display = "none";
  finalScoreDisplay.style.display = "block";
  finalScoreDisplay.innerText = `Your score: ${totalScore}/${quizDataSet.length}`;
}

startBtnDisplay.addEventListener("click", () => {
  startBtnDisplay.style.display = "none";
  quizDisplay.style.display = "block";
  loadNextQuestion();
});

nextBtnDisplay.addEventListener("click", moveToNextQuestion);