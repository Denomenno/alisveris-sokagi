// yayin/ klasörünü index.html + assets'ten yeniden üretir (Netlify ve Capacitor ortak kaynağı)
const fs=require("fs"),path=require("path");
const R=path.join(__dirname,"..");const Y=path.join(R,"yayin");
fs.rmSync(Y,{recursive:true,force:true});fs.mkdirSync(Y);
fs.copyFileSync(path.join(R,"index.html"),path.join(Y,"index.html"));
fs.cpSync(path.join(R,"assets"),path.join(Y,"assets"),{recursive:true});
for(const f of ["_headers_src","manifest.webmanifest"]){
  const s=path.join(R,f);if(fs.existsSync(s))fs.copyFileSync(s,path.join(Y,f==="_headers_src"?"_headers":f));
}
console.log("yayin/ güncellendi");
