import * as firebase from "firebase";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

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
            sessionStorage.setItem("isAuthenticated", auth.credential.idToken)
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

function setFirebaseSessionPersistence() {
    return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(function () {
            const provider = new firebase.auth.GoogleAuthProvider()
            return firebase.auth().signInWithPopup(provider)
        });
}

async function authenticate() {
    const authPromise = setFirebaseSessionPersistence()
    return await authPromise.then(resultAuth => {
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
                 responseInsertOrUpdate = true
                }
            ).catch(reason => {
                console.log("Cannot Insert User : %s", reason)
                responseInsertOrUpdate = false
            });
        } else {
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
    setErrorLoginMessage()
    firebase
        .auth()
        .currentUser.delete()
        .then(() => {
        });
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
        database
        .doc(userDocumentId)
        .update({
            lastSignInTime: new Date(),
        }).then().finally(() => console.log("Updated User")
    )
}

//verifica se existi o token
function isAuthenticated() {
    const sessionKey = sessionStorage.getItem("firebase:authUser:" + firebaseConfig.apiKey + ":[DEFAULT]")
    console.log(sessionKey);
    console.log(sessionKey.email);
    const token = sessionStorage.getItem("isAuthenticated")
    return token != null;
}

// faz logOut e apaga o id do cookie
function singOut() {
    firebase.auth().signOut().then(function () {
    }).catch(function (error) {
        // An error happened.
    });
}

export {authenticate, singOut, isAuthenticated, errorLogin, errorMessage, loginMatch};
