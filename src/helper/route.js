const fs = require('fs');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);  //将fs的stat封装成promisify，从而避免大量的回调
const readdir = promisify(fs.readdir);
//const stat = fs.stat;



module.exports = async function (req, res, filePath) {
    try{
        const stats = await stat(filePath);
        if(stats.isFile()){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            fs.createReadStream(filePath).pipe(res); //将文件内容以流的方式送到response中

        }else if(stats.isDirectory()){
            const files = await readdir(filePath);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end(files.join(','));
        }
    }catch(ex){
        console.log(ex.toString());
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`${filePath} is not a directory or a file.\n ${ex.toString()}`)
        return;
    }

    
}