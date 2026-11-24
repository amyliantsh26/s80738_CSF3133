
// Array to store quiz questions
const questions = [
    {
        question: "1. What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlinks and Text Markup Language",
            "Home Tool Markup Language"
        ],
        correctAnswer: "Hyper Text Markup Language"
    },

    {
        question: "2. Which language is used to style web pages?",
        options: [
            "HTML",
            "CSS",
            "Java",
            "Python"
        ],
        correctAnswer: "CSS"
    },

    {
        question: "3. Which language makes a web page interactive?",
        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ],
        correctAnswer: "JavaScript"
    },

    {
        question: "4. Which HTML tag is used to create a hyperlink?",
        options: [
            "<link>",
            "<a>",
            "<href>",
            "<url>"
        ],
        correctAnswer: "<a>"
    },

    {
        question: "5. Which symbol is used for an ID selector in CSS?",
        options: [
            ".",
            "#",
            "*",
            "@"
        ],
        correctAnswer: "#"
    },

    {
        question: "6. Which keyword is used to declare a variable in JavaScript?",
        options: [
            "int",
            "string",
            "let",
            "define"
        ],
        correctAnswer: "let"
    },

    {
        question: "7. Which HTML tag is used to insert an image?",
        options: [
            "<picture>",
            "<image>",
            "<img>",
            "<src>"
        ],
        correctAnswer: "<img>"
    },

    {
        question: "8. Which method displays a message in an alert box?",
        options: [
            "alert()",
            "message()",
            "display()",
            "print()"
        ],
        correctAnswer: "alert()"
    },

    {
        question: "9. Which property changes the text color in CSS?",
        options: [
            "background-color",
            "font-size",
            "color",
            "text-style"
        ],
        correctAnswer: "color"
    },

    {
        question: "10. Which HTML tag is used to create a paragraph?",
        options: [
            "<h1>",
            "<p>",
            "<div>",
            "<br>"
        ],
        correctAnswer: "<p>"
    }
];


// Variables
let quizQuestions = [];
let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;
let answered = false;


// Function to randomly shuffle questions
function shuffleQuestions() {

    for (let i = quizQuestions.length - 1; i > 0; i--) {

        let j = Math.floor(Math.random() * (i + 1));

        let temp = quizQuestions[i];

        quizQuestions[i] = quizQuestions[j];

        quizQuestions[j] = temp;
    }
}


// Function to start the quiz
function startQuiz() {

    clearInterval(timer);

    quizQuestions = [...questions];

    shuffleQuestions();

    currentQuestion = 0;
    score = 0;

    document.getElementById("start-section").style.display = "none";

    document.getElementById("result-section").style.display = "none";

    document.getElementById("quiz-section").style.display = "block";

    document.getElementById("footer-score").innerText =
        "Your score will appear here after finishing the quiz.";

    displayQuestion();
}


// Function to display current question
function displayQuestion() {

    clearInterval(timer);

    answered = false;

    timeLeft = 15;

    document.getElementById("question-number").innerText =
        "Question " + (currentQuestion + 1) +
        " / " + quizQuestions.length;

    document.getElementById("score").innerText =
        "Score: " + score;

    document.getElementById("question").innerText =
        quizQuestions[currentQuestion].question;

    document.getElementById("feedback").innerText = "";

    document.getElementById("feedback").className = "";

    document.getElementById("submit-btn").disabled = false;

    document.getElementById("next-btn").disabled = true;

    document.getElementById("next-btn").innerText =
        "Next Question";

    // Display answer options
    let optionsHTML = "";

    quizQuestions[currentQuestion].options.forEach(function(option) {

        optionsHTML += `
            <label class="option">
                <input type="radio" name="answer" value="${option}">
                ${option}
            </label>
        `;

    });

    document.getElementById("answer-options").innerHTML =
        optionsHTML;

    startTimer();
}


// Function to start countdown timer
function startTimer() {

    clearInterval(timer);

    timeLeft = 15;

    document.getElementById("time").innerText = timeLeft;

    timer = setInterval(function() {

        timeLeft--;

        document.getElementById("time").innerText = timeLeft;

        if (timeLeft <= 0) {

            clearInterval(timer);

            timeUp();

        }

    }, 1000);
}


// Function when time runs out
function timeUp() {

    answered = true;

    document.getElementById("feedback").innerText =
        "Time's up! No answer selected.";

    document.getElementById("feedback").className = "incorrect";

    document.getElementById("submit-btn").disabled = true;

    // Disable all answer options
    let options = document.querySelectorAll(
        'input[name="answer"]'
    );

    options.forEach(function(option) {

        option.disabled = true;

    });

    document.getElementById("next-btn").disabled = false;
}


// Function to check selected answer
function checkAnswer() {

    if (answered) {
        return;
    }

    let selectedAnswer = document.querySelector(
        'input[name="answer"]:checked'
    );

    if (selectedAnswer === null) {

        document.getElementById("feedback").innerText =
            "Please select an answer!";

        document.getElementById("feedback").className = "incorrect";

        return;
    }

    clearInterval(timer);

    answered = true;

    let correctAnswer =
        quizQuestions[currentQuestion].correctAnswer;

    if (selectedAnswer.value === correctAnswer) {

        score++;

        document.getElementById("feedback").innerText =
            "Correct! Well done!";

        document.getElementById("feedback").className = "correct";

    } else {

        document.getElementById("feedback").innerText =
            "Incorrect! The correct answer is: " + correctAnswer;

        document.getElementById("feedback").className = "incorrect";

    }

    document.getElementById("score").innerText =
        "Score: " + score;

    // Disable answer options after submission
    let options = document.querySelectorAll(
        'input[name="answer"]'
    );

    options.forEach(function(option) {

        option.disabled = true;

    });

    document.getElementById("submit-btn").disabled = true;

    document.getElementById("next-btn").disabled = false;
}


// Function to move to next question
function nextQuestion() {

    currentQuestion++;

    if (currentQuestion < quizQuestions.length) {

        displayQuestion();

    } else {

        showResult();

    }
}


// Function to display final result
function showResult() {

    clearInterval(timer);

    document.getElementById("quiz-section").style.display = "none";

    document.getElementById("result-section").style.display = "block";

    document.getElementById("final-score").innerText =
        "Your Final Score: " + score + " / " + quizQuestions.length;

    let percentage = (score / quizQuestions.length) * 100;

    if (percentage >= 80) {

        document.getElementById("result-message").innerText =
            "Excellent! You did a great job!";

    } else if (percentage >= 50) {

        document.getElementById("result-message").innerText =
            "Good effort! Keep practising!";

    } else {

        document.getElementById("result-message").innerText =
            "Keep learning and try again!";

    }

    // Display final score in footer
    document.getElementById("footer-score").innerText =
        "Final Score: " + score + " / " + quizQuestions.length;

}
