// Pause and Play Button functionality. 
$(document).on("click", ".fa-pause, .fa-play", function () {

    var grandP = $(this).parent().parent();
    var outsideDiv = (grandP[0].childNodes[3].childNodes[0]);


    if ($(outsideDiv).attr("data-state") === "data-animate") {
        $(outsideDiv).attr("src", $(outsideDiv).attr("data-still")); 
        $(outsideDiv).attr("data-state", "still"); 
        $(this).removeClass("fa-pause").addClass("fa-play"); 
    } else {
        $(outsideDiv).attr("src", $(outsideDiv).attr("data-animate")); 
        $(outsideDiv).attr("data-state", "data-animate"); 
        $(this).removeClass("fa-play").addClass("fa-pause"); 
    }

});

$(document).ready(function () {


    //Search functionality by Milan Milošev [codepen]

    function expand() {
        $(".btn-1").attr("aria-expanded", "true");
        $("#multiCollapse1").addClass("show");
        $(".search").toggleClass("close");
        $(".input").toggleClass("square");
        if ($('.search').hasClass('close')) {
            $('input').focus();
        } else {
            $('input').blur();
        }
    };

    $('.search').on('click', expand);

    var movies = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

    // displayMovieInfo function re-renders the HTML to display the appropriate content
    function displayMovieInfo() {

        if (!storedImg) {
            var parentElement = $(".unfavorite").parent();
            parentElement.hide();
            $(".unfavorite").hide();
        }

        $(".movie-btn1").removeClass("blinking");

        var movie = $(this).attr("data-name");
        var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=45d24a24";
        var queryURL1 = "https://api.giphy.com/v1/gifs/search?q=" +
            movie + "&api_key=IOw9BxYKRnyeF3uRe16qBOW7SoUz11h1&limit=10";

        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // console.log(response); 

            var actors = response.Actors;
            var awards = response.Awards;
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

            var pFour = $("<p>").text("Actors / Actresses: " + actors);

            movieDiv.append(pFour);

            var pFive = $("<p>").text("Awards won and Nominations: " + awards);

            movieDiv.append(pFive);

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
            console.log(results); 

            for (var i = 0; i < results.length; i++) {
                
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    var gifDiv = $("<div class='item'>");
                    var rating = results[i].rating;
                    var stillImg = results[i].images.original_still.url; 
                    var p = $("<p>").text("Rating: " + rating);
                    // var favoriteButton = $('<button class="favorites" style="font-size:30px;color:orange"><i class="material-icons">star</i></button>');
                    // var personImage = $("<a href='" + results[i].images.fixed_height.url + "' download><img src='" + results[i].images.fixed_height.url + "'></a>");
                    var button = $('<button>').addClass("favorites").attr("style", "font-size:30px; color: orange");
                    var button1 = $('<button>').addClass("pause").attr("style", "font-size:30px; color: orange");
                    var icon = $('<i>').text("star").addClass("material-icons");
                    var pauseIcon = $('<i>').addClass("fa fa-pause").attr("aria-hidden", "true");
                    var personImage = $("<a>").attr("href", results[i].images.fixed_height.url);
                    var innerImage = $("<img>").attr({
                        "src": results[i].images.fixed_height.url,
                        "data-state": "data-animate",
                        "data-still": stillImg,
                        "data-animate": results[i].images.fixed_height.url
                    });
                    var state = $(this).attr("data-state");

                    gifDiv.append(p);
                    gifDiv.append(button.append(icon));
                    gifDiv.append(button1.append(pauseIcon));
                    gifDiv.append(personImage.append(innerImage));

                    $("#gifs-appear-here").prepend(gifDiv);

                }

            }
        });

        $(".btn-2").attr("aria-expanded", "true");
        $(".btn-3").attr("aria-expanded", "true");
        $("#multiCollapse2").addClass("show");
        $("#multiCollapse3").addClass("show");

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

            if (i > 3) {
                a.addClass("blinking");
                a.addClass("movie-btn1");
                a.attr("data-name", movies[i]);
                $("#buttons-view").append(a);

            }
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

    // For if Enter Key is pressed: 
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

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function () {
        scrollFunction()
    };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById("myBtn").style.display = "block";
        } else {
            document.getElementById("myBtn").style.display = "none";
        }
    }

    $("#myBtn").on("click", function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });

    // Favorites Button Functionality
    $(document).on("click", ".favorites", function () {


        $(this).addClass("unfavorite").addClass("fa fa-close").removeClass("material-icon").removeClass("favorites").text("")
        
        $("#favorites-appear-here").prepend($(this).parent());

        localStorage.clear();
        event.preventDefault();

        var savedGif = $(this).parent().css({
            "border": "10px solid orange",
            "padding": "10px",
            "border-radius": "20px"
        });
        var parent = $(this).parent();

        // console.log(parent[0].childNodes);

        localStorage.setItem("img", parent[0].childNodes[3].href);
        localStorage.setItem("rating", parent[0].childNodes[0].textContent);

        storedImg = localStorage.getItem("img");
        storedRating = localStorage.getItem("rating");

        $(".unfavorite").on("click", function () {
            var parent = $(this).parent();
            parent.fadeOut("slow");
        });

    });
    
    storedImg = localStorage.getItem("img");
    storedRating = localStorage.getItem("rating");

    if (storedImg) {

        storedImg = localStorage.getItem("img");
        storedRating = localStorage.getItem("rating");
    
        gifDiv1 = $("<div class='item'>").css({
            "border": "10px solid orange",
            "padding": "10px",
            "border-radius": "20px"
        });
        p = $("<p>").text("Rating: " + storedRating);
        button = $('<button>').addClass("unfavorite").attr("style", "font-size:30px; color: orange");
        icon1 = $('<i>').addClass("fa fa-close")
        personImage = $("<a>").attr("href", storedImg)
        innerImage = $("<img>").attr("src", storedImg);
    
        gifDiv1.append(p);
        gifDiv1.append(button.append(icon1));
        gifDiv1.append(personImage.append(innerImage));
    
        $("#gifs-appear-here").append(gifDiv1);

        $(".btn-3").attr("aria-expanded", "true");
        $("#multiCollapse3").addClass("show");

        $(".unfavorite").on("click", function () {
            $(this).parent().fadeOut("slow");
            localStorage.clear();
        });
    }

});
