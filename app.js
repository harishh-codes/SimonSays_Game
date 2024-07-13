let gameSeq = [];
let userSeq = [];

let btns = ["yellow","red","green","purple"];

let started = false;

let level = 0;

let highscore = 0;
let hs = document.querySelector(".highscore");

let h2 = document.querySelector("h2");

document.addEventListener("keypress",function() {
    if(started==false){
        console.log("Game is started");
        started = true;
        
        levelUp();
    }

})

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    },200)
}



function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIndx = Math.floor(Math.random()*3);
    let randColor = btns[randIndx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    btnFlash(randBtn);
}

function checkAns(idx) {

    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length === gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }
    else {
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b> <br>Press any key to start.`;
        if(level>highscore){
            highscore = level;
            hs.innerText = `Highscore : ${level}`;
        }
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout( function() {
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        restart();
        
    }
}


function btnPress() {
    let btn = this;
    btnFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function restart() {
    started = false;
    userSeq = [];
    gameSeq = [];
    level = 0;
}