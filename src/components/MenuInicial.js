import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/js/dist/collapse'
import 'bootstrap/js/dist/offcanvas'
import 'bootstrap/js/dist/dropdown'
import { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie'
const cookies = new Cookies();

class MenuInicial extends Component{
  state={
    estaLogin: false,
    esAdmin:false
  }
  componentDidMount(){
    if(cookies.get("usu_nombres") === "admin"){
      this.setState({esAdmin:true})
    }else{
      this.setState({esAdmin:false})

    }
    if(cookies.get("usu_nombres")){
        this.setState({estaLogin:true})
    }else{
        this.setState({estaLogin:false})
       // window.location.href="./" /// redirigir al inicio
    }
  }

  cerrarSesion(){
    cookies.remove("usu_id",{path:"/"})
    cookies.remove("usu_email",{path:"/"})
    cookies.remove("usu_nombres",{path:"/"})
    cookies.remove("usu_apellidos",{path:"/"})
    //window.location.href="./"
    this.setState({estaLogin:false})
  }
    render(){
        return <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand text-light" to={"/"}>
          <img src="./icons/icons8-trofeo-100.png" alt="asdas" width={70}></img>
          </Link>
          <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon text-light"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active text-light" to={"/"}>Inicio</Link>
              </li>
              <li className="nav-item" hidden={this.state.estaLogin}>
                <Link className="nav-link text-light" to={"/PageLogin"}>Inicio sesión</Link>
              </li>
              
              <li className="nav-item" hidden={!this.state.estaLogin}>
                <Link className="nav-link text-light" aria-current="page" to='/PageEventos'>Eventos</Link>
              </li>
              <li className="nav-item" hidden={!this.state.esAdmin}>
                <Link className="nav-link text-light" aria-current="page" to='/PageUsuarios'>Usuarios</Link>
              </li>
              <li className="nav-item" hidden={!this.state.estaLogin}>
                <Link className="nav-link text-light" onClick={()=>this.cerrarSesion()} to='/'>Salir</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    }
}
export default MenuInicial;
