const MetaData = require('../models/metadataSchema');

module.exports = {
    async index(request, response){
        allVersions = await MetaData.find();
        console.log(allVersions);
        return response.json(allVersions)
    }, 

    async delete(request, response){
        await MetaData.collection.updateMany({ isDeleted: false, isActive: true, deletedDate: Date },{ $set: {isDeleted: true, isActive: false, deletedDate: new Date}});
        console.log("Dados deletados com sucesso!")
        // return response.status(200).send("Base deletada com sucesso! Envie uma Nova Base")
    },

    async store(request, response){

        console.log(base);
        return response.status(201).send("Arquivo CSV recebido! Processando").json(base);
    }

}
