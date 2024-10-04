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

// Тексты на разных языках
const texts = {
  ru: {
    title: "Угадай число",
    selectDifficulty: "Выберите уровень сложности, чтобы начать",
    showDifficulty: "Диапозон ",
    guess: "попытка",
    guesses: "попыток",
    placeholder: "Введите число",
    buttonGuess: "Угадать",
    winMessage: "Поздравляем, вы угадали!",
    loseMessage: (number) => `Вы проиграли! Число было ${number}.`,
    higher: (attempts) => `Число больше. Осталось ${attempts} попыток.`,
    lower: (attempts) => `Число меньше. Осталось ${attempts} попыток.`,
    difficulties: {
      easy: "Легко",
      medium: "Средне",
      hard: "Сложно",
    },
  },
  en: {
    title: "Guess the Number",
    selectDifficulty: "Choose a difficulty level to start",
    showDifficulty: "Range ",
    guess: "guess",
    guesses: "guesses",
    placeholder: "Enter a number",
    buttonGuess: "Guess",
    winMessage: "Congratulations, you guessed it!",
    loseMessage: (number) => `You lost! The number was ${number}.`,
    higher: (attempts) => `The number is higher. ${attempts} attempts left.`,
    lower: (attempts) => `The number is lower. ${attempts} attempts left.`,
    difficulties: {
      easy: "Easy",
      medium: "Medium",
      hard: "Hard",
    },
  },
};

let currentLang = "ru"; // Язык по умолчанию

// Конфигурация уровней
const levels = {
  easy: { max: 10, attempts: 3 },
  medium: { max: 50, attempts: 5 },
  hard: { max: 100, attempts: 7 },
};

// Переменные игры
let randomNumber, attemptsLeft, maxNumber;

// Обновление текста интерфейса
function updateText() {
  const t = texts[currentLang];
  document.getElementById("title").textContent = t.title;
  document.getElementById("instruction").textContent = t.selectDifficulty;
  document.getElementById("guess-input").placeholder = t.placeholder;
  document.getElementById("guess-btn").textContent = t.buttonGuess;

  // Обновляем кнопки сложности
  document.querySelectorAll(".difficulty-btn").forEach((btn) => {
    const difficulty = btn.getAttribute("data-difficulty");
    btn.textContent = t.difficulties[difficulty];

    // Устанавливаем подсказку с диапазоном чисел и количеством попыток
    const { max, attempts } = levels[difficulty];
    btn.title = `${t.showDifficulty}: 1-${max}, ${attempts} ${
      attempts > 1 ? `${t.guesses}` : `${guess}`
    }`;
  });
}

// Начало игры
function startGame(level) {
  const { max, attempts } = levels[level];
  maxNumber = max;
  attemptsLeft = attempts;
  randomNumber = Math.floor(Math.random() * max) + 1;

  // Скрываем инструкцию при начале игры
  instruction.style.display = "none";

  guessInput.disabled = false;
  guessButton.disabled = false;
  resultText.textContent = "";
  congratsDiv.classList.add("hidden");
}

function endGame() {
  guessInput.disabled = true;
  guessButton.disabled = true;
  instruction.style.display = "block"; // Показать инструкцию
}

// Проверка попытки
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
    endGame(); // Заканчиваем игру при правильном ответе
  } else if (attemptsLeft === 0) {
    resultText.textContent = texts[currentLang].loseMessage(randomNumber);
    endGame(); // Заканчиваем игру, если попытки закончились
  } else {
    resultText.textContent =
      guess < randomNumber
        ? texts[currentLang].higher(attemptsLeft)
        : texts[currentLang].lower(attemptsLeft);
  }
  guessInput.value = "";
}

// Показ поздравительного изображения
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
  resultText.textContent = texts[currentLang].winMessage;
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

// Смена языка
document.querySelectorAll(".lang-btn").forEach((button) => {
  button.addEventListener("click", () => {
    currentLang = button.getAttribute("data-lang");
    updateText();
  });
});
