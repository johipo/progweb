const fs = require("fs");

var t1 = new Promise(function (resolve, reject){
    fs.readFile('./1.txt', function (error1, data1) {
        if(error1) reject(error1)
        else resolve(parseInt(data1));
    });
})

var t2 = new Promise(function (resolve, reject){
    fs.readFile('./2.txt', function (error2, data2) {
        if(error2) reject(error2)
        else resolve(parseInt(data2));
    });
})

var t3 = new Promise(function (resolve, reject){
    fs.readFile('./3.txt', function (error3, data3) {
        if(error3) reject(error3)
        else resolve(parseInt(data3));
    });
})

Promise.all([t1, t2, t3]).then(function([data1, data2, data3]) {
    console.log(data1 + data2 + data3);
})