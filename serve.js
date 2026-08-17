// Basit statik sunucu — oyunu yerel ağa açar (telefon testi için)
// Kullanım: node serve.js  →  http://<PC-IP>:8642
const http=require("http");
const fs=require("fs");
const path=require("path");
const ROOT=__dirname;
const MIME={".html":"text/html; charset=utf-8",".png":"image/png",".mp3":"audio/mpeg",
  ".js":"text/javascript",".css":"text/css",".jpg":"image/jpeg",".svg":"image/svg+xml"};
http.createServer((req,res)=>{
  let p=decodeURIComponent(req.url.split("?")[0]);
  if(p==="/")p="/index.html";
  const f=path.join(ROOT,p);
  if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){
    res.writeHead(404);res.end("yok");return;
  }
  res.writeHead(200,{"Content-Type":MIME[path.extname(f).toLowerCase()]||"application/octet-stream",
    "Cache-Control":"no-cache"});
  fs.createReadStream(f).pipe(res);
}).listen(8642,"0.0.0.0",()=>console.log("Oyun servise girdi: http://localhost:8642"));
