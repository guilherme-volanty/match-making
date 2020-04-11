const matchFile = require("./models");
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

function saveDataFromFile(request, response){

	 
	fs.createReadStream(path.resolve(__dirname,'uploads', request.file.filename))
		.pipe(csv.parse({headers: true}))
		.on('error', error => {
			console.log(error)
		})
		.on('data', (row)=>{
			
			matchFile.create(row)
			.then(function(data) {
				console.log("objeto salvo com sucesso: " + data);
			})
			.catch(function(err) {
				console.error(err);
			});
		})
		.on('end', (rowCount)=>{
			response.status(200).send({ message: "Arquivo importado com sucesso!" });
		})
			
}



function createMatchFiles(request, response) {
	const file = request.body;
  
	matchFile.create(file)
	  .then(function() {
		response.status(201).send({ message: "Objeto salvo no banco!" });
	  })
	  .catch(function(err) {
		console.error(err);
		response
		  .status(500)
		  .send({ message: "Ops! Estamos com alguns problemas." });
	  });
  }

  function getAllMatchFiles(request, response) {
	
  
	matchFile.find({})
	  .then(function(files) {
		response.status(201).send(files);
	  })
	  .catch(function(err) {
		console.error(err);
		response
		  .status(500)
		  .send({ message: "Ops! Estamos com alguns problemas." });
	  });
  }

  module.exports = { createMatchFiles: createMatchFiles,
					 getAllMatchFiles: getAllMatchFiles,
					 saveDataFromFile: saveDataFromFile }