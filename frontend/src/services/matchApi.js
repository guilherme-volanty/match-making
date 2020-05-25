import axios from 'axios'

    const matchApi = axios.create({
        baseURL: 'https://d1qz6xp2lbl1xi.cloudfront.net/matches'
    });
    const postMatch = async (brands, model, modelYear, factoryYear, id, name, email, localizaCars, webmotorsId, fipeId, selectWebmotorsVersion, selectFipeVersion) => {
        await matchApi.post('/match', {
                createDate: `${Date.now()}`,
                updateDate: null,
                isVerified: null,
                totalCounts: null,
                webmotors: {
                    webmotorsId: String(webmotorsId), 
                    brand:  brands,
                    model: model,
                    factoryYear: factoryYear,
                    modelYear: modelYear,
                    version: String(selectWebmotorsVersion)
                },
                localiza: {
                    localizaId: String(localizaCars.localizaId),
                    brand:  brands,
                    model: model,
                    factoryYear: factoryYear,
                    modelYear: modelYear,
                    version: localizaCars.versionLocaliza
                },
                fipe: {
                    fipeId: String(fipeId), 
                    brand:  brands,
                    model: model,
                    factoryYear: factoryYear,
                    modelYear: modelYear,
                    version: String(selectFipeVersion)
                },
                user: [{
                    userId:String(id),
                    name: String(name),
                    email: String(email)
                }]
        })
        .then(res =>{
            console.log({message:"Enviado com sucesso"})
            window.location.reload()
    
        }).catch(error=> {
            console.log(error)
            alert("Tivemos um problema para enviar seus dados, tente novamente mais tarde!")
        })
    } 

    export default postMatch;
