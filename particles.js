const canvas=document.getElementById("particleCanvas");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
class Particle{constructor(){this.x=Math.random()*canvas.width;this.y=Math.random()*canvas.height;this.size=Math.random()*3+1;this.speedX=(Math.random()-0.5)*2;this.speedY=(Math.random()-0.5)*2;}update(){this.x+=this.speedX;this.y+=this.speedY;if(this.x<0||this.x>canvas.width)this.speedX*=-1;if(this.y<0||this.y>canvas.height)this.speedY*=-1;}draw(){ctx.fillStyle="#0ff";ctx.beginPath();ctx.arc(this.x,this.y,this.size,0,Math.PI*2);ctx.fill();}}
let particlesArray=[];
for(let i=0;i<100;i++)particlesArray.push(new Particle());
function animateParticles(){ctx.clearRect(0,0,canvas.width,canvas.height);particlesArray.forEach(p=>{p.update();p.draw();});requestAnimationFrame(animateParticles);}
animateParticles();
window.addEventListener("resize",()=>{canvas.width=window.innerWidth;canvas.height=window.innerHeight;});
