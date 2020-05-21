const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const Fipe = require('../models/fipeSchema');

async function fipeParser(fileName) {
    let buffer = [];
    const startTime = new Date();

    fs.createReadStream(path.resolve(__dirname, '..', 'tmp', 'uploads', fileName))
        .pipe(csv.parse({ headers: true }))
        .on('error', error => {
            console.log(error)
        })
        .on('data', async row => {
            const { _id, brandName, modelName, year, versionName } = row;

            let data = {
                fipeId: _id,
                brand: brandName,
                model: modelName,
                year: year,
                version: versionName
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
            await Fipe.insertMany(buffer);
            const endTime = new Date();
            const sec = Math.round((endTime - startTime) / 1000);
            console.log(`Parsed ${rowCounter} rows in ${sec} seconds!`)
        });
}

module.exports = fipeParser;