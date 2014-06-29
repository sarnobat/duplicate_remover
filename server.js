var express = require('express');
var sys = require('util')
var exec = require('child_process').exec;
var puts = sys.puts;



var app = express();

app.get('/dups/all', function(req, res) {
	
	var location = "/media/sarnobat/e/Sridhar/Photos/camera phone photos/iPhone/";
	var type = "dups.txt";
	console.log('1');
	{
		exec("cat '"+location+"/"+type+"'", function (error, stdout, stderr) { 
			if (error != null) {
				puts("ERROR:" + stderr);
			}
			console.log('2');
			//puts(stdout);
			var lines = stdout.split( "\n" )
			puts(lines.length);
			var json = {};
			console.log('3');
			var clustersInLocation = {};
			var i = 0;
			var end = false;
			while (i < lines.length) {
				console.log('4 - ' + lines[i]);
				
				if (/files in cluster/.test(lines[i])) {
					console.log('5');
					//clustersInLocation.push(lines[i]);
					var cluster = [];
					clustersInLocation[lines[i]] = cluster;
					//cluster clustersInLocation[lines[i]];
					i++;
					
					if (i >= lines.length || lines[i] == null) {
						console.log('6');
						break;
					}
					while (!(/files in cluster/.test(lines[i]))) {
						console.log('7 - ' + i);
						cluster.push({ "filesystem" : location + lines[i], "http" : "<not needed yet>" });
						i++;
						if (i >= lines.length) {
							end = true;
							break;
						}
					}
				} else {
					console.log('8');
					i++;
				}
				if (end) {
					break;
				}
				console.log('9');
			}

			json[location] = clustersInLocation ;
			console.log('10' + JSON.stringify(json, null, 4));
			res.header("Access-Control-Allow-Origin", "*");			
			res.send(json);
		});
	}
    
});


app.listen(4453);
console.log('Listening on port http://netgear.rohidekar.com:4453/dups/all');