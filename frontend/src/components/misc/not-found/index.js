import React from "react";
import "./styles.css";
import CarErro from "../../../assets/CarErro.png";
import { useHistory } from "react-router-dom";

function NotFound() {
  let history = useHistory();
  return (
    <div className="notfound">
      <div className=" ">
        <h1 className="number">404</h1>
        <h1 className="msg">Página não encontrada</h1>
        <div>
          <img
            className="imgCarErro"
            src={CarErro}
            alt="Imagem para Erro 404"
          />
        </div>
      </div>
      <button
        className="btn btn-primary"
        onClick={() => {
          history.push("/login");
        }}
      >
        Página inicial
      </button>
    </div>
  );
}

export default NotFound;
