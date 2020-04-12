import * as firebase from "firebase";
import 'firebase/auth';
import Cookies from 'js-cookie';
import {history} from "./history";

//Função de autenticação chamada no onclick do botão google authenticated.
function authenticate() {

    // Usando um pop-up
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    // função do firebase que faz a Autenticação
    firebase.auth().signInWithPopup(provider).then(function (result) {
        Cookies.set("user", result.user.displayName);
        Cookies.set("email", result.user.email);
        Cookies.set("photo", result.user.photoURL);
        Cookies.set("idToken", result.credential.idToken);

        // restringir o dominio volanty.
        if (!result.user.email.match(/.*@volanty.com$/)) {
            alert("Não é possivel efetuar login com emails que não sejam do domínio @volanty");
            firebase.auth().currentUser.delete().then(r => console.log("Usuário Deletado/Não autenticado"));
            Cookies.remove('idToken','user','email','photo');
            history.push("/login");
        } else {
            history.push("/home");
        }
    }).catch(function (error) {
        alert("Erro ao criar usuário :" + error);
    });
}
//verifica se existi o IdToken
function isAuthenticated() {
    console.log(Cookies.get("idToken"));
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

export {authenticate, singOut, isAuthenticated};