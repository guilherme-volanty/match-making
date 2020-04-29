import firebase from "firebase/app";
import "firebase/app"
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import "firebase/firestore";

import Cookies from "js-cookie";

let errorLogin;
let errorMessage;

function isVolantyEmailDomain(user) {
    return user.email.match(/.*@volanty.com$/);
}

// TODO Acertar retorno de erro do login
function setErrorLoginMessage() {
    errorLogin = false;
    errorMessage = "Não é possivel acessar a plataforma com emails que não sejam do domínio @volanty";
}

function loginMatch(redirect) {
    authenticate().then(auth => {
            !isVolantyEmailDomain(auth.user)
                ? deleteAuthUser()
                : insertOrUpdate(auth.user).then(value => {
                    value === true ? redirect() : setErrorLoginMessage()
                })
        }
    ).catch(reason => {
            console.log(reason)
        }
    )
}

async function authenticate() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");

    return await firebase
        .auth()
        .signInWithPopup(provider).then(resultAuth => {
                return resultAuth;
            }
        ).catch(reason => {
                return reason
            }
        )
}

async function insertOrUpdate(user) {
    let responseInsertOrUpdate;
    return await findUserByEmail(user.email).then((findUserByEmailResponse) => {
        if (findUserByEmailResponse.empty) {
            insert(user).then(insertResponse => {
                    Cookies.set("documentUserId", insertResponse.id);
                    setCookies(user);
                    responseInsertOrUpdate = true
                }
            ).catch(reason => {
                console.log("Cannot Insert User : %s", reason)
                responseInsertOrUpdate = false
            });
        } else {
            setCookies(user);
            updateUser(findUserByEmailResponse);
            responseInsertOrUpdate = true
        }
        return responseInsertOrUpdate;
    }).catch(reason => {
        return responseInsertOrUpdate = false;
    }).finally(() => {
        return responseInsertOrUpdate;
    });
}

function deleteAuthUser() {
    firebase
        .auth()
        .currentUser.delete()
        .then(() => {
        });
}

function setCookies(user) {
    Cookies.set("user", user.displayName);
    Cookies.set("email", user.email);
    Cookies.set("photo", user.photoURL);
    Cookies.set("token", "tokenIDMock");
}

async function findUserByEmail(email) {
    const db = firebase.firestore();
    const database = db.collection("users").where("email", "==", email);

    return await database
        .get()
        .then(function (querySnapshot) {
            return querySnapshot;
        })
        .catch((error) => {
            return error;
        });
}

//função para inserir dados no firestore
async function insert(user) {
    const db = firebase.firestore();
    return await db.collection("users")
        .add({
            user: user.displayName,
            email: user.email,
            createdAt: new Date(user.metadata.creationTime),
            lastSignInTime: new Date(user.metadata.lastSignInTime),
        })
        .then((response) => {
            return response
        })
        .catch(function (error) {
            return error
        });
}

function updateUser(user) {
    const userDocumentId = user.docs[0].id;
    const db = firebase.firestore();
    const database = db.collection("users");
    Cookies.set("documentUserId", userDocumentId);
    database
        .doc(userDocumentId)
        .update({
            lastSignInTime: new Date(),
        }).then().finally(() => console.log("Updated User")
    )
}

//verifica se existi o token
function isAuthenticated() {
    return Cookies.get("token") != null;
}

// faz logOut e apaga o id do cookie
function singOut() {
    firebase.auth().signOut().then(function () {
        Cookies.remove("token");
    }).catch(function (error) {
        // An error happened.
    });
}

export {authenticate, singOut, isAuthenticated, errorLogin, errorMessage, loginMatch};
