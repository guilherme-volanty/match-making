function returnDuplicatedValuesWithEqualFipeID(filteredFipeId) {
    const duplicatedFipeId = filteredFipeId.reduce((previousValue, currentValue) => {
        previousValue[currentValue.fipeId] = ++previousValue[currentValue.fipeId] || 0;
        return previousValue
    }, {});
    return filteredFipeId.filter(value => duplicatedFipeId[value.fipeId || value.fipeId !== ""])
}

function returnDuplicatedValuesWithEqualWebMotorsId(filteredWebMotorsId) {
    const duplicatedWebMotorsId = filteredWebMotorsId.reduce((previousValue, currentValue) => {
        previousValue[currentValue.webmotorsId] = ++previousValue[currentValue.webmotorsId] || 0;
        return previousValue
    }, {});
    return filteredWebMotorsId.filter(value => duplicatedWebMotorsId[value.webmotorsId || value.webmotorsId !== ""])
}

function returnDuplicatedValuesWithEqualLocalizaId(filteredLocalizaId) {
    const duplicatedLocalizaId = filteredLocalizaId.reduce((previousValue, currentValue) => {
        previousValue[currentValue.localizaId] = ++previousValue[currentValue.localizaId] || 0;
        return previousValue
    }, {});
    return filteredLocalizaId.filter(value => duplicatedLocalizaId[value.localizaId] && value.localizaId !== "")
}

function webmotors(cars) {
    const filteredWebMotorsId = cars.data.filter(value => value.webmotorsId !== "");
    const duplicatedWebMotorsId = returnDuplicatedValuesWithEqualWebMotorsId(filteredWebMotorsId)
    const dupLenght = duplicatedWebMotorsId.length - 1;
    const randomCar = Math.floor(Math.random() * dupLenght);

    return duplicatedWebMotorsId[randomCar];
}


function fipe(cars) {
    const filteredFipeId = cars.data.filter(value => value.fipeId !== "");
    const duplicatedFipeId = returnDuplicatedValuesWithEqualFipeID(filteredFipeId)
    const dupLenght = duplicatedFipeId.length - 1;
    const randomCar = Math.floor(Math.random() * dupLenght);
    
    return duplicatedFipeId[randomCar]
}

function localiza(cars) {
    const filteredLocalizaId = cars.data.filter(value => value.localizaId !== "");
    const duplicatedLocalizaId = returnDuplicatedValuesWithEqualLocalizaId(filteredLocalizaId)
    const dupLenght = duplicatedLocalizaId.length - 1;
    const randomCar = Math.floor(Math.random() * dupLenght);

    return duplicatedLocalizaId[randomCar]
}
const Dedupe = {
    localiza,
    fipe,
    webmotors
}

export default Dedupe;