import axios from 'axios'

    const matchApi = axios.create({
        baseURL: 'http://localhost:3001/matches'
    });
    // https://d1qz6xp2lbl1xi.cloudfront.net
    const postMatch = async (webmotorsCars, localizaCars, fipeCars, id, name, email) => {
        await matchApi.post('/match', {
                createDate: `${Date.now()}`,
                updateDate: null,
                isVerified: null,
                totalCounts: null,
                webmotors: {
                    webmotorsId: String(webmotorsCars.webmotorsId), //REFACT
                    brand: webmotorsCars.brand,
                    model: webmotorsCars.model,
                    factoryYear: webmotorsCars.factoryYear,
                    modelYear: webmotorsCars.modelYear,
                    version: ""
                },
                localiza: {
                    localizaId: localizaCars.localizaId, //REFACT
                    brand: localizaCars.brand,
                    model: localizaCars.model,
                    factoryYear: localizaCars.factoryYear,
                    modelYear: localizaCars.modelYear,
                    version: localizaCars.versionLocaliza
                },
                fipe: {
                    fipeId: fipeCars.fipeId, //REFACT
                    brand: fipeCars.brand,
                    model: fipeCars.model,
                    factoryYear: fipeCars.factoryYear,
                    modelYear: fipeCars.modelYear,
                    version: ""
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
