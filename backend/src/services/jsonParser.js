const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const keyTransform = require('./keyTransform');
const MetaData = require('../models/metadataSchema');
const EntriesData = require('../models/entrySchema');
const baseCSVController = require('../controller/baseCsvController');

async function jsonParser(fileName) {
    let buffer = [];
    const startTime = new Date();

    await baseCSVController.delete();
    const mongoObject =  new MetaData({
        fileName: fileName,
        createDate: new Date,
        updateDate: null,
        deletedDate: null,
        isDeleted: false,
        isActive: true,
    });
    mongoObject.save(function (err, metadata) {
        if (err) {
            return console.error(err)
        };
        console.log(metadata.fileName + " Metadados salvos");
    });
    fs.createReadStream(path.resolve(__dirname, '..', 'tmp', 'uploads', fileName))
        .pipe(csv.parse({ headers: true }))
        .on('error', error => {
            console.log(error)
        })
        .on('data', async row => {
            let data = keyTransform(row, mongoObject.id);
            
            try {
                buffer.push(data);
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