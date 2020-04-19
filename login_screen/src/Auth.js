import * as firebase from "firebase";
import 'firebase/auth';
import Cookies from 'js-cookie';
import {history} from "./history";

let errorLogin = true;
let errorMessage = '';

function setRoute(route) {
    history.push(route);
}

function isVolantyEmailDomain(user) {
    return !user.email.match(/.*@volanty.com$/);
}

function setErrorLoginMessage() {
    errorLogin = false;
    errorMessage = "Não é possivel acessar a plataforma com emails que não sejam do domínio @volanty";
}

//Função de autenticação chamada no onclick do botão google authenticated.
function authenticate() {

    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    firebase.auth().signInWithPopup(provider).then(function (result) {
        const user = result.user;
        setCookies(result);

        // restringir o dominio volanty.
        if (isVolantyEmailDomain(user)) {
            setErrorLoginMessage();
            firebase.auth().currentUser.delete().then(response => {});
            setRoute("login");
        } else {
            findUserByEmail(user.email).then(response => {
                if (response.empty) {
                    insert(user);
                    setRoute("home");
                } else {
                    updateUser(response);
                    setRoute("home");
                }
            }).catch(reason => {
                console.log(reason);
            })
        }
    }).catch(function (error) {
        alert("Erro ao criar usuário :" + error);
    });
}

function setCookies(authenticateResponse) {
    console.log(authenticateResponse);
    Cookies.set("user", authenticateResponse.user.displayName);
    Cookies.set("email", authenticateResponse.user.email);
    Cookies.set("photo", authenticateResponse.user.photoURL);
    Cookies.set("idToken", authenticateResponse.credential.idToken);

}

async function findUserByEmail(email) {
    const db = firebase.firestore();
    db.settings({
        timestampsInSnapshots: true
    });
    const database = db.collection('users').where('email', '==', email);

    return await database.get().then(function (querySnapshot) {
        return querySnapshot;
    }).catch(error => {
        return error
    })
}

//função para inserir dados no firestore
function insert(user) {
    const db = firebase.firestore();
    db.settings({
        timestampsInSnapshots: true
    });

    db.collection('users').add({
        user: user.displayName,
        email: user.email,
        createdAt: new Date(user.metadata.creationTime),
        lastSignInTime: new Date(user.metadata.lastSignInTime)
    }).then(response => {
        console.log(response);
        // setCookies(response);

        console.log("Usuário Cadastrado", response.id)
        }
    ).catch(function (error) {
        alert("Erro ao inserir :" + error);
    });
}

function updateUser(user) {
    const db = firebase.firestore();
    const database = db.collection("users");

    database.doc(user.docs[0].id).update({
        lastSignInTime: new Date()
    }).then(response => console.log(response))
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

export {authenticate, singOut, isAuthenticated, errorLogin, errorMessage};