const http = require("node:http");
const url = require("node:url");
const PORT = 8000;

const server = http.createServer((req, res) => {
    console.log(req.url);
    const pathName = req.url;
    // Routing
    if (pathName === "/") {
        res.end("welcome to mysocial.com");
    } else if (pathName === "/user") {
        res.end("welcome to your user profile");
    } else if (pathName === "/contactus") {
        res.end("welcome to privacy policy and contact us");
    } else {
        res.writeHead(404);
        res.end("Bad request page not found");
    }
});

server.listen(PORT, "127.0.0.1", () => {
    console.log(`Server is listening on port ${PORT}`);
});
