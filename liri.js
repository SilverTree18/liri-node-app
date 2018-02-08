require("dotenv").config();

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var request = require('request');

var keys = require("./keys.js");

var fs = require("fs");

 // var spotify = new Spotify(keys.spotify);

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
  // redirect_uri: process.env.REDIRECT_URI
});

var commandArray = process.argv.slice(3);
var command = commandArray.join(" ");

var doThis = process.argv[2];

switch(process.argv[2]){
    case 'my-tweets':

        getTweets(command);

        break;

    case 'spotify-this-song':

        getMusic(command);

        break;
    case 'movie-this':
        getMovie(command);

        break;
    case 'do-what-it-says':
        doWhat();
        break;

      default:
      console.log("Error! Please enter proper command.");
}


function getTweets(user) {
  var params = {
      screen_name: user, 
      count: 20 
    };
      client.get('statuses/user_timeline', params, function(error, data, response) { 

    if (!error) {
        for (var i = 0; i < data.length; i++) {
          console.log(data[i].created_at);
          console.log(data[i].text);
        }
    }
  })
};

function getMusic() {
 if (!command ) {
    command = "Ace of Base";
}
  var info = {
    type: 'track',
    query: command
  }
  console.log(command)

  spotify.search( info, function(err, data) {
   if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }else{
      console.log("Artists/Band name: " + data.tracks.items[0].album.artists[0].name)
      console.log("Album name: " + data.tracks.items[0].album.name)
      console.log("Song's name: " + data.tracks.items[0].name)
      console.log("A preview link of the song: " + data.tracks.items[0].external_urls.spotify)
    }
  });
};

function getMovie() {
       if (!command ) {
       command = "Mr. Nobody";
      }
  var queryURL = "https://www.omdbapi.com/?t=" + command + "&y=&plot=short&apikey=trilogy";


console.log(queryURL);
  
request(queryURL ,function (error, response, body) {
  if (!error && response.statusCode === 200) {

 var movie = JSON.parse(body);
  //     console.log(data.repsonse);
          console.log("Movie: " + movie.Title);
          console.log("Year: " + movie.Year);
          console.log("IMBD Rating: " + movie.imdbRating);
          console.log("Rotten Tomatoes: " + movie.Ratings[1].Value);
          console.log("Country Produced: " + movie.Country);
          console.log("Language: " + movie.Language);
          console.log("Plot: " + movie.Plot);
          console.log("Actors: " + movie.Actors);


}
});
};

function doWhat(txt) {
    fs.readFile("random.txt", "utf8", function(err, data) {
      if (err) {
   return console.log(err);
    }
  console.log(data);

  // Then split it by commas (to make it more readable)
  var dataArr = data.split(",");
          doThis = dataArr[0];
          command = dataArr[1];
          


getMusic(doThis, command);

});
  };


