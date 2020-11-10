// server.js
// load the things we need
var express = require('express');
var app = express();
var path = require('path');
const colormap = require('colormap');

module.exports.colormap = colormap;

// set the view engine to ejs
app.set('view engine', 'ejs');


//const fs = require('fs');
//fs.writeFile('hot-colormap.json', JSON.stringify(colors));   

fs.
app.get('/', function (req, res) {
    
    
    res.render('pages/index');

});

// set up pathing for assets

app.use(express.static(path.join(__dirname, 'assets')));


// open the port

app.listen(8080);
console.log('8080 is the magic port');