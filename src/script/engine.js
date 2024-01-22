const state ={

    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },

    values: {
        gameVelocity: 1000,
        hitPosition:0,
        result: 0,
        currentTime: 30,
    },
    
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000)
    }

};

function countDown(){
    state.values.currentTime--;
    // Atualizar de maneira visual
    state.view.timeLeft.textContent = state.values.currentTime

    if (state.values.currentTime <= 0 ){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! Seu resultado foi: " + state.values.result);
    }
}

function playSound(){
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}

function randomSquare(){
    // Limpar classe inimigo de todos os quadrados
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    // Sortear um número aleatório de 1 a 9
    let randomNumber = Math.floor(Math.random()* 9);

    // Pegar quadrado do número sorteado
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");

    // Guardar o id do quadrado aletório sorteado
    state.values.hitPosition = randomSquare.id;
}


function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            // Quadrado que clicou igual a posição que está o inimigo
           if(square.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result;
                // Não ficar farmando no mesmo lugar
                state.values.hitPosition = null;
                playSound();
           }
        });
    })
};

function init(){
    addListenerHitBox();

};

init();