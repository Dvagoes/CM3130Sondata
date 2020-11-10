//following code is taken from https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
//currently early implementation subject to changes later

//to get file drag and drop working. you need to drag the file over "Choose an Audio File" on the webpage

// ignore commented code for now

function dropHandler(ev) {
    console.log('File(s) dropped');

    ev.preventDefault()
    let file;
    if (ev.dataTransfer.items) {
        for (var i = 0; i < ev.dataTransfer.items.length; i++) {
            if (ev.dataTransfer.items[i].kind === 'file') {
                file = ev.dataTransfer.items[i].getAsFile();
                // console.log('...file [' + i + '].name = ' + file.name);
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
    let el = document.getElementById("audio_upload");
    //console.log(el.files);
    //console.log("file upload test" + el.name);
    fileProcess(el.files[0]);
}

/**
 * fileProcess takes the "file" parameter to display file details in json format.
 * this will be used as a staging point for getting files uploaded temporarily.
 * currently it only gets the file details printed to console in json format.
 */
function fileProcess(file) {
    console.log(file);
    let text = "Filename: "
    document.getElementById("display_filename").innerHTML = text + file.name;
}