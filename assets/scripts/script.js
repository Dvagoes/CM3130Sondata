window.addEventListener('load', function () {
    
  console.log("Javascript is working")

var wavesurfer = WaveSurfer.create({

    container: '#visual_output',
    waveColor: 'red',
    progressColor: 'purple',

    plugins: [
        window.WaveSurfer.spectrogram.create({
            wavesurfer: wavesurfer,
            container: "#wave-spectrogram",
        })
    ]
});
console.log("Pog")
//wavesurfer.load('../assets/Audio/birds.mp3');

wavesurfer.load('/Audio/birds.mp3')




})