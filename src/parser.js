const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

function jsonParser(fileName){
    fs.createReadStream(path.resolve(__dirname,'uploads', fileName))
        .pipe(csv.parse({headers: true}))
        .on('error', error => {
            console.log(error)
        })
        .on('data', row => {
            console.log(row)
        })
        .on('end', rowCounter =>{
            console.log(`Parsed ${rowCounter} rows! FOI CARALHO!!!`)
        });
}


module.exports = jsonParser;