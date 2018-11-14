const http = require('http');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const promisify = require('util').promisify;
//const stat = promisify(fs.stat);  //将fs的stat封装成promisify，从而避免大量的回调
const readdir = promisify(fs.readdir);
const route = require('./helper/route');

const conf = require('./config/defaultConfig');

const server = http.createServer((req, res) => {
    const url = req.url;

    const filePath = path.join(conf.root, req.url);
    route(req, res, filePath);

    // fs.stat(filePath, (err,stats) => {
    //     if(err){
    //         res.statusCode = 404;
    //         res.setHeader('Content-Type', 'text/plain');
    //         res.end(`${filePath} is not a directory or a file.`)
    //         return;
    //     }

        // if(stats.isFile()){
        //     res.statusCode = 200;
        //     res.setHeader('Content-Type', 'text/plain');
        //     fs.createReadStream(filePath).pipe(res); //将文件内容以流的方式送到response中



        // }else if(stats.isDirectory()){
        //     fs.readdir(filePath, (err, files) => {
        //         res.statusCode = 200;
        //         res.setHeader('Content-Type', 'text/plain');
        //         res.end(files.join(','));
        //     });
        // }
    });

server.listen(conf.port, conf.hostname, () => {
    const addr = `http://${conf.hostname}:${conf.port}`;
    console.info(`Server stared at ${chalk.green(addr)}`);


});