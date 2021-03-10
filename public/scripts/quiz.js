const words = [];
const category = $(".lbl-category").text();

let wordCount = 0;
let points = 0;

$.getJSON('../../docs/words.json', function(data) {
    data.forEach(function(word) {
      if (category == word.category) {
        words.push(word);
      }
    });

    shuffleArray(words);
    nextWord();
});

$('.txt-answer').keypress(function (e) {
  if (e.which == 13) {
    btnNextClick();
    return false;    //<---- Add this line
  }
});

$(".btn-next").click(btnNextClick);

function btnNextClick() {
  if($(".btn-next").text() == "Comprobar") {
    checkWord();

    if(wordCount < words.length) {
      $(".btn-next").text("Siguiente");
    }
    else {
      let texto = "Resultado: " +points +" de " +words.length +" palabras correctas.";
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
    shuffleArray(words);
    nextWord();

    $(".btn-next").text("Comprobar");
  }
}

function checkWord() {
  let answer = $(".txt-answer").val();

  if($(".fc-spanish").text() == answer) {
    points++;
    $(".fc-spanish").removeClass("btn-danger").addClass("btn-success");
  }
  else {
    $(".fc-spanish").removeClass("btn-success").addClass("btn-danger");
  }

  $(".fc-spanish").show();
}

function nextWord() {
  $(".fc-dutch").text(words[wordCount].dutch);
  $(".fc-spanish").text(words[wordCount].spanish);

  $(".txt-answer").val("");
  $(".fc-spanish").hide();

  wordCount++;

  let texto = "Palabra " +wordCount +" de " +words.length +".";
  $(".lbl-wordcount").text(texto);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
