var questionEl = document.querySelector(".question");
var answersEl = document.querySelector(".answers");
var feedbackEl = document.querySelector(".feedback");
var timerEl = document.querySelector("#time");
var highscoreDisplayEl = document.querySelector('.highscores')

var questions = ["What language is making a framework for this website to work off of?", "What language is styling this website?", "What does DOM stand for?", "What framework allows for convinient DOM manipulation?", "The ____ tag tell search engines about your website"];



var answers = [
    ["HTML", "CSS", "JQuery", "Python"],
    ["CSS", "Javascript", "Bootstrap", "Scratch"],
    ["Document Object Model", "Document Orientation Modulus", "Direct Object Manipulation", "Don't Orient Marigolds"],
    ["JQuery", "Javascript", "Moment", "Bootstrap"],
    ["meta", "!DOCTYPE", "head", "body"]
];

var timeLeft = 0;
var timer;
var question = -1;
var qOrder = [0, 1, 2, 3, 4]; //question order
qOrder = shuffleArray(qOrder);

var highscores = (localStorage.getItem("highscores") == null) ? [] : JSON.parse(localStorage.getItem("highscores"));
console.log(highscores);
if(highscoreDisplayEl){
    if(highscores!==null){
        for(let i=0; i<highscores.length; i++){
            let tempLi = document.createElement('li');
            tempLi.textContent = highscores[i].initials + ": " + highscores[i].score;
            highscoreDisplayEl.children[0].append(tempLi);

        }
    }
}else{

    //when a button is clicked in the answers section we either start the game or perform answer logic
    document.querySelector('.answers').addEventListener('click', function(e) {
        let clicked = e.target;
        if(clicked.tagName == 'BUTTON'){
            if(clicked.id == 'start'){
                //start code here
                question = -1;
                qOrder = [0, 1, 2, 3, 4]; //question order
                qOrder = shuffleArray(qOrder);
                timeLeft=60;
                timer();
                timer = setInterval(timer, 1000);
                renderQuestion();
            }else if(clicked.id == 'submit'){
                submitScore();
            }else{ //it must be an answer

                if(clicked.textContent == answers[selected][0]){
                    feedbackEl.innerHTML = "<hr>Correct!"
                    renderQuestion();
                }else{
                    feedbackEl.innerHTML = "<hr>Wrong!";
                    timeLeft-=4;
                    document.getElementById("time").children[0].textContent = timeLeft;
                    renderQuestion();
                }
            }
        }
    });
}
function renderQuestion(){
    question += 1;
    if(question < questions.length){
        selected = qOrder[question]
        questionEl.children[0].textContent=questions[selected];
        
        renderAnswers(selected);
    }else{
        renderScore();
    }
}

function renderAnswers(selected){
    answersEl.innerHTML="";
    let ulEl = document.createElement('ul');

    let order = [0, 1, 2, 3];

    order = shuffleArray(order); //the first element of each answers array will always be the correct one. To avoid being predictable from the users point of view we need to display them in a random order 

    for(let i=0; i<answers[selected].length; i++){
        let liEl = document.createElement('li');
        let btnEl = document.createElement('button');
        btnEl.textContent=answers[selected][order[i]];
        liEl.append(btnEl);
        ulEl.append(liEl);
    }
    answersEl.append(ulEl);
}

function renderScore() {
    questionEl.textContent="Good Job! Your score was " + timeLeft;
    answersEl.innerHTML="<form><input placeholder='Initials Here'></input><button id='submit'>Submit Score</button></form>";
    clearInterval(timer);
    feedbackEl.textContent='';

}

function timer() {
    if(timeLeft <= 0){
        clearInterval(timer);
        renderScore();
    }
    document.getElementById("time").children[0].textContent = timeLeft;
    timeLeft -= 1;
}

function submitScore(){
    let submission = {
        score: timeLeft,
        initials: document.querySelector('input').value
    }
    highscores.push(submission);
    console.log(highscores)
    localStorage.setItem("highscores", JSON.stringify(highscores))
}



/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return(array)
}