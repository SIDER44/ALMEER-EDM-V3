const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");
const ytdl = require("ytdl-core");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req,res)=>{
  res.sendFile(path.join(__dirname,"views/index.html"));
});

/* SEARCH SONGS */
app.get("/api/search", async (req,res)=>{
  const q = req.query.q;
  try{
    const itunes = await axios.get(`https://itunes.apple.com/search?term=${q}&entity=song&limit=20`);
    res.json(itunes.data.results);
  } catch(e){ res.json({error:"API failed"}); }
});

/* TRENDING */
app.get("/api/trending", async (req,res)=>{
  try{
    const deezer = await axios.get("https://api.deezer.com/chart");
    res.json(deezer.data.tracks.data.slice(0,10));
  } catch(e){ res.json({error:"failed"}); }
});

/* ARTIST */
app.get("/api/artist/:name", async (req,res)=>{
  const name = req.params.name;
  try{
    const artist = await axios.get(`https://itunes.apple.com/search?term=${name}&entity=song&limit=10`);
    res.json(artist.data.results);
  } catch(e){ res.json({error:"artist failed"}); }
});

/* YOUTUBE DOWNLOADER */
app.get("/api/youtube", async (req,res)=>{
  const url = req.query.url;
  if(!url) return res.status(400).send("No URL provided");
  try{
    res.header("Content-Disposition","attachment; filename=track.mp3");
    ytdl(url,{filter:"audioonly"}).pipe(res);
  }catch(e){ res.status(500).send("Download failed"); }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log("ALMEER EDM v3 server running on port",PORT));  try{
    const deezer = await axios.get("https://api.deezer.com/chart");
    res.json(deezer.data.tracks.data.slice(0,10));
  } catch(e){ res.json({error:"failed"}); }
});

/* ARTIST */
app.get("/api/artist/:name", async (req,res)=>{
  const name = req.params.name;
  try{
    const artist = await axios.get(`https://itunes.apple.com/search?term=${name}&entity=song&limit=10`);
    res.json(artist.data.results);
  } catch(e){ res.json({error:"artist failed"}); }
});

/* FAVORITES */
app.post("/api/favorite", async (req,res)=>{
  const song = req.body;
  try{
    const collection = db.collection("favorites");
    await collection.updateOne({trackId: song.trackId}, {$set: song}, {upsert:true});
    res.json({success:true});
  } catch(e){ res.json({error:"favorite failed"}); }
});

app.get("/api/favorite", async (req,res)=>{
  try{
    const collection = db.collection("favorites");
    const songs = await collection.find({}).toArray();
    res.json(songs);
  } catch(e){ res.json({error:"failed"}); }
});

/* PLAYLISTS */
app.post("/api/playlist", async (req,res)=>{
  const {name,song} = req.body;
  try{
    const collection = db.collection("playlists");
    await collection.updateOne({name}, {$push:{songs: song}}, {upsert:true});
    res.json({success:true});
  } catch(e){ res.json({error:"playlist failed"}); }
});

app.get("/api/playlist/:name", async (req,res)=>{
  const name = req.params.name;
  try{
    const collection = db.collection("playlists");
    const playlist = await collection.findOne({name});
    res.json(playlist || {songs: []});
  } catch(e){ res.json({error:"failed"}); }
});

/* YOUTUBE DOWNLOADER */
app.get("/api/youtube", async (req,res)=>{
  const url = req.query.url;
  if(!url) return res.status(400).send("No URL provided");
  try{
    res.header("Content-Disposition","attachment; filename=track.mp3");
    ytdl(url,{filter:"audioonly"}).pipe(res);
  }catch(e){ res.status(500).send("Download failed"); }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log("ALMEER EDM v3 server running on port",PORT));
