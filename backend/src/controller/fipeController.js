const Fipe = require('../models/fipeSchema')

module.exports = {
    
    //Métodos do Classificador
    async fipeData(request, response){
        fipeData = await Fipe.find();
        return response.json(fipeData)
    },

    async listBrands(request, response){
        try {
            const brands = await Fipe.distinct("brand");
            return response.json(brands);     
        } catch(err){
            console.log(err);
            return response.status(400).send({error: "Ocorreu um erro na listagem de carros"})
        }
    },

    async listModels(brand, response){
        try {
            const brandId = brand.params.brandsId;
            const models = await Fipe.find({brand: brandId}).distinct("model");
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
            const years = await Fipe.find({brand: brandsId, model: modely}).distinct("year")
            return response.json(years);
        }catch(error){
            return response.status(400).send({error: "Ocorreu um erro na listagem de carros"})
        }
    },

    async listVersions(request, response){
        try{
            const {brandsId, models, year} = request.params;
            const version = await Fipe.find({brand: brandsId, model: models, year: year}).distinct("version")
            return response.json(version)
        }catch(error){
            return response.status(400).send({error: "Ocorreu um erro na listagem de carros"})
        }
    },

    async listUniqueCar(request, response){
        try{
            const {brandsId, models, year, versionId} = request.params;
            const uniqueCar = await Fipe.find({brand: brandsId, model: models, modelYear: year, versionId: versionId})
            console.log(uniqueCar);
            return response.json(uniqueCar)
        }catch(error){
            return response.status(400).send({error: "Ocorreu um erro na listagem de carros"})
        }
    },   
}
