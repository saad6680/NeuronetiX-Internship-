// script.js

const quizData = {
    easy: [
        { question: "What is the capital of France?", choices: ["Paris", "London", "Berlin", "Madrid"], answer: 0 },
        { question: "2 + 2 equals?", choices: ["3", "4", "5", "6"], answer: 1 },
        { question: "Which planet is known as the Red Planet?", choices: ["Earth", "Mars", "Jupiter", "Venus"], answer: 1 }
    ],
    medium: [
        { question: "What is the chemical symbol for water?", choices: ["H2O", "O2", "CO2", "HO"], answer: 0 },
        { question: "Which country is home to the kangaroo?", choices: ["Australia", "India", "Brazil", "USA"], answer: 0 },
        { question: "Who wrote 'To Kill a Mockingbird'?", choices: ["Harper Lee", "J.K. Rowling", "George Orwell", "Mark Twain"], answer: 0 }
    ],
    hard: [
        { question: "What is the square root of 144?", choices: ["10", "11", "12", "13"], answer: 2 },
        { question: "Who painted the Mona Lisa?", choices: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"], answer: 1 },
        { question: "What is the capital of Iceland?", choices: ["Reykjavik", "Oslo", "Copenhagen", "Stockholm"], answer: 0 }
    ]
};

let currentQuestionIndex = 0;
let score = 0;
let timer;
let highScores = [];

const startButton = document.getElementById('start-quiz');
const quizDiv = document.getElementById('quiz');
const resultDiv = document.getElementById('result');
const retryButton = document.getElementById('retry');
const scoreSpan = document.getElementById('score');
const highScoreList = document.getElementById('high-score-list');
const difficultySelect = document.getElementById('difficulty');
let selectedDifficulty = 'easy';
let selectedQuestions = quizData[selectedDifficulty];

startButton.addEventListener('click', startQuiz);
retryButton.addEventListener('click', resetQuiz);
difficultySelect.addEventListener('change', updateDifficulty);

function updateDifficulty() {
    selectedDifficulty = difficultySelect.value;
    selectedQuestions = quizData[selectedDifficulty];
}

function startQuiz() {
    startButton.style.display = 'none';
    quizDiv.style.display = 'block';
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex < selectedQuestions.length) {
        const questionData = selectedQuestions[currentQuestionIndex];
        quizDiv.innerHTML = `
            <h2>${questionData.question}</h2>
            <ul>
                ${questionData.choices.map((choice, index) => `<li><button onclick="selectAnswer(${index})">${choice}</button></li>`).join('')}
            </ul>
            <p id="timer">Time Left: 15s</p>
        `;
        startTimer();
    } else {
        endQuiz();
    }
}

function selectAnswer(selectedIndex) {
    const correctAnswer = selectedQuestions[currentQuestionIndex].answer;
    if (selectedIndex === correctAnswer) {
        score++;
    }
    currentQuestionIndex++;
    showQuestion();
}

function startTimer() {
    let timeLeft = 15;
    document.getElementById('timer').innerText = `Time Left: ${timeLeft}s`;
    
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Time's up! Moving to the next question.");
            selectAnswer(-1); // No answer chosen if timer runs out
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timer);
    quizDiv.style.display = 'none';
    resultDiv.style.display = 'block';
    scoreSpan.innerText = `${score}/${selectedQuestions.length}`;
    highScores.push(score);
    updateHighScores();
}

function resetQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    quizDiv.style.display = 'none';
    resultDiv.style.display = 'none';
    startButton.style.display = 'block';
}

function updateHighScores() {
    highScoreList.innerHTML = highScores.map(score => `<li>${score}</li>`).join('');
    document.getElementById('high-scores').style.display = 'block';
}
