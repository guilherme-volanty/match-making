import * as firebase from "firebase";
import 'firebase/auth';
import Cookies from 'js-cookie';
import {history} from "./history";
let errorLogin = true;
let errorMessage= '';
//Função de autenticação chamada no onclick do botão google authenticated.
function authenticate() {

    // Usando um pop-up
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    // função do firebase que faz a Autenticação
    firebase.auth().signInWithPopup(provider).then(function (result) {
        const user = result.user;
        setCookies(result);
console.log(result)
        // restringir o dominio volanty.
        if (!user.email.match(/.*@volanty.com$/)) {
            errorLogin = false;
            errorMessage  = "Não é possivel acessar a plataforma com emails que não sejam do domínio @volanty";
            firebase.auth().currentUser.delete().then(r => console.log("Usuário Deletado/Não autenticado"));
            Cookies.remove('idToken','user','email','photo','data');
            history.push("/login");
        } else {
            insert(user);
            history.push("/home");
        }



    }).catch(function (error) {
        alert("Erro ao criar usuário :" + error);
    });
}

function setCookies(authenticateResponse) {
    Cookies.set("user", authenticateResponse.user.displayName);
    Cookies.set("email", authenticateResponse.user.email);
    Cookies.set("photo", authenticateResponse.user.photoURL);
    Cookies.set("idToken", authenticateResponse.credential.idToken);

}
//função para inserir dados no firebase
function insert(user){
    const db = firebase.firestore();
    db.settings({
        timestampsInSnapshots: true
    });

    const userRef = db.collection('users').add({
        user: user.displayName,
        email: user.email,
        createdAt:  new Date(user.metadata.creationTime),
        lastSignInTime: new Date(user.metadata.lastSignInTime)

    });

    console.log(userRef);
}


//verifica se existi o IdToken
function isAuthenticated() {
    return Cookies.get("idToken") != null;
}
// faz logOut e apaga o id do cookie
function singOut() {
    firebase.auth().signOut().then(function () {
        Cookies.remove('idToken');
        history.push("/")
    }).catch(function (error) {
        // An error happened.
    });

}

export {authenticate, singOut, isAuthenticated, errorLogin,errorMessage};