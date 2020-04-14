const BaseCSV = require('../models/baseSchema');

module.exports = {
    async index(request, response){
        allVersions = await BaseCSV.find();
        console.log(allVersions);
        return response.json(allVersions)
    }, 

    async delete(request, response){
        BaseCSV.collection.updateMany({isDeleted: false},{$set: {isDeleted: true}});
        console.log("Deletou!")
        return response.status(200).send("Base deletada com sucesso! Envie uma Nova Base")
    },

    async store(request, response){

        const { fipePrice, 
                minPrice, 
                averagePrice, 
                maximumPrice, 
                brand, 
                model,
                version,
                modelYear,
                bodyWork,
                versionId } = request.body;

        const base = await BaseCSV.create({
            fipePrice,
            minPrice,
            averagePrice,
            maximumPrice,
            brand,
            model,
            version,
            modelYear,
            bodyWork,
            versionId,
        })

        console.log(base);
        return response.status(201).send("Arquivo CSV recebido! Processando").json(base);
    }

}
