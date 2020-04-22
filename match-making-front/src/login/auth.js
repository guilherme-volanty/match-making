import * as firebase from "firebase";
import "firebase/auth";
import Cookies from "js-cookie";

let errorLogin = true;
let errorMessage = "";

function isVolantyEmailDomain(user) {
  return user.email.match(/.*@volanty.com$/);
}

function setErrorLoginMessage() {
  errorLogin = false;
  errorMessage =
    "Não é possivel acessar a plataforma com emails que não sejam do domínio @volanty";
}

//Função de autenticação chamada no onclick do botão google authenticated.
function authenticate(redirect) {
  //TODO: colocar umm redirect de sucesso, outro de erro
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("profile");
  provider.addScope("email");

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      const user = result.user;
      setCookies(result);

      // restringir o dominio volanty.
      if (!isVolantyEmailDomain(user)) {
        setErrorLoginMessage();
        firebase
          .auth()
          .currentUser.delete()
          .then(() => {});
        // setRoute("login");
      } else {
        findUserByEmail(user.email)
          .then((response) => {
            if (response.empty) {
              insert(user);
              redirect();
              // setRoute("home");
            } else {
              redirect();
              updateUser(response);
              // setRoute("home");
            }
          })
          .catch((reason) => {
            // TODO Erro exibir o motivo
          });
      }
    })
    .catch(function (error) {
      // TODO Erro ao criar usuário
    });
}

function setCookies(authenticateResponse) {
  Cookies.set("user", authenticateResponse.user.displayName);
  Cookies.set("email", authenticateResponse.user.email);
  Cookies.set("photo", authenticateResponse.user.photoURL);
  Cookies.set("token", authenticateResponse.credential.idToken);
}

async function findUserByEmail(email) {
  const db = firebase.firestore();
  db.settings({
    timestampsInSnapshots: true,
  });
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
function insert(user) {
  const db = firebase.firestore();
  db.settings({
    timestampsInSnapshots: true,
  });

  db.collection("users")
    .add({
      user: user.displayName,
      email: user.email,
      createdAt: new Date(user.metadata.creationTime),
      lastSignInTime: new Date(user.metadata.lastSignInTime),
    })
    .then((response) => {
      Cookies.set("documentUserId", response.id);
      console.log("Usuário Cadastrado", response.id);
    })
    .catch(function (error) {
      //    TODO mensagem de erro ao inserir
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
    })
    .then()
    .catch((reason) => {
      console.log(reason);
    });
}

//verifica se existi o token
function isAuthenticated() {
  return Cookies.get("token") != null;
}

// faz logOut e apaga o id do cookie
function singOut() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      Cookies.remove("token");
    })
    .catch(function (error) {
      // An error happened.
    });
}

export { authenticate, singOut, isAuthenticated, errorLogin, errorMessage };
