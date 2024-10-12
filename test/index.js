const http = require('http');
const server = http.createServer((req, res) => {
    console.log(req.url);
    console.log(req.method);
    console.log(req.headers);
    console.log(req);
    res.end('Hello World!');
}
);

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});