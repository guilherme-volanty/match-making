const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const Webmotors = require('../models/webmotorsSchema');

async function webmotorsParser(fileName) {
    let buffer = [];
    const startTime = new Date();

    fs.createReadStream(path.resolve(__dirname, '..', 'tmp', 'uploads', fileName))
        .pipe(csv.parse({ headers: true }))
        .on('error', error => {
            console.log(error)
        })
        .on('data', async row => {
            const { externalId, brand, model, modelYear, manufactoryYear, version } = row;

            let data = {
                webmotorsId: externalId,
                brand: brand,
                model: model,
                modelYear: modelYear,
                manufactoryYear: manufactoryYear,
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
            await Webmotors.insertMany(buffer);
            const endTime = new Date();
            const sec = Math.round((endTime - startTime) / 1000);
            console.log(`Parsed ${rowCounter} rows in ${sec} seconds!`)
        });
}

module.exports = webmotorsParser;