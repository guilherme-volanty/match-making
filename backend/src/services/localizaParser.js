const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const Localiza = require('../models/localizaSchema');

async function localizaParser(fileName) {
    let buffer = [];
    const startTime = new Date();

    fs.createReadStream(path.resolve(__dirname, '..', 'tmp', 'uploads', fileName))
        .pipe(csv.parse({ headers: true }))
        .on('error', error => {
            console.log(error)
        })
        .on('data', async row => {
            const { _id, name, year, version  } = row;

            let data = {
                idbase: _id,
                name: name,
                year: year,
                version: version
            };
            
            try {
                buffer.push(data);
            } catch {
                err => {
                    return err;
                }
            }
        })
        .on('end', async rowCounter => {
            await Localiza.insertMany(buffer);
            const endTime = new Date();
            const sec = Math.round((endTime - startTime) / 1000);
            console.log(`Parsed ${rowCounter} rows in ${sec} seconds!`)
        });
}

module.exports = localizaParser;