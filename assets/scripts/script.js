
/*
document.addEventListener('DOMContentLoaded', function() {
    // Load a colormap json file to be passed to the spectrogram.create method.
   
    WaveSurfer.util
        .fetchFile({ url: 'hot-colormap.json', responseType: 'json' })
        .on('success', cm => {
            console.log("Hmmmm")
            colorMap = cm;
        });
});



var colormap = colormap
module.exports = colormap
console.log("Javascript is working")

    var colors = colormap({
        colormap: 'hot',
        nshades: 256,
        format: 'float'
    });

*/

/**
function createSpectrogram() {
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
    //wavesurfer.load('../assets/Audio/birds.mp3');

    wavesurfer.load('/Audio/sound.mp3')

    wavesurfer.spectrogram
    document.getElementById('visual_output').style.visibility = "hidden";
}
*/