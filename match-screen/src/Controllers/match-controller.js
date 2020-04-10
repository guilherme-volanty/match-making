const Match = require("../models/match");

function getAllMatchs(request, response){
    Match.find({})
        .then(function(match){
            response.status(200).send(match);
        })
        .catch(function(err){
            response.status(500).send(err)
        });
}


function postNewMatch(request, response) {
    const match = request.body; 
    Match.create(match)
        .then(function(){
            response.status(201).send({message:"Match Criado"})
        })
        .catch(function(err){
            console.log(err);
            response.status(500).send({message:"Nem rolou"})
        })
}


module.exports = {
    getAllMatchs:getAllMatchs,
    postNewMatch:postNewMatch,
}