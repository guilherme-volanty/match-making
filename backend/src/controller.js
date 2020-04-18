const matchFile = require("./fileSchema");
const metaData = require("./metaSchema");
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const jsonTransform = require('./jsonTransformer');

function saveDataFromUpload(request, response) {

	let buffer = [];
	
	const metaObject = new metaData({
				fileName: request.file.filename,
                createDate: new Date,
                updateDate: null,
                deletedDate: null,
                isDeleted: false,
                isActive: true,
			})
			
			metaObject.save(function (err, metadata) {
				if (err) {
					return console.error(err)
				};
				console.log(" Metadados salvos");
    });
	
	fs.createReadStream(path.resolve(__dirname,'uploads', request.file.filename))
		.pipe(csv.parse({headers: true}))
		.on('error', error => {
			console.log(error)
		})
		.on('data',(row)=>{
			
			let matchObject = jsonTransform(row,metaObject.id);
			
			try {
                buffer.push(matchObject);
            } catch {
                err => {
                    return err;
                }
            }
			
		})
		.on('end', ()=>{
			
			matchFile.create(buffer)
			.then(function() {
				response.status(200).send("Arquivos salvos com sucesso.");
			  })
			.catch(function(err) {
				response.status(500).send({ message: "Ops! Ocorreu um erro" });
			  });

			
		})
		
}



function getCarByName(request, response) {
	
	matchFile.find({name:request.params.name})
	  .then(function(files) {
		response.status(201).send(files);
	  })
	  .catch(function(err) {
		response.status(500).send({ message: "Ops! Ocorreu um erro" });
	  });
  }

function getCarByYear(request, response) {
	
	matchFile.find({year:request.params.name})
	  .then(function(files) {
		response.status(201).send(files);
	  })
	  .catch(function(err) {
		response.status(500).send({ message: "Ops! Ocorreu um erro" });
	  });
  }

function getCarByOrigin(request, response) {
	
	matchFile.find({origin:request.params.name})
	  .then(function(files) {
		response.status(201).send(files);
	  })
	  .catch(function(err) {
		response.status(500).send({ message: "Ops! Ocorreu um erro" });
	  });
  }


function getAllMatchFiles(request, response) {
	
  	matchFile.find({})
	  .then(function(files) {
		response.status(200).send(files);
	  })
	  .catch(function(err) {
		console.error(err);
		response
		  .status(500)
		  .send({ message: "Ops! Ocorreu um erro" });
	  });
  }

  function Delete(request, response){
	metaData.collection.updateMany({ isDeleted: false, isActive: true, deletedDate: Date },{ $set: {isDeleted: true, isActive: false, deletedDate: new Date}})
	
	.then(function() {
		response.status(200).send({message: "Collection limpada."});
	  })
	.catch(function(err) {
		response.status(500).send({ message: "Ops! Ocorreu um erro" });
	  });
 }
  
  function Remove(request, response){
	matchFile.collection.remove({})
	.then(function() {
		response.status(200).send({message: "Collection limpada."});
	  })
	.catch(function(err) {
		response.status(500).send({ message: "Ops! Ocorreu um erro" });
	  });
 }

  module.exports = { getCarByName : getCarByName,
					 getCarByYear : getCarByYear,
					 getCarByOrigin : getCarByOrigin,
					 getAllMatchFiles: getAllMatchFiles,
					 saveDataFromUpload: saveDataFromUpload,
					 Delete : Delete,
					 Remove : Remove }