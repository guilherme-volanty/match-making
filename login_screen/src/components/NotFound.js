import React, {Component} from "react";
import './NotFound.css'
import imagemErro from '../assets/imagemErro.jpg'
import {history} from "../history";



class NotFound extends Component {
    render() {
        return (
            <div className="notfound" >

                <div className=" ">
                  <h1 className="number">404</h1>
                  <h1 className="msg">Página não encontrada</h1>
                    <div>
                        <img src={imagemErro} alt="Imagem de Erro 404"/>
                        </div>
                </div>
                <button className="btn btn-primary" onClick={() => {redirect()}}>Página inicial</button>
            </div>
        );
    }
}
 function redirect () {
     history.push("/Home")
 }
export default NotFound;
