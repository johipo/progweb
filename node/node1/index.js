const http = require('http');

const server = http.createServer(function(req, res){
    process.argv.forEach((val, index) => {
        if(index >= 2){
            res.write(`${val}\n`);
        }
    });
    res.end();
});

server.listen(3030);//define a porta 


