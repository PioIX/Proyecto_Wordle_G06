//lista de palabras con 5 letras
const birds = [
  'Ricos',
  'Minar',
  'Gases',
  'Calor',
  'Grado',
  'Hielo',
  'Parar',
  'Falta',
  'Ayuda',
  'Clima',
  'Total',
  'Leyes',
  'Talar',
  'Crear', 
  'Suelo',
  'Joven',
  'Metas', 
  'Marco',
  'Resto',
  'Comer',
];
//añade palabras a la lista
const addedArray = [];

const addTo = (word) => {
  // define lo que el usuario ingresa como el id del elemento
  const userInput = document.getElementById('userInput');
  //añade a la lista el id de lo que el usuario ingresa
  addedArray.push(userInput.value);
  //añade lo ingresado a la lista y lo pasa a mayuscula
  const capitalAddedArray = addedArray.map((word) => word.toUpperCase());
  console.log(capitalAddedArray);
};
//pasa a mayuscula la lista cone el metodo .map() 
const upperCaseBirds = birds.map((item) => item.toUpperCase());
console.log(upperCaseBirds);


const randomArr = (arr) => {
  //crea un indice random 
  const randomIndex = Math.floor(Math.random() * arr.length);
  //consigue un item random 
  const item = arr[randomIndex];
  return item;
};


const word = randomArr(upperCaseBirds);
console.log(word);

//selecciona el tile container div
const tileDisplay = document.querySelector('.tile-container');
//selecciona el key container div
const keyboard = document.querySelector('.key-container');
//selecciona el msg container div
const messageDisplay = document.querySelector('.msg-container');

let currentRow = 0;
let currentTile = 0;
let isGameOver = false;

const keys = [
  'Q',
  'W',
  'E',
  'R',
  'T',
  'Y',
  'U',
  'I',
  'O',
  'P',
  '<<',
  'A',
  'S',
  'D',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  'ENTER',
  'Z',
  'X',
  'C',
  'V',
  'B',
  'N',
  'M',
];
const guessRows = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
];
//busca cada guessRows
guessRows.forEach((guessRow, guessRowIndex) => {
  //crea un div para cada row
  const row = document.createElement('div');
  //establece el ID
  row.setAttribute('id', 'guessRow-' + guessRowIndex);
  //busca cada tile
  guessRow.forEach((guess, guessIndex) => {
    //crea un div para cada tile
    const tileElement = document.createElement('div');
    //establece el id de las tiles
    tileElement.setAttribute(
      'id',
      'guessRow-' + guessRowIndex + '-tile-' + guessIndex
    );
    //le da a las tile una clase
    tileElement.classList.add('tile');
    //crea el elemento row en HTML
    row.append(tileElement);
  });
  //crea las tiles en HTML
  tileDisplay.append(row);
});

//creando un boton de tecla para cada tecla que se pueda presionar
keys.forEach((key) => {
  //por cada tecla crear un boton con el texto de la tecla
  const button = document.createElement('button');
  button.textContent = key;

  //dandole a cada tecla un id del valor de su letra
  button.setAttribute('id', key);
  //un evento que controla los clicks
  button.addEventListener('click', () => handleClick(key));
  //crea el teclado
  keyboard.append(button);
});

const handleClick = (letter) => {
  //loggeando que tecla esta siendo presionada
  console.log('clicked', letter);
  if (letter === '<<') {
    deleteLetter();
    console.log('guessRows', guessRows);
    return;
  }
  if (letter === 'ENTER') {
    checkRow();
    console.log('guessRows', guessRows);
    return;
  }
  addLetter(letter);
};

const addLetter = (letter) => {
  if (currentTile < 5 && currentRow < 6) {
    const tile = document.getElementById(
      'guessRow-' + currentRow + '-tile-' + currentTile
    );
    tile.textContent = letter;
    guessRows[currentRow][currentTile] = letter;
    tile.setAttribute('data', letter);
    currentTile++;
    console.log('guessRows', guessRows);
  }
};
const deleteLetter = (letter) => {
  if (currentTile > 0) {
    currentTile--;
    const tile = document.getElementById(
      'guessRow-' + currentRow + '-tile-' + currentTile
    );
    tile.textContent = '';
    guessRows[currentRow][currentTile] = '';
    tile.setAttribute('data', '');
  }
};

const checkRow = () => {
  const guess = guessRows[currentRow].join('');

  if (currentTile > 4) {
    console.log(`Guess is ${guess}, worlde is ${word}`);
    flipTile();
    if (word === guess) {
      isGameOver = true;
      return;
    } else {
      //si estas en tu ultimo intetno y fallas, perdes
      if (currentRow >= 5) {
        isGameOver = true;
        return;
      }
      //si la row actual es menor que 5 incrementa la siguiente linea
      if (currentRow < 5) {
        currentRow++;
        //establece la linea actual de vuelta a 0
        currentTile = 0;
      }
    }
  }
};

const showMessage = (message) => {
  const messageElement = document.createElement('p');
  messageElement.textContent = message;
  messageDisplay.append(messageElement);
  setTimeout(() => messageDisplay.removeChild(messageElement), 1000);
};

const addColorToKey = (keyLetter, color) => {
  const key = document.getElementById(keyLetter);
  key.classList.add(color);
};

const flipTile = () => {
  const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes;
  let checkWord = word;
  const guess = [];

  rowTiles.forEach((tile) => {
    guess.push({ letter: tile.getAttribute('data'), color: 'grey-overlay' });
  });

  guess.forEach((guess) => {
    if (checkWord.includes(guess.letter)) {
      guess.color = 'yellow-overlay';
      checkWord = checkWord.replace(guess.letter, '');
    }
  });

  guess.forEach((guess, index) => {
    if (guess.letter == word[index]) {
      guess.color = 'green-overlay';
      checkWord = checkWord.replace(guess.letter, '');
    }
  });

  rowTiles.forEach((tile, index) => {
    setTimeout(() => {
      tile.classList.add('flip');
      tile.classList.add(guess[index].color);
      addColorToKey(guess[index].letter, guess[index].color);
    }, 500 * index);
  });
};