const matchMovida = require("./movidaSchema");
const matchLocaliza = require("./localizaSchema");
const metaData = require("./metaSchema");
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const jsonTransform = require('./jsonTransformer');

function saveDataFromUpload(request, response) {

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

			if(matchObject.origin==='MOVIDA'){

			matchMovida.insertMany(matchObject)
			.then(function() {
				response.status(200).send("Arquivos salvos com sucesso.");
			  })
			.catch(function(err) {
				console.log(err);
				response.status(500).send("Arquivo duplicado, essa base ja existe no banco.")
			  });
			
			}
			if(matchObject.origin==='LOCALIZA'){

				matchLocaliza.insertMany(matchObject)
				.then(function() {
					response.status(200).send("Arquivos salvos com sucesso.");
				  })
				.catch(function(err) {
					console.log(err);
					response.status(500).send("Arquivo duplicado, essa base ja existe no banco.")
				  });
				
				}
			
			
		})
		
		
		
};

async function listNames(request, response){
	try {
		const names = await matchFile.distinct("name");
		return response.json(names);     
	} catch(err){
		console.log(err);
		return response.status(400).send({error: "Ocorreu um erro na listagem de carros"})
	}
}

async function listYears(request, response){
	try {
		
		const item = await matchFile.find({name: request.params.name}).distinct("year");
		return response.json(item);

	}catch(err){
		console.log(err);
		return response.status(400).send({error: "Ocorreu um erro na listagem de carros"})
	}
}
async function filterByOriginMovida(request, response){
	try {
		
		const item = await matchMovida.find({});
		return response.json(item);

	}catch(err){
		console.log(err);
		return response.status(400).send({error: "Ocorreu um erro na listagem de carros"})
	}
}
async function filterByOriginLocaliza(request, response){
	try {
		
		const item = await matchLocaliza.find({});
		return response.json(item);

	}catch(err){
		console.log(err);
		return response.status(400).send({error: "Ocorreu um erro na listagem de carros"})
	}
}


async function listVersions(request, response){
	try {
		
		const item = await matchFile.find({name: request.params.name, year: request.params.year}).distinct("version");
		return response.json(item);

	}catch(err){
		console.log(err);
		return response.status(400).send({error: "Ocorreu um erro na listagem de carros"})
	}
}

async function listOrigins(request, response){
	try {
		
		const item = await matchFile.find({name: request.params.name, year: request.params.year, version: request.params.version})
		.distinct("origin");
		return response.json(item);

	}catch(err){
		console.log(err);
		return response.status(400).send({error: "Ocorreu um erro na listagem de carros"})
	}
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

  module.exports = { 
					 getAllMatchFiles: getAllMatchFiles,
					 saveDataFromUpload: saveDataFromUpload,
					 Delete : Delete,
					 Remove : Remove,
					 listNames : listNames,
					 listYears : listYears,
					 listVersions : listVersions,
					 listOrigins : listOrigins,
					 filterByOriginMovida : filterByOriginMovida,
					 filterByOriginLocaliza : filterByOriginLocaliza }