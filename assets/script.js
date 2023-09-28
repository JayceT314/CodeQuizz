// Sample quiz questions and answers
const quizQuestions = [
    {
        question: "What is JavaScript?",
        choices: ["A programming language", "A type of coffee", "A book"],
        correctAnswer: "A programming language"
    },
    {
        question: "What does HTML stand for?",
        choices: ["Hypertext Markup Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language"],
        correctAnswer: "Hypertext Markup Language"
    },
    // Add more questions here
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
const timerDuration = 60; // Adjust as needed
const timerElement = document.getElementById("timer");
const questionTextElement = document.getElementById("question-text");
const choicesElement = document.getElementById("choices");

// Function to start the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    startTimer(timerDuration);
    displayQuestion();
}

// Function to start the timer
function startTimer(duration) {
    let timeRemaining = duration;
    timer = setInterval(function () {
        timerElement.textContent = timeRemaining;

        if (timeRemaining <= 0) {
            clearInterval(timer);
            endGame();
        }

        timeRemaining--;
    }, 1000);
}

// Function to display a question
function displayQuestion() {
    if (currentQuestionIndex < quizQuestions.length) {
        const currentQuestion = quizQuestions[currentQuestionIndex];
        questionTextElement.textContent = currentQuestion.question;
        choicesElement.innerHTML = "";

        currentQuestion.choices.forEach((choice, index) => {
            const choiceId = `choice${index}`;
            const choiceElement = document.createElement("li");
            choiceElement.innerHTML = `
                <input type="radio" name="answer" id="${choiceId}" value="${choice}">
                <label for="${choiceId}">${choice}</label>
            `;
            choiceElement.addEventListener("click", checkAnswer)
            choicesElement.appendChild(choiceElement);
        });
    } else {
        endGame();
    }
}

// Function to check the selected answer
function checkAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');

    if (selectedAnswer) {
        if (selectedAnswer.value === quizQuestions[currentQuestionIndex].correctAnswer) {
            score++;
        } else {
            // Deduct time for incorrect answer (adjust as needed)
            clearInterval(timer);
            startTimer(timerElement.textContent - 10); // Deduct 10 seconds
        }

        currentQuestionIndex++;
        displayQuestion();
    }
}

// Function to end the game
function endGame() {
    clearInterval(timer);
    // Display final score and initials input
    questionTextElement.textContent = `Quiz Over! Your Score: ${score}`;
    choicesElement.innerHTML = `
        <label for="initials">Enter Your Initials: </label>
        <input type="text" id="initials" placeholder="Your Initials">
        <button id="save-score">Save Score</button>
    `;

    // Add event listener for saving score
    const saveScoreButton = document.getElementById("save-score");
    saveScoreButton.addEventListener("click", saveScore);
}

// Function to save the score (you need to implement this)
function saveScore() {
    const initialsElement = document.getElementById("initials");
    const initials = initialsElement.value;
    localStorage.setItem(initials, score);
    // Store the score and initials (e.g., in local storage or send to a server)
}

// Add event listener to start button
const startButton = document.getElementById("start-button");
startButton.addEventListener("click", startQuiz);

// Initialize the timer text
timerElement.textContent = timerDuration;

