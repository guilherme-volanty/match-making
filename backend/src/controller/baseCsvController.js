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
        return response.json(allVersions)
    },

    async listBrands(request, response){
        try {
            const brands = await EntriesData.distinct("brand");
            return response.json(brands);     
        } catch(err){
            console.log(err);
            return response.status(400).send({error: "Ocorreu um erro na listagem de carros"})
        }
    },

    async listModels(brand, response){
        try {
            const brandId = brand.params.brandsId;
            const models = await EntriesData.find({brand: brandId}).distinct("model");
            return response.json(models);
        } catch(error){
            console.log(err);
            return response.status(400).send({error: "Ocorreu um erro na listagem de carros"})
        }
    },
    
    async listModelYear(request, response){
        try{
            const brandsId = request.params.brandsId;
            const modely = request.params.models;
            const years = await EntriesData.find({brand: brandsId, model: modely}).distinct("modelYear")
            return response.json(years);
        }catch(error){
            return response.status(400).send({error: "Ocorreu um erro na listagem de carros"})
        }
    },

    async listVersions(request, response){
        try{
            const {brandsId, models, year} = request.params;
            const version = await EntriesData.find({brand: brandsId, model: models, modelYear: year}).distinct("version")
            return response.json(version)
        }catch(error){
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
