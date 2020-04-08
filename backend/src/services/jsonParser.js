const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');


const jsonParser = fs.createReadStream(path.resolve(__dirname, '..', 'tmp', 'uploads', 'bq-results-20200406-113208-xv018v3b4nm9.csv'))
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

module.exports = jsonParser;