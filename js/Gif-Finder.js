$(document).ready(function(){

  var gifs = [];

  function renderButtons() {
    $("#gif-buttons").empty();
    for (var i = 0; i < gifs.length; i++) {
      var a = $("<button class='gif'>"); 
      a.attr("data-name", gifs[i]);
      a.text(gifs[i]);
      $("#gif-buttons").append(a);
    }
  }

  $("#add-gif").on("click", function(event) {
    var gif = $("#gif-input").val().trim();
    gifs.push(gif);
    renderButtons();
    console.log(gif);
  });

  function displayGifs() {
    $("#gif-container").empty();
    var gifName = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifName + "&limit=10&api_key=dc6zaTOxFJmzC";
    console.log(gifName);

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      var gifsArray = response.data;

      for(i = 0; i < gifsArray.length; i++) {
        var gifDiv = $("<div class='gif-div'>");
        var imgURL =  gifsArray[i].images.fixed_width_still.url;
        var image = $("<img class='img-responsive'>").attr("src", imgURL);
        var animateURL = gifsArray[i].images.fixed_width.url;
        image.attr("stillImage", imgURL);
        image.attr("animateImage", animateURL);
        image.attr("state", "still");
        gifDiv.append(image); 
        var gifLiveDiv = $("<div class='live-gif'>");
        $("#gif-container").append(gifDiv);
      }   
    });
  }    

  $(document).on("click", "img", function() {
    var state = $(this).attr('state');
    if(state === "still") {
      $(this).attr("src", $(this).attr("animateImage"));
      $(this).attr("state", "animate");
    } else {
      $(this).attr("src", $(this).attr("stillImage"));
      $(this).attr("state", "still");
    }
  });

  $(document).on("click", ".gif", displayGifs);

  renderButtons();
   
});
