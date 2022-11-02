let moveBall = document.querySelectorAll(".ball-float")
let popUp = document.querySelector(".popUp")
let endPopUp = document.querySelector(".endPopUp")
let winPopUp = document.querySelector(".winPopUp")
let playBox = document.querySelector(".ball-container")
let popMid = document.querySelector(".popMid")

let easy = document.getElementById('facil');
let medium = document.getElementById('medio');
let hard = document.getElementById('dificil');

let play = document.getElementById('play')

let value = 0;
let time = 0;

let maxTime = [60, 40, 30];
let actualMax = 0

let requiredPts = [60, 75, 85]
let actualPts = 0

let lvl = 0;

// let MyValues = {};

function restart(){
    window.location.reload();
}


function handleStart(){
    popUp.style.left = "30%";
    
    let buts = [easy, medium, hard]

    
    let startBut = document.querySelector(".goOn")
        
    let selSize = document.querySelector(".selectedSize")
    let selTime = document.querySelector(".selectedTime")
    let selPoint = document.querySelector(".selectedPoint")

    buts.forEach((item, index) =>{  
        let cut_but = [...buts]
        cut_but.splice(index, 1);
        item.addEventListener("click", () => {
            lvl = item.value
            actualMax = maxTime[lvl]
            actualPts = requiredPts[lvl]
            popMid.style.opacity = "1"
            item.classList.add('selected')
            cut_but.forEach(a =>{
                a.classList.remove('selected')
            })
            switch (lvl) {
                case '0':
                    selSize.innerHTML = "Grande"
                    selTime.innerHTML = "60 segundos"
                    selPoint.innerHTML = "60 pontos"
                    break;
                case '1':
                    selSize.innerHTML = "Medio"
                    selTime.innerHTML = "40 segundos"
                    selPoint.innerHTML = "75 pontos"
                    break;
                case '2':
                    selSize.innerHTML = "Pequeno"
                    selTime.innerHTML = "30 segundos"
                    selPoint.innerHTML = "85 pontos"
                    break;
            }
        })
        
    })

    startBut.addEventListener(('mouseover'), () =>{
        let increase = 0;
        const myInterval = setInterval(function(a) {
            increase++;
        }, 500);
        startBut.style.rotate = `${increase}deg`
    })
}

window.addEventListener(('load'), () =>{
    handleStart()
    // prevPts.innerHTML = `${MyValues.tries} pontos anteriores`
})

play.addEventListener(('click'), () =>{
    popUp.style.left = "-700px";
    timer();
    callRun();
})

function callRun(){   
    moveBall.forEach((item, index) =>{
        
        let pts = document.querySelector(".pointV")
        switch (lvl) {
            case '0':
                playBox.classList.add('sm-box')
                moveBall[index].classList.add('bg-ball')
                moveBall[index].classList.add('slow-move')
                break;
            case '1':
                playBox.classList.add('md-box')
                moveBall[index].classList.add('md-ball')
                moveBall[index].classList.add('mid-move')
                break;
            case '2':
                playBox.classList.add('bg-box')
                moveBall[index].classList.add('sm-ball')
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
    let seg = document.querySelector(".timeV")
    const myInterval = setInterval(function(a) {
        actualMax--;
        seg.innerHTML = `${actualMax} segundos`;

        if(actualMax == 0){
            playBox.classList.add('unclickable')
            if(value >= actualPts){
                winPopUp.style.left = "30%"
                clearInterval(myInterval)
            }else{
                endPopUp.style.left = "30%";
                clearInterval(myInterval)
            }
            // callStorage()
            clearInterval(myInterval)
            
        }
    }, 1000);
}

const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
  let x = e.pageX;
  let y = e.pageY;

  cursor.style.top = y + "px";
  cursor.style.left = x + "px";
  cursor.style.display = "block";

});

document.addEventListener("mouseout", () => {
  cursor.style.display = "none";
});

// function callStorage(){
//     let tried = 0;
//     MyValues.tries = tried

//     let storedTry = localStorage.getItem(MyValues.tries);

//     if(!storedTry){
//         localStorage.setItem(MyValues.tries, MyValues.maxPts)
//     }
//     if(storedTry){
//         MyValues.tries++;
//     }

// }