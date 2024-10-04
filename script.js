// Звуки
const clickSound = new Audio("./sounds/click.mp3");
const winSound = new Audio("./sounds/win.mp3");

// HTML элементы
const difficultyButtons = document.querySelectorAll(".difficulty-btn");
const guessInput = document.getElementById("guess-input");
const guessButton = document.getElementById("guess-btn");
const instruction = document.getElementById("instruction");
const resultText = document.getElementById("result");
const congratsDiv = document.getElementById("congrats");

// Конфигурация уровней
const levels = {
  easy: { max: 10, attempts: 3 },
  medium: { max: 50, attempts: 5 },
  hard: { max: 100, attempts: 7 },
};

// Переменные игры
let randomNumber, attemptsLeft, maxNumber;

// Функция для начала игры
function startGame(level) {
  const { max, attempts } = levels[level];
  maxNumber = max;
  attemptsLeft = attempts;
  randomNumber = Math.floor(Math.random() * max) + 1;
  instruction.textContent = `Угадайте число от 1 до ${max}. У вас ${attempts} попыток.`;
  guessInput.disabled = false;
  guessButton.disabled = false;
  resultText.textContent = "";
  congratsDiv.classList.add("hidden");
}

// Функция для проверки попытки
function checkGuess() {
  clickSound.play();
  const guess = parseInt(guessInput.value);
  if (isNaN(guess)) {
    resultText.textContent = "Пожалуйста, введите число.";
    return;
  }

  attemptsLeft--;
  if (guess === randomNumber) {
    showCongrats();
  } else if (attemptsLeft === 0) {
    resultText.textContent = `Вы проиграли! Число было ${randomNumber}.`;
    guessInput.disabled = true;
    guessButton.disabled = true;
  } else {
    resultText.textContent =
      guess < randomNumber
        ? `Загаданное число больше. Осталось ${attemptsLeft} попыток.`
        : `Загаданное число меньше. Осталось ${attemptsLeft} попыток.`;
  }
  guessInput.value = "";
}

// Показ случайного поздравления
function showCongrats() {
  winSound.play();
  const congratsImages = [
    "./imgs/Con1.webp",
    "./imgs/Con2.webp",
    "./imgs/Con3.webp",
    "./imgs/Con4.webp",
    "./imgs/Con5.webp",
  ];
  const randomImage =
    congratsImages[Math.floor(Math.random() * congratsImages.length)];
  congratsDiv.innerHTML = `<img src="${randomImage}" alt="Поздравляем!">`;
  congratsDiv.classList.remove("hidden");
  guessInput.disabled = true;
  guessButton.disabled = true;
  resultText.textContent = "Поздравляем, вы угадали!";
}

// Обработчики событий
difficultyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    clickSound.play();
    const level = button.getAttribute("data-difficulty");
    startGame(level);
  });
});

guessButton.addEventListener("click", checkGuess);

// Активировать проверку нажатием Enter
guessInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !guessButton.disabled) {
    checkGuess();
  }
});
