/*
* Title: Uptime Monitoring Application
* Description: This is a Node.js application that monitors the uptime of a website.
* Author: Rahat Kabir
* Date: 2022-15-02
* Version: 1.0.0
* */
//dependencies
const http = require('http');

// app object - module scaffolding
const app = {};

// configuration
app.config = {
    port: 3000
}

// create server

app.createServer = ()=> {
    const server = http.createServer(app.handleRequestResponse);
    server.listen(app.config.port, ()=> {
        console.log(`Server is listening on port ${app.config.port}`);
    });
}



// handle request response

app.handleRequestResponse =  (req, res) => {
    res.end('Hello World');
}

// start server
app.createServer();
