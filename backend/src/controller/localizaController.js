const Localiza = require('../models/localizaSchema')

module.exports = {

    //Métodos da Localiza
    async localizaData(request, response){
        localizaData = await Localiza.find();
        return response.json(localizaData)
    },

    async listNames(request, response){
        try {
            const name = await Localiza.distinct("name");
            return response.json(name);     
        } catch(err){
            console.log(err);
            return response.status(400).send({error: "Ocorreu um erro na listagem de carros"})
        }
    },

    async listYear(name, response){
        try {
            const nameId = name.params.nameId;
            const year = await Localiza.find({name: nameId}).distinct("year");
            return response.json(year);
        } catch(error){
            console.log(err);
            return response.status(400).send({error: "Ocorreu um erro na listagem de carros"})
        }
    },
    
    async listVersions(request, response){
        try{
            const nameId = request.params.nameId;
            const year = request.params.year;
            const versions = await Localiza.find({name: nameId, year: year}).distinct("modelYear")
            return response.json(versions);
        }catch(error){
            return response.status(400).send({error: "Ocorreu um erro na listagem de carros"})
        }
    },
    
    async listUniqueCar(request, response){
        try{
            const {nameId, years, versionId} = request.params;
            const uniqueCar = await Webmotors.find({brand: nameId, year: years, version: versionId})
            console.log(uniqueCar);
            return response.json(uniqueCar)
        }catch(error){
            return response.status(400).send({error: "Ocorreu um erro na listagem de carros"})
        }
    },     
}
