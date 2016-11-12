var SpotifyWebApi = require('spotify-web-api-js');
var spotifyApi = new SpotifyWebApi();

spotifyApi.setAccessToken("5da88054df974a3881337d30f15d6b77");

function get_time_playlist() {
	var date = new Date();
	var hour = date.getHours();

	if (hour >= 6 && hour < 12) {
		// Morning
		spotifyApi.getPlaylist('spotify', '2lDJ2xtmpCSN9CO7ZBkIVc')
		  .then(function(data) {
		    return data;
		  }, function(err) {
		    console.error(err);
		  });
	} else if (hour >= 12 && hour < 6) {
		// Afternoon
		spotifyApi.getPlaylist('kalynnicholsonn', '0ncsKEjZlDumP2ljwEPQHQ')
		  .then(function(data) {
		    return data;
		  }, function(err) {
		    console.error(err);
		  });
	} else if (hour >= 6 && hour < 12) {
		// Evening
		spotifyApi.getPlaylist('spotify', '7b9XqnXw5J47tmn0Y0IZeW')
		  .then(function(data) {
		    return data;
		  }, function(err) {
		    console.error(err);
		  });
	} else {
		// Late Night
		spotifyApi.getPlaylist('12575181', '0iOF5w88YRhZUiJdw1032l')
		  .then(function(data) {
		    return data;
		  }, function(err) {
		    console.error(err);
		  });
	}
}