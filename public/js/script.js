// const album_paragraph_element = $(".album-container p");
// const loading_container = $("#loading-container");
// var num = 0;

const loading_container = $("#loading-container");
var num = 0
$(".search-btn").on("click", function () {
  const search_value = $(".search").val();
  if (search_value === "") {
    alert("You must enter a song name.");
  } else {
    if (num === 0) {
    loading_container.css("display", "flex")
    loading_container.addClass("ring");
    } else if (num > 0) {
      $(".song-container").hide()       
      loading_container.css("display", "flex")
      loading_container.addClass("ring");
      $(".song-container").show()       
    }
    num += 1;
  }
  // else {
  //   num += 1;
  //   if (num > 0) {
  //     $("body .song-container").hide();
  //   }
  //   if (album_paragraph_element.text() === "") {
  //     loading_container.css("display", "block");
  //   }
  //   loading_container.addClass("ring");
  // }
});

// $(".search-btn").on("click", function() {
// })

if (window.history.replaceState) {
  window.history.replaceState(null, null, "/");
}


// if (album_paragraph_element.text() != "") {
// loading_container.remove();
// loading_container.css("display", "none");
// }
