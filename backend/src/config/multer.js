const multer = require('multer');
const path = require('path');

module.exports = {
    defaultDestination: path.resolve(__dirname, '..', 'tmp', 'uploads'),
    storage: multer.diskStorage({
        destination: (request, file, cb) => {
            cb(null, path.resolve(__dirname, '..', 'tmp', 'uploads'))
        },
        filename: (request, file, cb) => {
            cb(null, file.originalname)
        }
    }),
    limits: {
        fileSize: 50*1024*1024,
    },
    fileFilter: (request, file, cb) => {
        const allowedFormat = 'text/csv';

        if(allowedFormat.includes(file.mimetype)){
            cb(null, true)
        } else{
            cb(new Error('Formato de Arquivo Inválido. Por favor envie um arquivo no formato CSV'))
        }
        
    }
};