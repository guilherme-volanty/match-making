function jsonTransform(csvObject, metadata) {
    return {
        name: csvObject.name,
        image: csvObject.image,
        year: csvObject.year,
        origin: csvObject.origin,
        href: csvObject.href,
        version: csvObject.version ,unique:true,
        metadataID: metadata
    }
};

module.exports = jsonTransform;