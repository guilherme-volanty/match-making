import * as firebase from "firebase";
import 'firebase/auth';
import Cookies from 'js-cookie';
import {history} from "./history";

//Função de autenticação chamada no onclick do botão de login
function authenticate() {
    // Usando um pop-up
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');


    provider.setCustomParameters({
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        customParameters: {hd: 'volanty.com'},
        authMethod: 'https://accounts.google.com',
        clientId: "6592981662-b0oij77uhhvuqhrmgdm5m2igjg8oir8o.apps.googleusercontent.com",
        login_hint: 'user@volanty.com'
    });


    firebase.auth().signInWithPopup(provider).then(function (result) {
        Cookies.set("user", result.user.displayName);
        Cookies.set("email", result.user.email);
        Cookies.set("photo", result.user.photoURL);

        if (!result.user.email.match(/.*@volanty.com$/)) {
            alert("Não é possivel efetuar login com emails que não sejam do domínio @volanty");
            firebase.auth().currentUser.delete().then(r => console.log("Usuário Deletado/Não autenticado"));
        }
        history.push("/Home")
    }).catch(function (error) {
        alert("Erro ao criar usuário :" + error);
    });
}

function isAuthenticated (props){
    console.log(props);
    return true;
};

function singOut() {
    firebase.auth().signOut().then(function () {
        history.push("/")
    }).catch(function (error) {
        // An error happened.
    });

}

export {authenticate, singOut, isAuthenticated};