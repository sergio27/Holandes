const words = [];
const category = $(".lbl-category").text();

let wordCount = 0;
let points = 0;

let baseLanguage = "Holandés";
let wordNumber = 0;
let quizWords = [];

$.getJSON('../../docs/words.json', function(data) {
    data.forEach(function(word) {
      if (category == word.category) {
        words.push(word);
      }
    });

    wordNumber = words.length;
    $(".btn-level").text(wordNumber + " palabras");
});

$('.txt-answer').keypress(function (e) {
  if (e.which == 13) {
    btnNextClick();
    return false;    //<---- Add this line
  }
});

$(".btn-next").click(btnNextClick);

$(".btn-start").click(function() {
  words.sort(function(a, b) {
    if (a.level < b.level) {
      return -1;
    }
    if (a.level > b.level) {
      return 1;
    }
    return 0;
  });

  for(let i = 0; i<wordNumber; i++)
    quizWords.push(words[i]);

  startGame();
});

$(".btn-level").click(function() {
  if(words.length < 20)
    return;

  if(wordNumber == words.length) {
    wordNumber = 20;
  }
  else {
    if( (wordNumber + 20) < words.length )
      wordNumber += 20;
    else
      wordNumber = words.length;
  }

  $(".btn-level").text(wordNumber + " palabras");
});

$(".btn-language").click(function() {
  if(baseLanguage == "Holandés") {
    baseLanguage = "Español";
    $(".btn-language").text("Español - Holandés");
  }
  else {
    baseLanguage = "Holandés";
    $(".btn-language").text("Holandés - Español");
  }
});

function btnNextClick() {
  if($(".btn-next").text() == "Comprobar") {
    checkWord();

    if(wordCount < quizWords.length) {
      $(".btn-next").text("Siguiente");
    }
    else {
      let texto = "Resultado: " +points +" de " +quizWords.length +" palabras correctas.";
      $(".lbl-wordcount").text(texto);

      $(".btn-next").text("Reiniciar");
    }
  }
  else if($(".btn-next").text() == "Siguiente") {
      nextWord();
      $(".btn-next").text("Comprobar");
  }
  else {
    wordCount = 0;
    points = 0;
    startGame();

    $(".btn-next").text("Comprobar");
  }
}

function startGame() {
  shuffleArray(quizWords);
  nextWord();

  $(".opciones").hide();
  $(".quiz").show();
}

function checkWord() {
  let answer = removeSpecialCharacters($(".txt-answer").val());
  let targetAnswer = removeSpecialCharacters($(".fc-target").text());

  if(answer == targetAnswer) {
    points++;
    $(".fc-target").removeClass("btn-danger").addClass("btn-success");
  }
  else {
    $(".fc-target").removeClass("btn-success").addClass("btn-danger");
  }

  $(".fc-target").show();
}

function removeSpecialCharacters(word) {

  let newWord = word;

  newWord = newWord.replace("á", "a");
  newWord = newWord.replace("é", "e");
  newWord = newWord.replace("í", "i");
  newWord = newWord.replace("ó", "o");
  newWord = newWord.replace("ú", "u");
  newWord = newWord.replace("ü", "u");

  return newWord;
}

function nextWord() {
  if(baseLanguage == "Holandés") {
    $(".fc-base").text(quizWords[wordCount].dutch);
    $(".fc-target").text(quizWords[wordCount].spanish);
  }
  else {
    $(".fc-base").text(quizWords[wordCount].spanish);
    $(".fc-target").text(quizWords[wordCount].dutch);
  }

  $(".txt-answer").val("");
  $(".fc-target").hide();

  wordCount++;

  let texto = "Palabra " +wordCount +" de " +quizWords.length +".";
  $(".lbl-wordcount").text(texto);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
