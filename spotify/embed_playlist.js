var http = require("http");
http.createServer(function(request, response) {  
  response.writeHead(200, {"Content-Type": "text/plain"});  
  response.write("Hello from the Node.js server!");  
  response.end();
}).listen(3000);
console.log('Server is listening to http://localhost/ on port 3000…');

var SpotifyWebApi = require('spotify-web-api-js');
var passport = require('passport-spotify');
var spotifyApi = new SpotifyWebApi();

spotifyApi.setAccessToken("5da88054df974a3881337d30f15d6b77");

// passport.use(new SpotifyStrategy({
//     clientID: "5da88054df974a3881337d30f15d6b77",
//     clientSecret: "db60e4523eca4a5fb7790ed373e8ec31",
//     callbackURL: "http://localhost:3000/auth/spotify/callback"
//   },
//   function(accessToken, refreshToken, profile, done) {
//     User.findOrCreate({ spotifyId: profile.id }, function (err, user) {
//       return done(err, user);
//     });
//   }
// ));

// Output: a playlist JSON
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
	} else if (hour >= 12 && hour < 18) {
		// Afternoon
		spotifyApi.getPlaylist('kalynnicholsonn', '0ncsKEjZlDumP2ljwEPQHQ')
			.then(function(data) {
				return data;
			}, function(err) {
				console.error(err);
			});
	} else if (hour >= 18 && hour < 24) {
		// Evening
		spotifyApi.getPlaylist('spotify', '7b9XqnXw5J47tmn0Y0IZeW')
			.then(function(data) {
				console.log(data)
				return data;
			}, function(err) {
				console.log("asdf")
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

// Input: a playlist JSON
// Output: An array of URLs of album covers
function get_album_covers(playlist) {
	var tracks = [];

	spotifyApi.getPlaylistTracks(playlist.owner.id, playlist.id, {})
		.then(function(data) {
			console.log("YAY")
			tracks = data;
		}, function(err) {
			console.log("sfdsf")
			console.error(err);
		});

	var album_covers = [];

	// spotifyApi.getTracks(track_id_array) {
	// 	.then(function(data) {
	// 		var tracks = data;
	// 	}, function(err) {
	// 		console.error(err);
	// 	});
	// }

	for (var i = 0; i < tracks.length; i++) {
		var track = tracks[i];

		spotifyApi.getAlbum(track.album.id)
			.then(function(data) {
				var album = data;
			}, function(err) {
				console.error(err);
			});

		album_covers.push(album.images[0].url);
	}
	
	return album_covers;

}

// Output: an array of track JSONs
function merge_playlists() {
	var playlists = [];
	var tracks = [];

	playlists.push(get_time_playlist());

	for (var i = 0; i < playlists.length; i++) {
		var playlist = playlists[i];
		spotifyApi.getPlaylistTracks(playlist) 
			.then(function(data) {
				for (var i = 0; i < data.length; i++) {
					tracks.push(data[i]);
				}
			}, function(err) {
				console.error(err);
			});
		
	}

	return tracks;
}

// Input: an array of track JSONs
// Output: a playlist JSON
function generate_playlist(tracks) {
	var my_id;

	spotifyApi.getMe({})
		.then(function(data) {
			my_id = data;
		}, function(err) {
			console.error(err);
			console.log("123");
		});

	var playlist;

	spotifyApi.createPlaylist(my_id, {name: 'MusicMap', description: 'Playlist generated by MusicMap'})
		.then(function(data) {
			playlist = data;
		}, function(err) {
			console.error(err);
			console.log("456");
		});


	var track_uris = [];

	for (var i = 0; i < tracks.length; i++) {
		var track = tracks[i];

		spotifyApi.getAlbum(track.album.id)
			.then(function(data) {
				var album = data;
			}, function(err) {
				console.error(err);
			});
	

		track_uris.push(track.uri);
	}

	spotifyApi.addTracksToPlaylist(my_id, playlist.id, track_uris)
		.then(function(data) {
			return data;
		}, function(err) {
			console.error(err);
		});


}

// Input: a playlist JSON
// Output: an embedded link to the playlist
function embed_playlist(playlist) {
	return "https://embed.spotify.com/?uri=spotify%3Auser%3A{0}%3Aplaylist%{1}".format(playlist.owner.id, playlist.id);
}

function main() {
	var playlist = generate_playlist(merge_playlists());
	var album_covers = get_album_covers(playlist);
}
//console.log(embed_playlist(generate_playlist(merge_playlists())))
//console.log(JSON.stringify(get_time_playlist()))
//console.log(get_album_covers(get_time_playlist()))
//console.log(embed_playlist(get_time_playlist()))
//console.log("asdfdsf")
console.log(get_time_playlist())