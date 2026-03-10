const results=document.getElementById("results");
const trending=document.getElementById("trending");
const favoritesDiv=document.getElementById("favorites");
const audio=document.getElementById("audio");
const title=document.getElementById("title");
const cover=document.getElementById("cover");

/* SEARCH */
async function search(){
let q=document.getElementById("searchBox").value;
let res=await fetch(`/api/search?q=${q}`);
let data=await res.json();
displaySongs(data, results);
}

/* SEARCH ARTIST */
async function searchArtist(name){
let res=await fetch(`/api/artist/${name}`);
let data=await res.json();
displaySongs(data, results);
}

/* DISPLAY SONGS */
function displaySongs(songs, container){
container.innerHTML="";
songs.forEach(song=>{
let div=document.createElement("div");
div.className="song";
div.innerHTML=`
<img src="${song.artworkUrl100}">
<div><b>${song.trackName}</b><br>${song.artistName}</div>
<button onclick="play('${song.previewUrl}','${song.trackName}','${song.artworkUrl100}')">Play</button>
<button onclick="addFavorite(${JSON.stringify(song)})">❤</button>
`;
container.appendChild(div);
});
}

/* PLAY SONG */
function play(url,name,img){
audio.src=url; audio.play();
title.innerText=name; cover.src=img;
}

/* LOAD TRENDING */
async function loadTrending(){
let res=await fetch("/api/trending");
let data=await res.json();
displaySongs(data, trending);
}

/* FAVORITES */
function addFavorite(song){
let favs=JSON.parse(localStorage.getItem("favorites")||"[]");
if(!favs.find(f=>f.trackId===song.trackId)) favs.push(song);
localStorage.setItem("favorites", JSON.stringify(favs));
showFavorites();
}

function showFavorites(){
let favs=JSON.parse(localStorage.getItem("favorites")||"[]");
favoritesDiv.innerHTML="";
favs.forEach(song=>{
let div=document.createElement("div");
div.className="song";
div.innerHTML=`
<img src="${song.artworkUrl100}">
<div><b>${song.trackName}</b><br>${song.artistName}</div>
<button onclick="play('${song.previewUrl}','${song.trackName}','${song.artworkUrl100}')">Play</button>
`;
favoritesDiv.appendChild(div);
});
}

loadTrending();
showFavorites();
