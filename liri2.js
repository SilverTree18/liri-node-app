require("dotenv").config();

var Twitter = require('twitter');

var homework = require("./keys.js");

 // var spotify = new Spotify(keys.spotify);

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});


switch(process.argv[2]){
    case 'my-tweets':

        getTweets(command);


        break;

if (process.argv[2]==="my-tweets") {
		var params = {
			screen_name: 'BestPixMN', 
			count: 20 
		};
			client.get('statuses/user_timeline', params, function(error, tweets, response) { 

if (!error) {
        for (var i = 0; i < tweets.length; i++) {
          console.log(tweets[i].created_at);
          console.log(tweets[i].text);
        }
 
 } else if (process.argv[2]==="spotify-this-song"){
  	console.log("spotify");

  	///spotify code///

 } else if (process.argv[2]==="movie-this"){
  	console.log("movie");
///movie code
  } else if (process.argv[2]==="do-what-it-says"){
  	console.log("do-what-it-says");

  }
});
}



// client.get('statuses/user_timeline', { screen_name: 'Mn18Silver', count: 20 }, function(error, tweets, response) {
//     if (!error) {
//       res.status(200).render('index', { title: 'Express', tweets: tweets });