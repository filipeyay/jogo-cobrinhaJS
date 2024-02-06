const board = document.getElementById("board");
const textoinstrucao = document.getElementById("texto-instrucao");
const gridSize = 20;
const score = document.getElementById('score');
const highScoreTexto = document.getElementById('highscore');

let cobra = [{ x: 10, y: 10 }]; // posição inicial da cobra
let comida = gerarComida(); // posição aleatoria da comida
let highscore = 0;
let direction = 'direita'; // direção
let jogoInterval;
let jogoDelayVelocidade = 200;
let jogoIniciado = false;

// desenha --> mapa, cobra, comida
function draw() {
    board.innerHTML = '';
    drawCobra();
    drawComida();
    updateScore();
}

// cobra
function drawCobra() {
    if (jogoIniciado){cobra.forEach((segmento) => {
        const cobraElemento = createJogoElemento('div', 'cobra');
        setPos(cobraElemento, segmento)
        board.appendChild(cobraElemento);
    });}
}

// comida
function drawComida() {
    if (jogoIniciado) {
        const comidaElemento = createJogoElemento('div', 'comida');
        setPos(comidaElemento, comida);
        board.appendChild(comidaElemento);
    }
}

// cria div cobra/comida
function createJogoElemento(tag, className) {
    const elemento = document.createElement(tag);
    elemento.className = className;
    return elemento;
}

// posição da cobra/comida
function setPos(elemento, posicao) {
    elemento.style.gridColumn = posicao.x;
    elemento.style.gridRow = posicao.y;
}

// gerar posição inicial da comida de forma alearotira
function gerarComida() {
    const x = Math.floor(Math.random() * gridSize + 1);
    const y = Math.floor(Math.random() * gridSize + 1);
    return { x, y };
}

// mover a cobra
function mover() {
    const head = { ...cobra[0] };
    switch(direction) {
        case 'direita':
            head.x++;
            break;
        case 'cima':
            head.y--;
            break;
        case 'baixo':
            head.y++;
            break;
        case 'esquerda':
            head.x--;
            break;
    }

    cobra.unshift(head);

    if (head.x === comida.x && head.y === comida.y) {
        comida = gerarComida();
        clearInterval(jogoInterval); // limpa ultimo interval
        jogoInterval = setInterval(() => {
            mover();
            checkColisao();
            draw();
        }, jogoDelayVelocidade);
    } else {
        cobra.pop();
    }
}

// função iniciar jogo
function iniciarJogo() {
    jogoIniciado = true;
    textoinstrucao.style.display = 'none';
    jogoInterval = setInterval(() => {
        mover();
        checkColisao();
        draw();
    }, jogoDelayVelocidade);
}

// teclas
function handleKeyPress(event) {
    if(!jogoIniciado && event.code === 'Space' || (jogoIniciado && event.key === ' ') // inicia jogo com a tecla espaço
    ) {
        iniciarJogo();
    } else {
        switch (event.key) {
            case 'ArrowUp':
                direction = 'cima';
                break;
            case 'ArrowDown':
                    direction = 'baixo';
                    break;
            case 'ArrowLeft':
                direction = 'esquerda';
                break;
            case 'ArrowRight':
                direction = 'direita';
                break;
        }
    }
}

document.addEventListener('keydown', handleKeyPress);

function aumentarVelocidade() {
    console.log(jogoDelayVelocidade);
    if (jogoDelayVelocidade > 150) {
        jogoDelayVelocidade -= 5;
    } else if (jogoDelayVelocidade > 100) {
        jogoDelayVelocidade -= 3;
    } else if (jogoDelayVelocidade > 50) {
        jogoDelayVelocidade -= 2;
    } else if (jogoDelayVelocidade > 25) {
        jogoDelayVelocidade -= 1;
    }
}

function checkColisao() {
    const head = cobra[0];
    if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
        resetJogo();
    }

    for (let i = 1; i < cobra.length; i++) {
        if (head.x === cobra[i].x && head.y === cobra[i].y) {
            resetJogo();
        }
    }
}

function resetJogo() {
    updateHighScore();
    stopJogo();
    cobra = [{ x: 10, y: 10 }];
    comida = gerarComida();
    direction = 'direita';
    jogoDelayVelocidade = 200;
    updateScore();
}

// pontuação
function updateScore() {
    const scoreAtual = cobra.length - 1;
    score.textContent = scoreAtual.toString().padStart(3, '0');
}

function stopJogo() {
    clearInterval(jogoInterval);
    jogoIniciado = false;
    textoinstrucao.style.display = 'block';
}

function updateHighScore() {
    const scoreAtual = cobra.length - 1;
    if (scoreAtual > highscore) {
        highscore = scoreAtual;
        highScoreTexto.textContent = highscore.toString().padStart(3, '0');
    }
    highScoreTexto.style.display = 'block';
}