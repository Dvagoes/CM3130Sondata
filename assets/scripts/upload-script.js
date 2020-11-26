//currently early implementation subject to changes later

//to get file drag and drop working. you need to drag the file over "Choose an Audio File" on the webpage

/**
 * intermittent commenting are from temporary solutions that may come useful later
 * (most likeley not though)
 * 
 * TODO: get file upload functioning by getting 'datastreams' into the body field of the uploaded file json
 *      -currently haven't figured out yet
 */

//var express = require('express');
//var multer = require('multer');
//var path = require('path');
var router = express.Router();
//var app = express();
var ejs = require('ejs');
//const { json } = require('express');
var upload = multer({ storage: 'assets/Audio' })

var theFile = null;



//following code is taken from https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop

var wavesurfer = null;
var spectro = null;


var waveBarWidth;
var waveHeight;

//old event listeners
//document.getElementById("lowPassSlider").addEventListener("click", lowPass);
//document.getElementById("lowPassSlider").addEventListener("mouseup", lowPass);
//document.getElementById("highPassSlider").addEventListener("mouseup", highPass);

//var lowpass = null;


function dropHandler(ev) {
    console.log('File(s) dropped');

    ev.preventDefault()
    let file;
    if (ev.dataTransfer.items) {
        for (var i = 0; i < ev.dataTransfer.items.length; i++) {
            if (ev.dataTransfer.items[i].kind === 'file') {
                file = ev.dataTransfer.items[i].getAsFile();
                
                /*

                // console.log('...file [' + i + '].name = ' + file.name);
                //begin file type check
                let fName = file.name;
                fileExtension = fName.split('.').pop();
                console.log("test: " + fileExtension);

                //simple if statement to check if file dropped is mp3
                if (fileExtension != 'mp3') {
                    alert("Invalid file type detected. \n \n please upload a .mp3 file");
                    return;
                }

                */

                fileProcess(file);
            }
        }
    } else {
        for (var i = 0; i < ev.dataTransfer.items.length; i++) {
            // console.log('...file [' + i + '].name = ' + file.name);
            // fileProcess(file);
            console.log("else statement called");
        }
    }
}

function dragOverHandler(ev) {
    // console.log('File(s) in drop zone');

    ev.preventDefault();
}


function formOnSubmit(ev) {
    ev.preventDefault();
    console.log(ev);
    // let el = document.getElementById("audio_upload");
    let file = ev.target.files[0];
    //console.log(el.files);
    //console.log("file upload test" + el.name);
    fileProcess(file);
}

/**
 * fileProcess takes the "file" parameter to display file details in json format.
 * this will be used as a staging point for getting files uploaded temporarily.
 * currently it only gets the file details printed to console in json format.
 */




function fileProcess(file) {

    var reader = new FileReader();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");

    reader.readAsArrayBuffer(file);

    var raw = reader.result;

    file.arrayBuffer().then(buffer => {
        // console.log(buffer); 

        var base64 = window.btoa(
            new Uint8Array(buffer)
                .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        //console.log(base64);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: base64,
            redirect: 'follow'
        };

        fetch("/", requestOptions)
            .then(response => response.text())
            .then(response => createSpectrogram(file))
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    })
}

function createSpectrogram(file) {

    if (file != null) {

        theFile = file;

        waveBarWidth = 0;
        waveHeight = 128;

    }
    // fs.writeFile('hot-colormap.json', );   

    //var alreadyRunning = false;

    document.getElementById('visual_output').innerHTML = "";
    document.getElementById('wave-spectrogram').innerHTML = "";

    wavesurfer = WaveSurfer.create({

        container: '#visual_output',
        waveColor: 'red',
        progressColor: 'black',
        barWidth: waveBarWidth,
        height: waveHeight,
        normalize: true,
        plugins: [
            spectro = window.WaveSurfer.spectrogram.create({
                wavesurfer: wavesurfer,
                container: "#wave-spectrogram",
            })
        ]
    });
    /* if(file != null){
      
    lowpass = wavesurfer.backend.ac.createBiquadFilter();
lowpass.frequency.value = 0;
     }*/

    //wavesurfer.load('../assets/Audio/birds.mp3');

    wavesurfer.loadBlob(theFile);

    //document.getElementById('visual_output').style.visibility = "hidden";

    //document.getElementById('wave').style.display = "none";
}
//This method, guess what, changes the colour of the waveform.
//It requires a hex colour passed into the method when called.
//This should be passed as a string using ''
function changeColour() {
    var colour = document.getElementById('colourPicker').value;
    wavesurfer.setWaveColor(colour);

    console.log("colour change applied");
}

//This method triggers playback of the audio
function startPlaying() {

    //wavesurfer.spectrogram.loadlabels();
    wavesurfer.playPause();

}

//This method updates the bar width (makes the waveform look blocky)
//The values should go up in 0.1 to ensure the waveform doesnt get toooo blocky
//It should also only be called once a width has been decided.
//If not the api could have to recreate multiple waveforms
function updateBarWidth() {
    var bm = document.getElementById("barWidth").value;

    //wavesurfer.spectrogram.loadlabels();
    waveBarWidth = bm;

    createSpectrogram(null);
    console.log("bar width changed");

}

//This zooms in and out the waveform
//Values should increase by 100ish as it is uses pixels. And there are alot of pixels on a screen

function zoomIn() {
    var zoomies = document.getElementById("zoomSlider").value;
    console.log(zoomies);
    wavesurfer.zoom(zoomies)
    console.log("zoom applied");
}
//stops current playback and rewinds to the beginning
function rewind() {

    wavesurfer.stop();
}
document.addEventListener('DOMContentLoaded', function () {
    // Load a colormap json file to be passed to the spectrogram.create method.
    WaveSurfer.util
        .fetchFile({ url: 'hot-colormap.json', responseType: 'json' })
        .on('success', colorMap => {
            console.log("Pog")

        });
});
//Attempt at getting a low pass filter to work, worked audibly 
//on the playback however to get it to correct visually it would
//need to edit the sound file directly every time it was changed, 
//which was deemed to be outside the scope of this project

function filters() {
    console.log("filterChanged")
    var lowVal = document.getElementById("lowPassSlider").value;
    var lowpass = wavesurfer.backend.ac.createBiquadFilter();
    lowpass.frequency.value = lowVal;
    wavesurfer.backend.setFilter(lowpass);
    //console.log(wavesurfer.getFilters());
    wavesurfer.loadBlob(theFile);
}
//main update script which calls the other functions, bar width needs to 
//be called first as it recalls the spectrogram create function, placing 
//this anywhere but the top would cause any functions called before it to be overwritten
function update() {
    updateBarWidth();
    filters();
    changeColour();
    zoomIn();


    console.log("updates applied");
}

/**
function postmanTest(file){

    var reader = new FileReader();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");

    reader.readAsArrayBuffer(file);

    var raw = reader.result;

    file.arrayBuffer().then(buffer => {
        console.log(buffer);

        var base64 = window.btoa(
            new Uint8Array(buffer)
              .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        console.log(base64);
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: base64,
        redirect: 'follow'
        };

        // fetch("/", requestOptions)
        // .then(response => response.text())
        // .then(result => console.log(result))
        // .catch(error => console.log('error', error));
    })

}
*/
//code below from previous attempts of implementing file uploading
/**
function fileUpload(file) {

    var express = require('express');
    var app = express();

    app.post(null, upload.single('file'), function(req,res,next){

    });

    app.post('')


    ============================================

    var uploads = multer({dest: './assets/Audio'});

    router.post('/register', uploads.single(this.file), function(req,res,next){
        if (req.file){
            console.log('audio uploaded');
        }
    });

    ===========================================

    var storage = multer.diskStorage({
        destination: function(req,file,callback){
            callback(null, './assets/Audio');
        },
        filename:function(req,file,callback){
            callback(null, file.fieldname);
        }

    })

    var upload = multer({storage:storage});
    app.get(null, function(req,res){
        res.sendFile('./assets/Audio')
    });
    app.post(null, upload.single(this.file),function(req,res){
        console.log(req.file);
        console.log(req.file.path);
    });


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