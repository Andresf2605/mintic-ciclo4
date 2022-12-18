import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/js/dist/collapse'
import 'bootstrap/js/dist/offcanvas'
import 'bootstrap/js/dist/dropdown'
import { Component } from "react";
import { Link } from "react-router-dom";

class Menu extends Component{
    render(){
        return <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand text-light" to={"/"}>
          <img src="./icons/icons8-trofeo-100.png" alt="Logo de trofeo" width={70}></img>
          </Link>
          <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon text-light"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active text-light" to={"/"}>Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to={"/PageLogin"}>Inicio sesión</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to={"/PageUsuarios"}>Usuarios</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to={"/PageEventos"}>Eventos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to={"/PageDeportes"}>Deportes</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to={"/PageEquipos"}>Equipos</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    }
}
export default Menu;
