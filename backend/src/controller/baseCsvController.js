const BaseCSV = require('../models/baseSchema');

module.exports = {
    async index(request, response){
        allVersions = await BaseCSV.find();

        return response.json(allVersions)
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
        return response.status(201).send("Dados Chegaram no MongoDB").json(base);
    }

}
