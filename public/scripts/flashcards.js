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

$(".fc-dutch").click(function() {
  $(".fc-spanish").show();
  $(".btn-next").show();
});

$(".btn-next").click(function() {
  nextWord();
});

function nextWord() {
  let random = Math.floor(Math.random() * Math.floor(words.length));

  $(".fc-spanish").hide();
  $(".btn-next").hide();

  $(".fc-dutch").text(words[random].dutch);
  $(".fc-spanish").text(words[random].spanish);
}
