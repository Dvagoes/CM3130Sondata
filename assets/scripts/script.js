/**
 * code for handling file upload and audio image downloading
 */

//imports
var router = express.Router();
var ejs = require('ejs');
var html2canvas = require('html2canvas');
var FileSaver = require('file-saver');

//The following drag and drop code is taken from https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop

function dropHandler(ev) {
   
    console.log('File(s) dropped');

    ev.preventDefault();
    let file;
    if (ev.dataTransfer.items) {
        for (var i = 0; i < ev.dataTransfer.items.length; i++) {
            if (ev.dataTransfer.items[i].kind === 'file') {
                file = ev.dataTransfer.items[i].getAsFile();

                //begin file type check
                let fName = file.name;
                fileExtension = fName.split('.').pop();
                console.log("test: " + fileExtension);

                //simple if statement to check if file dropped is mp3
                if (fileExtension != 'mp3') {
                    alert("Invalid file type detected. \n \n please upload a .mp3 file");
                    return;
                }
                
                /**
                 * commented out block below is used to validate filetype for drag and drop.
                 * 
                 * it has since been replaced with the code above due to the lack of
                 * filetype conversion functionality post file upload.
                 */

                /*
                switch(fileExtension) {
                    case 'mp3':
                        break;
                    case 'wav':
                        break;
                    case 'aac':
                        break;
                    case 'flac':
                        break;
                    case 'ogg':
                        break;
                    case 'webm':
                        break;
                    default:
                        alert("Invalid file type detected. \n please upload an audio file");
                        return;
                }
                */

                //test console.log
                // console.log('...file [' + i + '].name = ' + file.name);
                fileProcess(file);
            }
        }
    } else {
        for (var i = 0; i < ev.dataTransfer.items.length; i++) {
            // test console.log
            // console.log('...file [' + i + '].name = ' + file.name);
            console.log("else statement called");
        }
    }
}

/**
 * dragOverHandler() function is currently deprecated
 * 
 * it was used to identify if a file is above the drag and drop area.
 */

function dragOverHandler(ev) {
    //test console log
    //console.log('File(s) in drop zone');

    ev.preventDefault();
}

/**
 * formOnSubmit() gets called when the user attempts to upload a file manually
 * by pressing the button
 */

function formOnSubmit(ev) {
    ev.preventDefault();
    console.log(ev);
    let file = ev.target.files[0];
    fileProcess(file);
}

/**
 * fileProcess takes the details of the uploaded file and converts the file into a String Datastream
 * 
 * this datastream then gets sent to the backend where it will be reconstructed as an audio file and saved
 */

function fileProcess(file) {
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
        console.log("test Arraybuffer")
        fetch("/", requestOptions)
        .then(response => response.text())
        .then(response => createSpectrogram(file))
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    })
}

/**
 * createSpectrogram() function prepares to create a wavesurfer-js waveform and spectrogram.
 * 
 * this function reads from the sound file that had been sent to the backend.
 * 
 * ideally this function should only read the file from the backend to avoid possible problems with limitations on the front end.
 * 
 * however this function can read the file from the front end.
 * hence why there is a file parameter.
 */

function createSpectrogram(file) {
    
        var wavesurfer = WaveSurfer.create({
            
            container: '#visual_output',
            waveColor: 'red',
            progressColor: 'purple',

            plugins: [
                window.WaveSurfer.spectrogram.create({
                    wavesurfer: wavesurfer,
                    container: "#wave-spectrogram",
                    //colorMap: colormap
                })
            ]
        });

        //test console.log
        console.log("test Create Spectrogram function called");

        //change code below to wavesurfer.loadBlob(file);
        //if loading from the backend causes issues
        wavesurfer.load('Audio/sound.mp3');

        wavesurfer.spectrogram;
        alreadyRunning = true;
}

/**
 * downloadWaveform() function gets called from pressing the "download waveform" button on the website.
 * 
 * this function converts the div containing the waveform into a temporary canvas which is then converted into an image
 * and is then downloaded.
 */

function downloadWaveform(ev) {
    ev.preventDefault();

    console.log("download waveform function called");

    var visual_output = document.getElementById('visual_output');
        
    html2canvas(visual_output, {
        onrendered: function(canvas) {
            canvas.toBlob(function(blob) {
                saveAs(blob, 'waveform.png');
            });
        }
    });
}

/**
 * downloadSpectrogram() function gets called from pressing the "download spectrogram" button on the website.
 * 
 * this function converts the div containing the spectrogram into a temporary canvas which is then converted into an image
 * and is then downloaded.
 */

function downloadSpectrogram(ev) {
    ev.preventDefault();

    console.log("download spectrogram function called");

    var wave_spectrogram = document.getElementById('wave-spectrogram');

    html2canvas(wave_spectrogram, {
        onrendered: function(canvas) {
            canvas.toBlob(function(blob) {
                saveAs(blob, 'spectrogram.png');
            });
        }
    });
}

/**
 * the reason why getting the image of the waveform and spectrogram is done as such
 * is due to problems with using wavesurfer-js's exportImage() method.
 * 
 * the furthest i've gotten on getting an image from exportImage was a png with a small canvas
 * filled with alpha.
 * 
 * documentation on wavesurfer-js's exportImage() method wasn't very detailed
 */