let moveBall = document.querySelectorAll(".ball-float")
let pts = document.querySelector(".pointV")
let seg = document.querySelector(".timeV")
let popUp = document.querySelector(".popUp")
let endPopUp = document.querySelector(".endPopUp")
let playBox = document.querySelector(".ball-container")
// let prevPts = document.querySelector(".previousV")
let selSize = document.querySelector(".selectedSize")
let selTime = document.querySelector(".selectedTime")

let easy = document.getElementById('facil');
let medium = document.getElementById('medio');
let hard = document.getElementById('dificil');

let play = document.getElementById('play')

let value = 0;
let time = 0;

let maxTime = [60, 50, 30];
let actualMax = 0

var lvl = 0;

// var MyValues = {};

function restart(){
    window.location.reload();
}

var buts = [easy, medium, hard]

buts.forEach((item, index) =>{  
    let cut_but = [...buts]
    cut_but.splice(index, 1);
    item.addEventListener("click", () => {
        lvl = item.value
        actualMax = maxTime[lvl]
        item.classList.add('selected')
        cut_but.forEach(a =>{
            a.classList.remove('selected')
        })
    })
    
})

window.addEventListener(('load'), () =>{
    popUp.style.left = "30%";
    // prevPts.innerHTML = `${MyValues.tries} pontos anteriores`
})

play.addEventListener(('click'), () =>{
    popUp.style.left = "-700px";
    timer();
    callRun();
})

function callRun(){   
    moveBall.forEach((item, index) =>{
        switch (lvl) {
            case '0':
                playBox.classList.add('sm-box')
                moveBall[index].classList.add('slow-move')
                break;
            case '1':
                playBox.classList.add('md-box')
                moveBall[index].classList.add('mid-move')
                break;
            case '2':
                playBox.classList.add('bg-box')
                moveBall[index].classList.add('fast-move')
                break;
        }
        let firstRandomX = Math.floor(Math.random() * 99) + 1;
        let firstRandomY = Math.floor(Math.random() * 99) + 1;
        moveBall[index].style.top = `${firstRandomX}%`;
        moveBall[index].style.right = `${firstRandomY}%`
        item.addEventListener(('click'), () =>{
            value++;
        
            let randomX = Math.floor(Math.random() * 99) + 1;
            let randomY = Math.floor(Math.random() * 99) + 1;
        
            let randomColor = Math.floor(Math.random()*16777215).toString(16);
            moveBall[index].style.backgroundColor = "#" + randomColor;
        
            pts.innerHTML = `${value} pontos atuais`;
            
            moveBall[index].style.top = `${randomY}%`;
            moveBall[index].style.right = `${randomX}%`
            // MyValues.maxPts = value
        })


    })
}

function timer() {
    const myInterval = setInterval(function(a) {
        time++;
        seg.innerHTML = `${time} segundos`;

        if(time == actualMax){
            playBox.classList.add('unclickable')
            endPopUp.style.left = "30%";
            // callStorage()
            clearInterval(myInterval)
        }
    }, 1000);
}

// function callStorage(){
//     var tried = 0;
//     MyValues.tries = tried

//     let storedTry = localStorage.getItem(MyValues.tries);

//     if(!storedTry){
//         localStorage.setItem(MyValues.tries, MyValues.maxPts)
//     }
//     if(storedTry){
//         MyValues.tries++;
//     }

// }