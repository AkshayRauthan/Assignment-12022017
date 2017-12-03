var animals = ["Cat", "Dog", "Lion", "Horse"];
var loadInitialButtons = false;

//display the intiial buttons
var renderInitialButtons = function(){
	animals.forEach(function(animal){
		renderButton(animal);
	});
}

var renderButton = function(animal){
	var animalButton = $("<button>");
	animalButton.attr("id", animal);
	animalButton.attr("class", "btn btn-outline-primary animal");
	animalButton.append(animal);
	$("#giphy-buttons").append(animalButton);
	$("#giphy-buttons").append("&nbsp;&nbsp;&nbsp;");
}

$(document).ready(function(){
	if(!loadInitialButtons){
		renderInitialButtons();	
		loadInitialButtons=true;		
	}

});

$("#add-giphy").on("click", function(event) {
	event.preventDefault();
	var newAnimal = $("#giphy-input").val().trim();
	renderButton(newAnimal);
	$("#giphy-input").val("");
});

$("#giphy-buttons").on("click", "button", function(){
	// console.log($(this).attr('id'));
	$("#animals").html("");
	var animalName = $(this).attr('id');

      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animalName + "&api_key=dc6zaTOxFJmzC&limit=10";
        // console.log(queryURL);
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
        	// console.log(response);
          var results = response.data;

          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;


            var animalImage = $("<img>");
            // animalImage.attr("src", results[i].images.fixed_height.url);
            animalImage.attr("src", results[i].images.fixed_height_still.url);
            animalImage.attr("data-still", results[i].images.fixed_height_still.url);
            animalImage.attr("data-animate", results[i].images.fixed_height.url);
            animalImage.attr("data-state", "still");

            gifDiv.append(animalImage);

            $("#animals").append(gifDiv);
          }
        });	
});

$("#animals").on("click", "img", function(){
	// alert("3");
	var aniImg = $(this);
	if(aniImg.attr('data-state')==="still"){
		aniImg.attr("src", aniImg.attr('data-animate'));
		aniImg.attr("data-state", "animate");
	}else if(aniImg.attr('data-state')==="animate"){
		aniImg.attr("src", aniImg.attr('data-still'));
		aniImg.attr("data-state", "still");
	}
});
