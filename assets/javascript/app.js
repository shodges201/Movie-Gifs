var topics = ["Pulp Fiction", 
"Titanic", 
"Avatar", 
"The Shawshank Redemption", 
"The Godfather", "Jaws", 
"The Dark Knight", 
"Forrest Gump", 
"Braveheart",
"The Green Mile",
"Caddyshack",
"Ghostbusters"];

for(var i = 0; i < topics.length; i++){
    var newBtn = $("<button>").addClass("btn btn-large btn-primary searchBtn").attr("data-movie", topics[i]).text(topics[i]);
    $("#buttonsContainer").append(newBtn);
}

$(document).on("click", ".searchBtn", function(){
    var person = $(this).attr("data-movie");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    person + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=30";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
                
    .then(function(response) {
        console.log(response);
        var numItems = 0;
        for(var i = 0; i < response.data.length; i++){
            var item = response.data[i];
            if(item.rating !== "pg-13" && item.rating !== "r" && numItems < 10){
                console.log(item);
                console.log(item.images.fixed_height.url);
                var newItem = $("<div>").addClass("gifContainer");
                var rating = $("<p>").text("Rating: " + item.rating).addClass("rat");
                var newGif = $("<img>").attr("data-moving", item.images.fixed_height.url);
                newGif.attr("data-still", item.images.fixed_height_still.url);
                newGif.attr("src", item.images.fixed_height_still.url);
                newGif.attr("data-status", "still");
                newGif.addClass("gif");
                newItem.append(rating);
                newItem.append(newGif);
                $("#gifsContainer").prepend(newItem);
                numItems++;
            }
        }
    })
})

$(document).on("click", ".gif", function(){
    if($(this).attr("data-status") === "still"){
        $(this).attr("src", $(this).attr("data-moving"));
        $(this).attr("data-status", "moving");
    }
    else{
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-status", "still");
    }
})

$(document).on("click", "#addBtn", function(event){
    event.preventDefault();
    var term = $("#searchTerm").val().trim();
    var newBtn = $("<button>").text(term).addClass("btn btn-primary btn-large searchBtn").attr("data-movie", term);
    topics.append(term);
    $("#buttonsContainer").append(newBtn);
})