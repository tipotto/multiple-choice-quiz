let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let send_array = [];
let current_select_val="";
//Questions and Options array
const quizArray = [
  {
    id: "0",
    question: "サイトにreCAPTCHAは設定していますか？",
    options: ["はい", "いいえ"],
    correct: "はい",
  },
  {
    id: "1",
    question: "今現在ハッキングされてますか？",
    options: ["はい", "いいえ"],
    correct: "いいえ",
  },
  {
    id: "2",
    question: "個人情報なんてくそくらえと思いますか？",
    options: ["はい", "いいえ"],
    correct: "いいえ",
  },
];

//Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    if(current_select_val === quizArray[questionCount].correct){
        send_array.push("1");
    }else{
        send_array.push("");    
    }
    current_select_val="";
    questionCount += 1;
    if (questionCount == quizArray.length) {
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      Setup_TreeChart();
      //userScore.innerHTML ="Your score is " + send_array + " out of " + questionCount;
    } else {
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      quizDisplay(questionCount);
    }
  })
);

//Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
  quizArray.sort(() => Math.random() - 0.5);
  for (let i of quizArray) {
    i.options.sort(() => Math.random() - 0.5);
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    for (let x of i.options){
        div.innerHTML += `<button class="option-div" onclick="checker(this)">${x}</button>`
    }
    quizContainer.appendChild(div);
  }
}

function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");
  
  
  options.forEach((element) => {
    if (userSolution === element.innerText) {
        element.classList.add("correct");
    }else{
        element.classList.remove("correct");
    }
  });

  options.forEach((element) => {
    element.disabled = false;
  });
  current_select_val=userSolution;
}

//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  send_array = [];
  count = 11;
  current_select_val="";
  quizCreator();
  quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};


function Setup_TreeChart(){
    const myDiagram =  new go.Diagram("myDiagramDiv",
    {
      "undoManager.isEnabled": true,
      layout: new go.TreeLayout({ angle: 90, layerSpacing: 35 })
    });
  
  myDiagram.nodeTemplate =
    new go.Node("Horizontal",
      { background: "#44CCFF" })
      .add(new go.Picture(
          { margin: 10, width: 50, height: 50, background: "red" })
          .bind("source"))
      .add(new go.TextBlock("Default Text",
          { margin: 12, stroke: "white", font: "bold 16px sans-serif" })
          .bind("text", "name"));
  
  myDiagram.linkTemplate =
    new go.Link(
      { routing: go.Link.Orthogonal, corner: 5 })
      .add(new go.Shape({ strokeWidth: 3, stroke: "#555" }))
  

        myDiagram.model = new go.TreeModel(
            [
              { key: "1",              name: "Don Meow",    },
              { key: "2", parent: "1", name: "Demeter",     },
              { key: "3", parent: "1", name: "Copricat",    },
              { key: "4", parent: "3", name: "Jellylorum",  },
              { key: "5", parent: "3", name: "Alonzo",      },
              { key: "6", parent: "2", name: "Munkustrap",  }
    ]);
}