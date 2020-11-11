// server.js
// load the things we need
var express = require('express');
var app = express();
var path = require('path');
var upload = require("express-fileupload");
const colormap = require('colormap');
var multer = require('multer');
var bodyParser = require('body-parser');

module.exports.colormap = colormap;

// set the view engine to ejs
app.set('view engine', 'ejs');


const fs = require('fs');
//fs.writeFile('hot-colormap.json', JSON.stringify(colors));   

app.get('/', function (req, res) {
    

    
    res.render('pages/index');

});

app.use(bodyParser.json({limit: "50MB"}));

// more commented out code from previous attempt
/**
app.use(function (req, res){   
     res.setHeader('Content-Type', 'text/plain')
     res.write('you posted:\n')
     res.end(JSON.stringify(req.body, null, 2)) 
 });
 */

/**
 * console.log(req) on line:52
 * is used to print a JSON to the terminal detailing the uploaded file.
 * it is mostly useless information at the moment.
 * but in the bottom there should be a field named "body"
 * as of this current build. it would be emptty, it isn't supposed to be empty
 * it is supposed to contain a datastream. 
 * more details of this in the comments in upload-script.js on starting line: 95
 */


app.post('/', function(req,res){
    //res.send("<3"),
    console.log(req)
    //fs.writeFileSync("/assets/Audio")
});

// set up pathing for assets

app.use(express.static(path.join(__dirname, 'assets')));


// open the port

app.listen(8080);
console.log('8080 is the magic port');

//begin file uploading code

/**
function fileUpload(file) {
    
    const multer = require("multer");
    const multerConf = {
        storage : multer.diskStorage({
            destination : function(req, file, next) {
                next(null, './assets/Audio');
            },
            filename: function(req,file,next){
                const ext = file.mimetype.split('/'[1]);
                next(null, audio + ext)
                console.log(file);
            }
        })
    }

    router.post('/upload',multer(multerConf).single('audio'), function(req,res){
        res.send('this is post route upload');
    })


}
*/