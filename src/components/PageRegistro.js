import React, { Component } from "react";
import "../css/Registro.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from "axios";


const url = "https://backend-mysql-ciclo4-production.up.railway.app/api/usuarios";

class PageRegistro extends Component {
  state = {
    modalExitoso:false,
    form: {
      usu_email: "",
      usu_clave: "",
      usu_nombres: "",
      usu_apellidos: "",
    },
  };

  handleChange = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
    //console.log(this.state.form)
  };

//   iniciarSesion = async () => {
//     let name = this.state.form.username;
//     let pwd = this.state.form.password;
//     if (name.length <= 0 || pwd.length <= 0) {
//       alert("Se requieren todos los datos");
//       return "Datos Vacios";
//     }
// }
modalExitoso = () =>{
    this.setState({modalExitoso:!this.state.modalExitoso})
  }
  cerrarModal=()=>{
      window.location.href="./PageLogin"
  }
    peticionPost = async () => {
    //   delete this.state.form.usu_id; //esto borra el campo usu_id
      await axios
        .post(url, this.state.form)
        .then((response) => {
          this.modalExitoso();
        //   this.peticionGet();
        })
        .catch((error) => {
          console.log(error.message);
        });
    };

    // await axios
    //   .get(urlLogin + "/" + name + "/" + pwd)
    //   .then((response) => {
        // console.log(response.data)
        // return response.data;
    //   })
    //   .then((response) => {
        // if (response.length > 0) {
        //   var resp = response[0]; // para evitar llamados tan largos con corchetes
        //   cookies.set("usu_id", resp.usu_id, { path: "/" }); /// el path es para que se puedan acceder de cualquier pagina
    //       cookies.set("usu_email", resp.usu_email, { path: "/" });
    //       cookies.set("usu_nombres", resp.usu_nombres, { path: "/" });
    //       cookies.set("usu_apellidos", resp.usu_apellidos, { path: "/" });
    //       alert("Bienveni@ " + resp.usu_nombres);

    //       window.location.href = "./";
    //     } else {
    //       alert("Verificar Usario y/o Clave");
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
//   };

  render() {
    return (
      <div className="pantalla_login">
        <div className="containerPrincipal">
          <div className="containerSecundario">
            <div className="form-group">
              <label>Usuario: </label>
              <br />
              <input
                type="text"
                className="form-control inputLogin"
                name="usu_email"
                onChange={this.handleChange}
              />
              <br />
              <label>Contraseña: </label>
              <br />
              <input
                type="password"
                className="form-control inputLogin"
                name="usu_clave"
                onChange={this.handleChange}
              />
              <br />
              <label>Nombres: </label>
              <br />
              <input
                type="text"
                className="form-control inputLogin"
                name="usu_nombres"
                onChange={this.handleChange}
              />
              <br />
              <label>Apellidos: </label>
              <br />
              <input
                type="text"
                className="form-control inputLogin"
                name="usu_apellidos"
                onChange={this.handleChange}
              />
              <br />
              <button
                className="btn btn-primary botonLogin"
                onClick={() => this.peticionPost()}
              >
                Registrarse
              </button>
            </div>
          </div>
        </div>
        <Modal isOpen={this.state.modalExitoso}>
          <ModalBody>
            Tu usuario se ha creado con exito!!
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-success" onClick={()=> this.cerrarModal()} >Ok</button>
            {/* <button className="btn btn-success" onClick={()=> this.modalEliminar()} >No</button> */}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default PageRegistro;
