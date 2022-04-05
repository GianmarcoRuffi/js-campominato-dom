/* L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro. */

// Assegnazione variabili elementi e array

const grid = document.querySelector(".grid");
let bombAmount = 16;
let squares = [];
let maxAttempt;
let attempts = 0;

// Creazione Tabella

function createBoard(fields) {
  grid.innerHTML = "";

  // Creazione di due array contenenti le bombe e le caselle vuote, ed unione dei due array tramite la funzione di concatenazione delle stringhe. Il totale andrà a formare il nostro campo di gioco.
  const bombsArray = Array(bombAmount).fill("bomb");
  const emptyArray = Array(fields - bombAmount).fill("valid");
  const gameArray = emptyArray.concat(bombsArray);
  const shuffledArray = gameArray.sort(() => Math.random() - 0.5);
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

function click(square) {
  console.log(square.id);
  attempts++;
  console.log(attempts);
  console.log(maxAttempt);
  if (square.classList.contains("bomb")) {
    square.classList.add("bomb-checked");
    alert("Game Over!");
  } else if (attempts === maxAttempt) {
    square.classList.add("checked");
    square.innerHtml = total;
    alert("Perfect");
    return;
  } else {
    let total = square.getAttribute("data");
    if (total != 0) {
      square.classList.add("checked");
      square.innerHtml = total;
      return;
    }
  }
}
