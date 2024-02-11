const questions = [
    {
        question : "what is my favourite food ?",
        answers: [
            {text : "burger", correct: false},
            {text : "water-balls", correct: true},
            {text : "pavbhaji", correct: false},
            {text : "dosa", correct: false}
        ]
    },
    {
        question : "Do I prefer coffee or tea ?",
        answers: [
            {text : "coffee", correct: false},
            {text : "tea", correct: true},
        ]
    },
    {
        question : "Which is my favourite subject in school? ?",
        answers: [
            {text : "english", correct: false},
            {text : "hindi", correct: true},
            {text : "maths", correct: false},
            {text : "social science", correct: false}
        ]
    },
    {
        question : "what is my birthday date ?",
        answers: [
            {text : "15/05/2001", correct: true},
            {text : "30/11/2000", correct: false},
            {text : "10/02/1998", correct: false},
            {text : "03/08/2000", correct: false}
        ]
    },
    {
        question : "do you think i am a friendly person?",
        answers: [
            {text : "yes", correct: true},
            {text : "no", correct: false}
        ]
    },

];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;
    questionElement.innerHTML = questionNo + " . " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => { 
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = ` you scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "play again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }

}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
startQuiz();











