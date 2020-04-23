import React, { Component } from "react";
import { singOut } from "../../../services/auth";
import Cookie from "js-cookie";

class Home extends Component {
  userName = Cookie.getJSON("user");

  render() {
    return (
      <div className="container-fluid p-0">
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <a className="navbar-brand" href={"_blank"}>
            Car Match{" "}
          </a>
          <div className="navbar-nav ml-auto">
            <div className="navbar-brand justify-content-between">
              {this.userName}
            </div>
            <button
              className="btn btn-outline-light"
              onClick={() => {
                singOut();
              }}
            >
              Sair
            </button>
          </div>
        </nav>
      </div>
    );
  }
}

export default Home;
