// const fs = require('fs');
// const path = require('path');
// const csv = require('fast-csv');


// const jsonParser = fs.createReadStream(path.resolve(__dirname, 'uploads', 'file'))
//     .pipe(csv.parse({headers: true}))
//     .on('error', error => {
//         console.log(error)
//     })
//     .on('data', row => {
//         console.log(row)
//     })
//     .on('end', rowCouter =>{
//         console.log(`Parsed ${rowCouter} rows!`)
//     });

// module.exports = jsonParser;