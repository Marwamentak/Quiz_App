const questions = [
  {
    question: "Which is the largest animal in the world ?",
    answers: [
      { text:"Shark", correct: false},
      { text:"Blue whale", correct: true},
      { text:"Elephant", correct: false},
      { text:"Giraffe", correct: false},
    ]
  },
  {
    question: "Which is the smallest country in the world ?",
    answers: [
      { text:"Bhutan", correct: false},
      { text:"Vatican City", correct: true},
      { text:"Nepal", correct: false},
      { text:"Shri Lanka", correct: false},
    ]
  },
  {
    question: "Which is the largest desert int the world ?",
    answers: [
      { text:"Sahara", correct: false},
      { text:"Antarctica", correct: true},
      { text:"Gobi", correct: false},
      { text:"Kalahari", correct: false},
    ] 
  },
  {
    question: "Which is the smallest continent in the world ?",
    answers: [
      { text:"Asia", correct: false},
      { text:"Australia", correct: true},
      { text:"Arctic", correct: false},
      { text:"Africa", correct: false},
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();

  //display the question
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  //code to display the answers

  // Parcourt chaque réponse (answer) de la question actuelle (currentQuestion)
currentQuestion.answers.forEach(answer => {

  // Crée un nouvel élément de type "button" pour chaque réponse
  const button = document.createElement("button");

  // Définit le texte du bouton avec le texte de la réponse (answer.text)
  button.innerHTML = answer.text;

  // Ajoute une classe CSS "btn" au bouton (pour le style)
  button.classList.add("btn");

  // Ajoute le bouton créé comme enfant dans l'élément HTML `answerButton`
  answerButtons.appendChild(button);

  if(answer.correct) {
    button.dataset.correct = answer.correct;
  }
  button.addEventListener("click", selectAnswer);
});


}

function resetState() {
  nextButton.style.display = "none";
  while(answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

// Fonction pour gérer la sélection d'une réponse, e les l'even du click 
function selectAnswer(e) {
  
  // Récupère le bouton sur lequel l'utilisateur a cliqué
  const selectedBtn = e.target;

  // Vérifie si l'attribut 'data-correct' du bouton est égal à "true"
  // `dataset.correct` récupère la valeur de l'attribut `data-correct`
  const isCorrect = selectedBtn.dataset.correct === "true";

  // Si la réponse est correcte (isCorrect est vrai)
  if (isCorrect) {
    // Ajoute la classe CSS "correct" au bouton sélectionné
    // Cette classe peut être utilisée pour changer la couleur du bouton (par exemple, en vert)
    selectedBtn.classList.add("correct");
    score++;
  } else {
    // Sinon, ajoute la classe CSS "incorrect" au bouton sélectionné
    // Cette classe peut être utilisée pour changer la couleur du bouton (par exemple, en rouge)
    selectedBtn.classList.add("incorrect");
  }

  // Convertit les enfants de 'answerButtons' en un tableau et boucle à travers chaque bouton
  Array.from(answerButtons.children).forEach(button => {

    // Vérifie si l'attribut 'data-correct' du bouton est égal à "true"
    if (button.dataset.correct === "true") {
        // Ajoute la classe CSS "correct" au bouton pour indiquer qu'il s'agit de la bonne réponse
        button.classList.add("correct");
        //score++;
    }

    // Désactive le bouton, empêchant l'utilisateur de cliquer dessus à nouveau
    button.disabled = true;
  });

  // Affiche le bouton "suivant" (nextButton) en le rendant visible
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length} !`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else{
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else{
    startQuiz();
  }
})


startQuiz();