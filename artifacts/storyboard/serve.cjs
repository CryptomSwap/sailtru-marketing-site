const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const types = {'.html':'text/html; charset=utf-8','.svg':'image/svg+xml; charset=utf-8','.json':'application/json; charset=utf-8'};
http.createServer((req,res)=>{
  const pathname = new URL(req.url,'http://127.0.0.1').pathname;
  const name = pathname==='/'?'index.html':pathname.slice(1);
  if(!/^(?:index\.html|storyboard\.json|0[1-6]-[a-z-]+\.svg)$/.test(name)){res.writeHead(404);res.end('Not found');return;}
  fs.readFile(path.join(root,name),(error,data)=>{
    if(error){res.writeHead(404);res.end('Not found');return;}
    res.writeHead(200,{'Content-Type':types[path.extname(name)],'Cache-Control':'no-store'});res.end(data);
  });
}).listen(3011,'127.0.0.1',()=>console.log('Storyboard: http://127.0.0.1:3011'));
