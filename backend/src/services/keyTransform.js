
function keyTransform(csvObject) {
    return {
        createDate: new Date,
        updateDate: null,
        deletedDate: null, 
        isDeleted: false,
        csvObjects: {
            fipePrice: csvObject.precoFipe,
            minPrice: csvObject.precoMinimo,
            averagePrice: csvObject.precoMedio,
            maximumPrice: csvObject.precoMaximo,
            brand: csvObject.brand,
            model: csvObject.model,
            version: csvObject.version,
            modelYear: csvObject.modelYear,
            bodyWork: csvObject.carroceria,
            versionId: csvObject.versionId,
        }
    }
};

module.exports = keyTransform;