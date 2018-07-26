$(document).ready(function () {
    //Search functionality by Milan Milošev [codepen]

    function expand() {
        $(".search").toggleClass("close");
        $(".input").toggleClass("square");
        if ($('.search').hasClass('close')) {
            $('input').focus();
        } else {
            $('input').blur();
        }
    };

    $('button').on('click', expand);

    var movies = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

    // displayMovieInfo function re-renders the HTML to display the appropriate content
    function displayMovieInfo() {

        var movie = $(this).attr("data-name");
        var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=45d24a24";
        var queryURL1 = "https://api.giphy.com/v1/gifs/search?q=" +
            movie + "&api_key=IOw9BxYKRnyeF3uRe16qBOW7SoUz11h1";

        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            // Creating a div to hold the movie
            var movieDiv = $("<div class='movie'>");

            // Storing the rating data
            var rating = response.Rated;

            // Creating an element to have the rating displayed
            var pOne = $("<p>").text("Rating: " + rating);

            // Displaying the rating
            movieDiv.append(pOne);

            // Storing the release year
            var released = response.Released;

            // Creating an element to hold the release year
            var pTwo = $("<p>").text("Released: " + released);

            // Displaying the release year
            movieDiv.append(pTwo);

            // Storing the plot
            var plot = response.Plot;

            // Creating an element to hold the plot
            var pThree = $("<p>").text("Plot: " + plot);

            // Appending the plot
            movieDiv.append(pThree);

            // Retrieving the URL for the image
            var imgURL = response.Poster;

            // Creating an element to hold the image
            var image = $("<img>").attr("src", imgURL);

            // Appending the image
            movieDiv.append(image);

            // Putting the entire movie above the previous movies
            $("#movies-view").prepend(movieDiv);
        });

        $.ajax({
            url: queryURL1,
            method: "GET"
        }).then(function (response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    var gifDiv = $("<div class='item'>");
                    var rating = results[i].rating; 
                    var p = $("<p>").text("Rating: " + rating); 
                    var personImage = $("<img>"); 

                    personImage.attr("src", results[i].images.fixed_height.url);
                    
                    gifDiv.append(p);
                    gifDiv.append(personImage);

                    $("#gifs-appear-here").prepend(gifDiv);
                }
            }
        });

    }

    // Function for displaying movie data
    function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < movies.length; i++) {

            // Then dynamicaly generating buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class of movie-btn to our button
            a.addClass("movie-btn1");
            // Adding a data-attribute
            a.attr("data-name", movies[i]);
            // Providing the initial button text
            a.text(movies[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(a);
        }
    }


    // This function handles events where a movie button is clicked
    $("#add-movie").on("click", function (event) {

        event.preventDefault();

        // This line grabs the input from the textbox
        var movie = $("#movie-input").val().trim();

        // Adding movie from the textbox to our array
        movies.push(movie);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
    });

    // Adding a click event listener to all elements with a class of "movie-btn"
    $(document).on("click", ".movie-btn1", displayMovieInfo);

    $(document).keypress(function (e) {
        if (e.which == 13) {
            displayMovieInfo;
        }
    });

    $('.input').bind("keypress keyup blue", function () {

        $('#movie-input').val($(this).val());
    });

    $('.input').keypress(function (e) {
        var key = e.which;
        if (key == 13) {
            event.preventDefault(); 
            $("#add-movie").click();
        }
    });
    // Calling the renderButtons function to display the intial buttons
    renderButtons();

});