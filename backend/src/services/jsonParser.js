const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const keyTransform = require('./keyTransform');

function jsonParser(fileName){
    fs.createReadStream(path.resolve(__dirname, '..', 'tmp', 'uploads', fileName))
        .pipe(csv.parse({headers: true}))
        .on('error', error => {
            console.log(error)
        })
        .on('data', row => {
            let tey = keyTransform(row);
            console.log(tey)
        })
        .on('end', rowCounter =>{
            console.log(`Parsed ${rowCounter} rows! FOI CARALHO!!!`)
        });
}


module.exports = jsonParser;