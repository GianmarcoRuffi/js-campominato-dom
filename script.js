/* Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git).
L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una b.
BONUS:
1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste*/

// Assegnazione variabili elementi e array

const grid = document.querySelector(".grid");
let bombAmount = 16;
let squares = [];
let maxAttempt;
let attempts = 0;
let gameOver = false;

// Creazione Tabella

function createBoard(fields) {
  grid.innerHTML = "";
  gameOver = false;
  attempts = 0;

  // Creazione di due array contenenti le bombe e le caselle vuote, ed unione dei due array tramite la funzione di concatenazione delle stringhe. Il totale andrà a formare il nostro campo di gioco.
  const bombsArray = Array(bombAmount).fill("bomb");
  const emptyArray = Array(fields - bombAmount).fill("valid");
  const gameArray = emptyArray.concat(bombsArray);

  const shuffledArray = shuffle(gameArray);

  maxAttempt = fields - bombAmount;

  for (let i = 0; i < fields; i++) {
    const square = document.createElement("div");
    square.innerText = i + 1;
    square.setAttribute("id", i);
    square.classList.add(shuffledArray[i]);
    grid.appendChild(square);
    squares.push(square);
    // Click generico sui quadratini

    square.addEventListener("click", function (e) {
      click(square);
    });
  }
}

// Shuffler

function shuffle(array) {
  let currentIndex = array.length;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

// Aggiunta dei numeri

for (let i = 0; i < squares.length; i++) {
  squares[i].setAttribute("data", total);
}

// Verifica il livello di difficoltà selezionato dall'utente

let difficulty = document.getElementById("difficulty");

let play = document.querySelector(".play");

// Esegui funzione per creare la tabella

play.addEventListener("click", function () {
  let value = difficulty.options[difficulty.selectedIndex].value;
  let text = difficulty.options[difficulty.selectedIndex].text;
  console.log(value + " " + text);
  let fields;
  switch (value) {
    case "1":
    default:
      fields = 100;
      break;

    case "2":
      fields = 81;
      break;

    case "3":
      fields = 49;
      break;

    case "4":
      fields = 30;
      break;
  }
  createBoard(fields);
});

// click sui quadrati

const clickedButtons = [];

function click(square) {
  if (square.classList.contains("bomb") && !gameOver) {
    square.classList.add("bomb-checked");
    gameOver = true;
    alert(
      "Game Over! Hai completato il gioco con il seguente punteggio: " +
        attempts
    );
  } else if (attempts === maxAttempt && !gameOver) {
    square.classList.add("checked");

    alert("Perfect");
    return;
  } else if (!gameOver && !clickedButtons.includes(square.id)) {
    clickedButtons.push(square.id);
    square.classList.add("checked");
    attempts++;

    return;
  }
}
