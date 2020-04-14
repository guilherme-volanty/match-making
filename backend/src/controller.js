const matchFile = require("./models");
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

function saveDataFromUpload(request, response){

	 
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
		.on('end', ()=>{
			response.status(200).send({ message: "Arquivo importado com sucesso!" });
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
					 Delete : Delete }