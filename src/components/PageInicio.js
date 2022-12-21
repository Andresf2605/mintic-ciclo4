import React, { Component } from "react";
import Cookies from "universal-cookie";
import axios from "axios"; //
import "bootstrap/dist/css/bootstrap.min.css"; //
import "../css/PageInicio.css";
import { Link } from "react-router-dom";

const urlEventos = "https://backend-mysql-ciclo4-production.up.railway.app/api/eventos/5";
const cookies = new Cookies();

class PageInicio extends Component {
  state = {
    data: [],
    estaLogin: false,
  };

  peticionGet = () => {
    axios
      .get(urlEventos)
      .then((response) => {
        //console.log(response.data);
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  componentDidMount() {
    this.peticionGet();
    if (cookies.get("usu_nombres")) {
      this.setState({ estaLogin: true });
    } else {
      this.setState({ estaLogin: false });
    }
  }

  render() {
    return (
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover table-without-margin">
          <thead>
            <tr className="tdCenter">
              <th>Fecha</th>
              <th>Equipo1</th>
              <th>Marcador</th>
              <th>Equipo2</th>
              <th>Deporte</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((evento) => {
              return (
                <tr key={evento.sec} className="tdCenter">
                  <td>{evento.fecha}</td>
                  <td>{evento.equi1}</td>
                  <td>
                    {evento.marca1} - {evento.marca2}
                  </td>
                  <td>{evento.equi2}</td>
                  <td>
                    {evento.deporte}{" "}
                    <img
                      src={`./icons/${evento.deporte}.png`}
                      alt="asdas"
                      width={30}
                    ></img>{" "}
                  </td>
                  <td>{evento.detalle}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div hidden={this.state.estaLogin}>
          <img className="banner" src="./icons/Findy.webp"></img>
          <button className="register-button">
            <Link className="nav-link" aria-current="page" to="/PageRegistro">
              Registrarme!
            </Link>
          </button>
        </div>
      </div>
    );
  }
}

export default PageInicio;
