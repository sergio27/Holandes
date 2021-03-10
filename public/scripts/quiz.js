const words = [];
const category = $(".lbl-category").text();

$.getJSON('../../docs/words.json', function(data) {
    data.forEach(function(word) {
      if (category == word.category) {
        words.push(word);
      }
    });

    nextWord();
});

$(".btn-next").click(function() {
  if($(".btn-next").text() == "Comprobar") {
    checkWord();
    $(".btn-next").text("Siguiente");
  }
  else {
    nextWord();
    $(".btn-next").text("Comprobar");
  }
});

function checkWord() {

  let answer = $(".txt-answer").val();
  console.log(answer);

  if($(".fc-spanish").text() == answer) {
    $(".fc-spanish").removeClass("btn-danger").addClass("btn-success");
  }
  else {
    $(".fc-spanish").removeClass("btn-success").addClass("btn-danger");
  }

  $(".fc-spanish").show();
}

function nextWord() {
  let random = Math.floor(Math.random() * Math.floor(words.length));

  $(".fc-dutch").text(words[random].dutch);
  $(".fc-spanish").text(words[random].spanish);

  $(".txt-answer").val("");
  $(".fc-spanish").hide();
}
