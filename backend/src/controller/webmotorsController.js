const Webmotors = require('../models/webmotorsSchema')

module.exports = {
    
    //Métodos da Webmotors
    async webmotorsData(request, response){
        webmotorsData = await Webmotors.find();
        return response.json(webmotorsData)
    },

    async listBrands(request, response){
        try {
            const brands = await Webmotors.distinct("brand");
            return response.json(brands);     
        } catch(err){
            console.log(err);
            return response.status(400).send({error: "Ocorreu um erro na listagem de carros"})
        }
    },

    async listModels(brand, response){
        try {
            const brandId = brand.params.brandsId;
            const models = await Webmotors.find({brand: brandId}).distinct("model");
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
            const years = await Webmotors.find({brand: brandsId, model: modely}).distinct("modelYear")
            return response.json(years);
        }catch(error){
            return response.status(400).send({error: "Ocorreu um erro na listagem de carros"})
        }
    },

    async listVersions(request, response){
        try{
            const {brandsId, models, year} = request.params;
            const version = await Webmotors.find({brand: brandsId, model: models, modelYear: year}).distinct("version")
            return response.json(version)
        }catch(error){
            return response.status(400).send({error: "Ocorreu um erro na listagem de carros"})
        }
    },

    async listUniqueCar(request, response){
        try{
            const {brandsId, models, year, versionId} = request.params;
            const uniqueCar = await Webmotors.find({brand: brandsId, model: models, modelYear: year, versionId: versionId})
            console.log(uniqueCar);
            return response.json(uniqueCar)
        }catch(error){
            return response.status(400).send({error: "Ocorreu um erro na listagem de carros"})
        }
    },   
}
