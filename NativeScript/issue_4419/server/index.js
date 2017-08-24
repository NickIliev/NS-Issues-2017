// content of index.js
const http = require('http')
const url = require('url');
const port = 3000

mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"
};

const requestHandler = (request, response) => {
    console.log(request.url)

    let urlParsed = url.parse(request.url);

    if (urlParsed.path === '/withContentType') {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end('Response with Content-Type!')
    }
    else {
        response.removeHeader("Content-Type");
        response.end('Response without Content-Type!');
    }

}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
})