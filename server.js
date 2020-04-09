const express = require('express')
	, app = express()
	, multer = require('multer')
	, csv = require('fast-csv')
	, fs = require('fs')
    , path = require('path');

// cria uma instância do middleware configurada
// destination: lida com o destino
// filenane: permite definir o nome do arquivo gravado

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        // error first callback
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {

        // error first callback
        cb(null, file.fieldname)
    }
});

// utiliza a storage para configurar a instância do multer
const upload = multer({ storage });

app.use(express.static('public'));

// continua do mesma forma 
app.post('/file/upload', upload.single('file'), 
	() => fs.createReadStream(path.resolve(__dirname, 'uploads', 'file'))
					.pipe(csv.parse({headers: true}))
					.on('error', error => {
						console.log(error)
					})
					.on('data', row => {
						console.log(row)
					})
					.on('end', rowCouter =>{
						console.log(`Parsed ${rowCouter} rows!`)
					})
				);


app.listen(3000, () => console.log('App na porta 3000'));