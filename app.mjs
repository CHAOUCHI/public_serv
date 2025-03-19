import { createServer } from "http";
import fs from "fs/promises";

const HOST = "0.0.0.0";
const PORT = 4000;

const server = createServer(async (req, res) => {
    console.log("\n");
    const requestURL = new URL(`http://${req.headers.host ?? "120.0.0.1"}${req.url}`);
    const fileName = requestURL.pathname;
    console.log(`${new Date()} \n${requestURL.hostname} requested the ressource : ${requestURL.pathname}.`)
    let filePath = `public/index.html`;
    if(requestURL.pathname != "/"){
        filePath = `public${fileName}`
    }

    res.appendHeader("Content-type",req.headers["content-type"] ?? "text/html");

    fs.readFile(filePath)
    .then(fileBuffer=>{
        res.write(fileBuffer);
    })
    .catch(error =>{
        console.error(error.message);
        // ERROR 404 File Not Nound
        res.statusCode = 404;
        res.statusMessage = "Not Found";
        console.log("404 Not Found");
        res.write("<h1>Not Found</h1>");
    })
    .finally(()=>{

        res.end();
    });

});


server.listen(PORT, HOST, () => {
    console.log(`Server listening on http://${HOST}:${PORT}`);
});