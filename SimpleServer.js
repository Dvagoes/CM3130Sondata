// server.js
// load the things we need
var express = require('express');
var app = express();
var path = require('path');
var upload = require("express-fileupload");
var multer = require('multer');
var bodyParser = require('body-parser');
var html2canvas = require('html2canvas');
var FileSaver = require('file-saver');
const colormap = require('colormap');

// set the view engine to ejs
app.set('view engine', 'ejs');

const fs = require('fs');
const { url } = require('inspector');
//fs.writeFile('hot-colormap.json', JSON.stringify(colors));   

app.get('/', function (req, res) {
        
    res.render('pages/index');

});

//app.use(bodyParser.json({limit: "50MB"}));

//var jsonParser = bodyParser.json();
//var rawParser = bodyParser.raw();
//var urlencodedParser = bodyParser.urlencoded({extended: false});

var textParser = bodyParser.text({limit: "50MB"});

// more commented out code from previous attempt
/**
app.use(function (req, res){   
     res.setHeader('Content-Type', 'text/plain'),
     res.write('you posted:\n'),
     res.end(JSON.stringify(req.body, null, 2)) 
 });
*/

app.post('/', textParser, function(req,res){
    //console.log(req.body),
    //fs.writeFileSync("./assets/Audio/sound.mp3", req.body)

    
    fs.writeFileSync('./assets/Audio/sound.mp3', Buffer.from(req.body.replace('data:audio/mpeg; codecs=opus;base64,', ''), 'base64'));

    res.send("<3")

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