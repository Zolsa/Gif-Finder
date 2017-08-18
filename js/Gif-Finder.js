var gifs = [];

function renderButtons() {
  $("#gif-buttons").empty();
  for (var i = 0; i < gifs.length; i++) {
    var a = $("<button>"); 
    a.addClass("gif");
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


function displayGif() {
  $("#gif-container").empty();
  var gif = $(this).attr("data-name");
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&limit=10&api_key=dc6zaTOxFJmzC";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    console.log(response);
    console.log(response.data[0].images.fixed_width.url);

    for(i = 0; i < response.data.length; i++) {
      var gifDiv = $("<div class='gif-holder panel panel-default panel-body'>");
      var imgURL =  response.data[i].images.fixed_width_still.url;
      var animateURL = response.data[i].images.fixed_width.url;
      var image = $("<img>").attr("src", imgURL);
      gifDiv.append(image);
      $("#gif-container").append(gifDiv);
    }
  });
}
    /*var gifImage = response.Rated;
          // Creating an element to have the rating displayed
          var pOne = $("<p>").text("Rating: " + rating);
          // Displaying the rating
          gifDiv.append(pOne);
          // Storing the release year
          var released = response.Released;
          // Creating an element to hold the release year
          var pTwo = $("<p>").text("Released: " + released);
          // Displaying the release year
          gifDiv.append(pTwo);
          // Storing the plot
          var plot = response.Plot;
          // Creating an element to hold the plot
          var pThree = $("<p>").text("Plot: " + plot);
          // Appending the plot
          gifDiv.append(pThree);
          // Retrieving the URL for the image
          var imgURL = response.Poster;
          // Creating an element to hold the image
          var image = $("<img>").attr("src", imgURL);
          // Appending the image
          gifDiv.append(image);
          // Putting the entire gif above the previous gifs
          $("#gifs-view").prepend(gifDiv);*/




      // Adding a click event listener to all elements with a class of "gif"
      $(document).on("click", ".gif", displayGif);
      // Calling the renderButtons function to display the intial buttons
      renderButtons();
   

