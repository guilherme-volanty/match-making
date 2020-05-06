const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const ClassifierData = require('../models/classfierMatchSchema');

async function classifierParser(fileName) {
    let buffer = [];
    const startTime = new Date();

    fs.createReadStream(path.resolve(__dirname, '..', 'tmp', 'uploads', fileName))
        .pipe(csv.parse({ headers: true }))
        .on('error', error => {
            console.log(error)
        })
        .on('data', async row => {
            const { marca, modelo, ano_fabricacao, ano_modelo, versao_fipe,	versao_webmotors, versao_localiza } = row;

            let data = {
                brand: marca,
                model: modelo,
                factoryYear: ano_fabricacao,
                modelYear: ano_modelo,
                versionFipe: versao_fipe,
                versionWebMotors: versao_webmotors,
                versionLocaliza: versao_localiza,
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
            await ClassifierData.insertMany(buffer);
            const endTime = new Date();
            const sec = Math.round((endTime - startTime) / 1000);
            console.log(`Parsed ${rowCounter} rows in ${sec} seconds!`)
        });
}

module.exports = classifierParser;