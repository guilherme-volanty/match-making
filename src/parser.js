const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const matchFile = require("./models");

function jsonParser(fileName){
    fs.createReadStream(path.resolve(__dirname,'uploads', fileName))
        .pipe(csv.parse({headers: true}))
        .on('error', error => {
            console.log(error)
        })
        .on('data', (row)=>{
            console.log(row)
        })
        
        
}


module.exports = jsonParser;