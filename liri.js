require("dotenv").config();

var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);


var cTable = require('console.table');
// var request = require('request');
// var moment = require('moment');


if ( process.argv[2] == 'spotify-this-song') {

        var songName = process.argv.slice(3).join(" ");
    
        if (songName == undefined) {
            songName = "The sign by Ace of Base";
        }

    
    spotify.search({ type: 'track', query: songName, limit: 20  }, function(err, data) {
            if (err) {
            return console.log('Error occurred: ' + err);
            }

                // Do something with 'data'
                // console.log(data); 

                var tableArray = [];

                for (var i = 0; i < data.tracks.items.length; i++ ) {
                    var result = {
                        artist : data.tracks.items[i].album.artists[0].name,
                        song_name : data.tracks.items[i].name,
                        album_name : data.tracks.items[i].album.name,
                        preview_url : data.tracks.items[i].preview_url 
                    }

                    tableArray.push(result);
                }
      
            
                var table = cTable.getTable(tableArray);
    
                console.log(table);
    });
}
