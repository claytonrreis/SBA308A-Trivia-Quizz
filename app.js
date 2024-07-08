//https://opentdb.com/api.php?amount=12

const _questions = document.getElementById("question");
const _options = document.querySelector(".options");
const _correctScore = document.getElementById("corrects");
const _totalQuestions = document.getElementById("numQuestions");
const _checkBtn = document.getElementById("checkSubmit");
const _playAgainBTN = document.getElementById("playAgain");
const _result = document.getElementById("result");

let correctAnswer = "";
(correctScore = askedCount = 0), (totalQuestion = 12);

function eventHandler() {
  _checkBtn.addEventListener("click", checkAnswer);
  _playAgainBTN.addEventListener("click", restartQuiz);
}

document.addEventListener("DOMContentLoaded", () => {
  loadQuestios();
  eventHandler();
  _totalQuestions.textContent = totalQuestion;
  _correctScore.textContent = correctScore;
});

async function loadQuestios() {
  const APIUrl = "https://opentdb.com/api.php?amount=1";
  const result = await fetch(`${APIUrl}`);
  const data = await result.json();
  //   console.log(data.results[0]);
  _result.innerHTML = "";
  showQuestion(data.results[0]);
}

function showQuestion(data) {
  _checkBtn.disabled = false;
  correctAnswer = data.correct_answer;
  //   console.log(correctAnswer);
  let incorrectAnser = data.incorrect_answers;
  //   console.log(incorrectAnser);
  let optionsList = incorrectAnser;
  optionsList.splice(
    Math.floor(Math.random() * (incorrectAnser.length + 1)),
    0,
    correctAnswer
  );

  //   console.log(optionsList);
  //   console.log(correctAnswer);

  _questions.innerHTML = `${data.question} <br> <span class="category">${data.category}</span>`;

  _options.innerHTML = `${optionsList
    .map((option, index) => `<li>${index + 1}. <span> ${option} </span> </li>`)
    .join("")}`;

  // console.log(_options.innerHTML);

  selectOption();
}

function selectOption() {
  _options.querySelectorAll("li").forEach((option) => {
    option.addEventListener("click", () => {
      if (_options.querySelector(".selected")) {
        const activeOption = _options.querySelector(".selected");
        activeOption.classList.remove("selected");
      }
      option.classList.add("selected");
    });
  });
  // console.log(correctAnswer);
}

function checkAnswer() {
  _checkBtn.disabled = true;
  if (_options.querySelector(".selected")) {
    let selectedAnswer = _options.querySelector(".selected span").textContent;
    // console.log(selectedAnswer);
    if (selectedAnswer.trim() == HTMLDecode(correctAnswer)) {
      correctScore++;
      _result.innerHTML = `<p> <i class = "fas fa-check"> </i> Correct Answer! </p>`;
    } else {
      _result.innerHTML = `<p> <i class = "fas fa-times"> </i> Incorrect Answer! <br> <small><b>Correct Answer:</b>${correctAnswer}</small></p>`;
    }
    checkCount();
  } else {
    _result.innerHTML = `<p><i class= "fas fa-question"></i>Please Select an Option!</p>`;
    _checkBtn.disabled = false;
  }
  //   console.log("test");
}

function HTMLDecode(textString) {
  let doc = new DOMParser().parseFromString(textString, "text/html");
  return doc.documentElement.textContent;
}

function checkCount() {
  askedCount++;
  setCount();
  if (askedCount == totalQuestion) {
    _result.innerHTML = `<p>Your score is ${correctScore}.</p>`;
    alert(`Your score is ${correctScore}.`);
    _playAgainBTN.style.display = "block";
    _checkBtn.style.display = "none";
  } else {
    setTimeout(() => {
      loadQuestios();
    }, 1500);
  }
}

function setCount() {
  _totalQuestions.textContent = totalQuestion;
  _correctScore.textContent = correctScore;
}

function restartQuiz() {
  correctScore = askedCount = 0;
  _playAgainBTN.style.display = "none";
  _checkBtn.style.display = "block";
  _checkBtn.disabled = false;
  setCount();
  loadQuestios();
}
