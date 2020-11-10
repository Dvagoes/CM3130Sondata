//following code is taken from https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
//currently early implementation subject to changes later

//to get file drag and drop working. you need to drag the file over "Choose an Audio File" on the webpage


function dropHandler(ev) {
    console.log('File(s) dropped');

    ev.preventDefault()
    let file;
    if (ev.dataTransfer.items) {
        for (var i = 0; i < ev.dataTransfer.items.length; i++) {
            if (ev.dataTransfer.items[i].kind === 'file') {
                file = ev.dataTransfer.items[i].getAsFile();
                console.log('...file [' + i + '].name = ' + file.name);
            }
        }
    } else {
        for (var i = 0; i < ev.dataTransfer.items.length; i++) {
            console.log('...file [' + i + '].name = ' + file.name);
        }
    }
}

function dragOverHandler(ev) {
    console.log('File(s) in drop zone');

    ev.preventDefault();
}

function formOnSubmit(ev) {
    ev.preventDefault();
    let el = document.getElementById("audio_upload");
    console.log(el.files);
    console.log("file upload test" + el.name);
}