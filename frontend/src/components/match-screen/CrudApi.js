import axios from 'axios'
import Cookie from 'js-cookie'

    const url = "https://match-api-rest.herokuapp.com"     


    //Envia o match para a base de dados
    const postMatch = (webmotorsCars, localizaId, localizaName, localizaYear, localizaVersion,movidaId, movidaName,movidaYear,movidaVersion,setLoading) => {
        setLoading(true)
        axios({
            method: 'post',
            url: `${url}/match` ,
            data: {
                createDate: `${Date.now()}`,
                updateDate: null,
                webmotors: {
                    id: String(webmotorsCars.id),
                    brand: webmotorsCars.brand,
                    model: webmotorsCars.model,
                    bodywork: webmotorsCars.bodyWork,
                    modelYear: webmotorsCars.modelYear,
                    version: webmotorsCars.version
                },
                localiza: {
                    id: String(localizaId),
                    name: localizaName,
                    year: localizaYear,
                    version: localizaVersion
                },
                movida: {
                    id: String(movidaId),
                    name: movidaName,
                    year: movidaYear,
                    version: movidaVersion
                },
                user: {
                    userId:String(Cookie.getJSON("documentUserId")),
                    name: String(Cookie.getJSON("user")),
                    email: String(Cookie.getJSON("email"))
                }
            }
        }).then(res =>{
            console.log({message:"Enviado com sucesso"})
            window.location.reload()
            
        }).catch(error=> {
            setLoading(false)
            console.log(error)
            alert("Tivemos um problema para enviar seus dados, tente novamente mais tarde!")
        })
    }


    const Api = {
        postMatch
    }

    export default Api;
