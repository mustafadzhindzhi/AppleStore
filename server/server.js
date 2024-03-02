import path from 'path';
import fs from 'fs';
import http from 'http';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const filePath = path.join(__dirname, '/data/myJson.json');

const server = http.createServer((req, res) => {
    if(req.url === '/myJson') {
        fs.readFile(filePath, (err, data) => {
            if(err) {
                console.log(err);
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Internal Server Error');
                return;
            }
            res.writeHead(200, {'Content-Type':'application/json'});
            res.end(data);
        });
    } else if(req.url === '/login' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString()
        });
        req.on('end', ( )=> {
            const credentials = JSON.parse(body);

            const user = user.find(u => u.username === credentials.username && u.password === credentials.password);

            if(user) {
                 res.writeHead(200, {'Content-Type':'application/json'})
            }
        })
    } else {
        res.writeHead(404, {'Content-Type':'text/plain'});
        res.end('Not Found');
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});