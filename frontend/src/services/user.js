import "firebase/auth";
import firebaseConfig from "./firebase.config";

const User = () =>{
    const sessionKey = sessionStorage.getItem("firebase:authUser:" + firebaseConfig.apiKey + ":[DEFAULT]");
    const user = JSON.parse(sessionKey);

    return user
}

export default User;