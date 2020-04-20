const MetaData = require('../models/metadataSchema');
const EntriesData = require('../models/entrySchema');

module.exports = {
    async indexMetadata(request, response){
        allVersions = await MetaData.find();
        console.log(allVersions);
        return response.json(allVersions)
    }, 

    async indexCarEntries(request, response){
        allVersions = await EntriesData.find();
        console.log(allVersions);
        return response.json(allVersions)
    },

    async indexCarList(request, response){
        try {
            const ListFilter = await EntriesData.distinct((request.query.key).toString());
            return response.json(ListFilter)
        } catch(err){
            console.log(err);
            return response.status(400).send({error: "Ocorreu um erro na listagem de carros"})
        }
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
