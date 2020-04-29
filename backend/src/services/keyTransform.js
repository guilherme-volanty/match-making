function keyTransform(csvObject, metadata) {
    return {
        brand: csvObject.brand,
        model: csvObject.model,
        version: csvObject.version,
        modelYear: csvObject.modelYear,
        bodyWork: csvObject.carroceria,
        versionId: csvObject.versionId,
        metadataId: metadata,
    }
};

module.exports = keyTransform;