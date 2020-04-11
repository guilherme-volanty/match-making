const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const keyTransform = require('./keyTransform');
const BaseCSV = require('../models/baseSchema');


function jsonParser(fileName){
    let buffer =[], counter =0
    const startTime = new Date();

    let stream = fs.createReadStream(path.resolve(__dirname, '..', 'tmp', 'uploads', fileName))
        .pipe(csv.parse({headers: true}))
        .on('error', error => {
            console.log(error)
        })
        .on('data', async row => {
            stream.pause();
            let tey = keyTransform(row);
            buffer.push(tey)
            counter++;
            try{
                if(counter>=1000){
                    await BaseCSV.insertMany(buffer);
                    buffer = [];
                    counter = 0;
                } 
            } catch(e){
                stream.destroy(e);
            }
            stream.resume();
            // console.log(tey)
            
        })
        .on('end', async rowCounter =>{
            try{
                if(counter>0){
                    await BaseCSV.insertMany(buffer);
                    buffer = [];
                    counter = 0;
                    const endTime = new Date();
                    const sec = Math.round((endTime-startTime)/1000);
                    console.log(`Parsed ${rowCounter} rows in ${sec} seconds!`)
                } 
            } catch(e){
                stream.destroy(e)
            }
        });

}

module.exports = jsonParser;