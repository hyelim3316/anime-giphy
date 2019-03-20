var topic = ["totoro", "kiki", "mononoke"];


$("button").on("click", function () {
    // Grabbing and storing the data-anime property value from the button
    var anime = $(this).attr("data-anime");

    // Constructing a queryURL using the anime name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        anime + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After data comes back from the request
        .then(function (response) {

            // storing the data from the AJAX request in the results variable
            var results = response.data;
            console.log(results);

            // Looping through each result item
            for (var i = 0; i < results.length; i++) {

                // Creating and storing a div tag
                var animeDiv = $("<div>");

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);

                // Creating and storing an image tag
                var animeImage = $("<img>");

                // Setting the src attribute of the image to a property pulled off the result item
                animeImage.attr("src", results[i].images.fixed_height.url);
                animeImage.attr("data-animate", results[i].images.fixed_height.url);
                animeImage.attr("data-still", results[i].images.fixed_height_still.url);
                animeImage.attr("data-state", "animate");




                // Appending the paragraph and image tag to the animalDiv
                animeDiv.append(p);
                animeDiv.append(animeImage);

                // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                $("#gifs-appear-here").prepend(animeDiv);
            }
        });
});
$(document.body).on("click", 'img', function () {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

