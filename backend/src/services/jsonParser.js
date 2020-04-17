const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const keyTransform = require('./keyTransform');
const MetaData = require('../models/metadataSchema');
const EntriesData = require('../models/entrySchema');
const baseCSVController = require('../controller/baseCsvController');

function jsonParser(fileName) {
    let buffer = [];
    const startTime = new Date();

    let strem = fs.createReadStream(path.resolve(__dirname, '..', 'tmp', 'uploads', fileName))
        .pipe(csv.parse({ headers: true }))
        .on('error', error => {
            console.log(error)
        })
        .on('start', async fileName => {

        })
        .on('data', async row => {
            await baseCSVController.delete();
            await MetaData.insertMany({
                fileName: fileName,
                createDate: new Date,
                updateDate: null,
                deletedDate: null,
                isDeleted: false,
                isActive: true,
            });
            let tey = keyTransform(row);
            try {
                buffer.push(tey);
            } catch {
                err => {
                    return err;
                }
            }
        })
        .on('end', async rowCounter => {
            
            await EntriesData.insertMany(buffer);
            const endTime = new Date();
            const sec = Math.round((endTime - startTime) / 1000);
            console.log(`Parsed ${rowCounter} rows in ${sec} seconds!`)
        });
}

module.exports = jsonParser;