var sys = require('util')
var exec = require('child_process').exec;
var puts = sys.puts;

exec("find", function (error, stdout, stderr) { 
	if (error != null) {
		puts("ERROR:" + stderr);
	}
	var lines = stdout.split( "\n" )
	puts(lines.length);
});