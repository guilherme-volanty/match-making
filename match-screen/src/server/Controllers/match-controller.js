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

function getMatchById (request, response){
    Match.findById(request.params.id)
    .then(function(wishlist){
        response.status(200).send(wishlist)
    }).catch(function(err){
       response.status(500).send({message: "Ops! Ocorreu algum erro"})
    })
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

function deleteMatchById (request, response) {
    Match.findByIdAndDelete(request.params.id) 
    .then(function(){
        response.status(200).send(`Item  deletado com sucesso `)
    }).catch(function(err){
       response.status(500).send({message: "Ops! Ocorreu algum erro"})
       console.error(err)
    });  
}

function updateMatchById (request, response){
    Match.findByIdAndUpdate(request.params.id, request.body)
    .then(function(){
        response.status(200).send("Item atualizado com sucesso")
    }).catch(function(err){
        response.status(500).send({message:"Ops! Ocorreu algum erro"})
    })
}


module.exports = {
    getAllMatchs:getAllMatchs,
    postNewMatch:postNewMatch,
    deleteMatchById:deleteMatchById,
    getMatchById:getMatchById,
    updateMatchById:updateMatchById
}