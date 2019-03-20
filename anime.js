var topic = ["totoro", "kiki", "mononoke", "sakura", "ponyo" ];


$("button").on("click", function () {

    var anime = $(this).attr("data-anime");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        anime + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {

            var results = response.data;
            console.log(results);

            for (var i = 0; i < results.length; i++) {

                var animeDiv = $("<div>");

                var p = $("<p>").text("Rating: " + results[i].rating);

                var animeImage = $("<img>");

                animeImage.attr("src", results[i].images.fixed_height.url);
                animeImage.attr("data-animate", results[i].images.fixed_height.url);
                animeImage.attr("data-still", results[i].images.fixed_height_still.url);
                animeImage.attr("data-state", "animate");




                animeDiv.append(p);
                animeDiv.append(animeImage);

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

