const audioCtx=new(window.AudioContext||window.webkitAudioContext)();
const audioElement=document.getElementById("audio");
const audioSrc=audioCtx.createMediaElementSource(audioElement);
const analyser=audioCtx.createAnalyser();
audioSrc.connect(analyser); analyser.connect(audioCtx.destination);
analyser.fftSize=256; const bufferLength=analyser.frequencyBinCount; const dataArray=new Uint8Array(bufferLength);
const canvas=document.getElementById("visualizerCanvas");
const ctx=canvas.getContext("2d");
function drawVisualizer(){requestAnimationFrame(drawVisualizer);analyser.getByteFrequencyData(dataArray);ctx.clearRect(0,0,canvas.width,canvas.height);let barWidth=canvas.width/bufferLength;let x=0;for(let i=0;i<bufferLength;i++){const barHeight=dataArray[i]/2;ctx.fillStyle=`rgb(${barHeight+100},50,255)`;ctx.fillRect(x,canvas.height-barHeight,barWidth,barHeight);x+=barWidth+1;}}
audioElement.onplay=()=>{if(audioCtx.state==='suspended')audioCtx.resume();drawVisualizer();};
