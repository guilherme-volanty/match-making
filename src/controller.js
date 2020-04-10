const matchFile = require("./models");

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
					 getAllMatchFiles: getAllMatchFiles }