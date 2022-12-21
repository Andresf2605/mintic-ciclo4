import Cookies from "universal-cookie";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Component } from "react";

const cookies = new Cookies();
const url = "https://backend-mysql-ciclo4-production.up.railway.app/api/eventos";
const urlEquipos = "https://backend-mysql-ciclo4-production.up.railway.app/api/equipos";
const urlDeportes = "https://backend-mysql-ciclo4-production.up.railway.app/api/deportes";
const field_id = "/eve_id/";

class PageEventos extends Component {
  state = {
    data: [],
    dataEquipos: [],
    dataDeportes: [],
    esAdmin: false,
    modalInsertar: false,
    modalEliminar: false,
    tipoModal: "",
    form: {
      eve_id: "",
      equ_equipo1: "",
      equ_equipo2: "",
      eve_marca1: "",
      eve_marca2: "",
      dep_id: "",
      eve_descrip: "",
      eve_fecha: "",
    },
  };

  peticionGet = () => {
    axios
      .get(url + "/100")
      .then((response) => {
        //console.log(response.data);
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  peticionGetFiltroDeporte = (idDeporte) => {
    axios
      .get(url + "/all/deporte/" + idDeporte)
      .then((response) => {
        //console.log(response.data);
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  getEquipos = () => {
    axios
      .get(urlEquipos)
      .then((response) => {
        //console.log(response.data);
        this.setState({ dataEquipos: response.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  getDeportes = () => {
    axios
      .get(urlDeportes)
      .then((response) => {
        //console.log(response.data);
        this.setState({ dataDeportes: response.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  peticionPost = async () => {
    delete this.state.form.eve_id; //esto borra el campo usu_id
    await axios
      .post(url, this.state.form)
      .then((response) => {
        this.modalInsertar();
        this.peticionGet();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  peticionPut = () => {
    axios
      .put(url + field_id + this.state.form.eve_id, this.state.form)
      .then((response) => {
        this.modalInsertar();
        this.peticionGet();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  peticionDelete = () => {
    axios
      .delete(url + field_id + this.state.form.eve_id)
      .then((response) => {
        this.modalEliminar();
        this.peticionGet();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  seleccionarEvento = (evento) => {
    this.setState({
      tipoModal: "actualizar",
      form: {
        eve_id: evento.sec,
        equ_equipo1: evento.equi1,
        equ_equipo2: evento.equi2,
        eve_marca1: evento.marca1,
        eve_marca2: evento.marca2,
        dep_id: evento.deporte,
        eve_descrip: evento.detalle,
        // eve_fecha: evento.fecha
      },
    });
  };

  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  };

  modalEliminar = () => {
    this.setState({ modalEliminar: !this.state.modalEliminar });
  };

  handleChange = async (e) => {
    /// función para capturar los datos del usuario. Es en 2do plano debe ser asincrona
    e.persist(); /// y por eso debemos especificar persistencia
    await this.setState({
      /// await regresa la ejecución de la función asincrona despues de terminar
      form: {
        ...this.state.form, /// esta linea sirve para conservar los datos que ya tenia el arreglo
        [e.target.name]: e.target.value, /// los nombres de los imputs deben ser iguales a los del arreglo
      },
    });
    console.log(this.state.form); /// probar por consola lo que se guarda
  };

  //se ejecuta cuando lo realiza
  componentDidMount() {
    this.peticionGet();
    this.getEquipos();
    this.getDeportes();
    if (cookies.get("usu_nombres") === "admin") {
      this.setState({ esAdmin: true });
    } else {
      this.setState({ esAdmin: false });
    }
  }
  render() {
    const form = this.state.form;
    if (cookies.get("usu_nombres")) {
      return (
        <div className="App">
          <div className="contenedorFiltros">
            <button className="filtrosDeporte" onClick={()=>{this.peticionGetFiltroDeporte(1)}}>
              <img src={`./icons/Futbol.png`}></img>
              <h3>Futbol</h3>
            </button>
            <button className="filtrosDeporte"  onClick={()=>{this.peticionGetFiltroDeporte(2)}}>
              <img src={`./icons/Baloncesto.png`}></img>
              <h3>Baloncesto</h3>
            </button>
            <button className="filtrosDeporte"  onClick={()=>{this.peticionGetFiltroDeporte(3)}}>
              <img src={`./icons/Volei.png`}></img>
              <h3>Volei</h3>
            </button>
          </div>
          <br />
          <button
            className="btn btn-success"
            onClick={() => {
              this.setState({ form: null, tipoModal: "insertar" });
              this.modalInsertar();
            }}
          >
            Agregar evento
          </button>
          <br />
          <br />
          <table className="table ">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Equipo</th>
                <th>Marcador</th>
                <th>Equipo</th>
                <th>Deporte</th>
                <th>Detalle</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((evento) => {
                return (
                  <tr key={evento.sec}>
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
                    <td>
                      <button className="btn btn-primary">
                        <FontAwesomeIcon
                          icon={faEdit}
                          onClick={() => {
                            this.seleccionarEvento(evento);
                            this.modalInsertar();
                          }}
                        />
                      </button>{" "}
                      <button
                        className="btn btn-danger"
                        hidden={!this.state.esAdmin}
                      >
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          onClick={() => {
                            this.seleccionarEvento(evento);
                            this.modalEliminar();
                          }}
                        />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <Modal isOpen={this.state.modalInsertar}>
            <ModalHeader style={{ display: "block" }}></ModalHeader>
            <ModalBody>
              <div>
                <label htmlFor="eve_id">ID</label>
                <input
                  className="form-control"
                  type="text"
                  name="eve_id"
                  id="eve_id"
                  readOnly
                  onChange={this.handleChange}
                  value={form ? form.eve_id : this.state.data.length + 1}
                ></input>
                <br />
                <label htmlFor="equ_equipo1">Equipo1: </label>
                <select
                  className="form-control"
                  name="equ_equipo1"
                  id="equ_equipo1"
                  onChange={this.handleChange}
                  value={form ? form.equ_equipo1 : ""}
                >
                  {this.state.dataEquipos.map((equipos) => {
                    return (
                      <option value={equipos.equ_id}>
                        {equipos.equ_nombre}
                      </option>
                    );
                  })}
                </select>
                {/* <input className="form-control" type="text" name="eve_equipo1" id="eve_equipo1" onChange={this.handleChange} value={form ? form.eve_equipo1 : ''}></input> */}
                <br />
                <label htmlFor="equ_equipo2">Equipo2</label>
                <select
                  className="form-control"
                  name="equ_equipo2"
                  id="equ_equipo2"
                  onChange={this.handleChange}
                  value={form ? form.equ_equipo2 : ""}
                >
                  {this.state.dataEquipos.map((equipos) => {
                    return (
                      <option value={equipos.equ_id}>
                        {equipos.equ_nombre}
                      </option>
                    );
                  })}
                </select>
                {/* <input className="form-control" type="text" name="eve_equipo2" id="eve_equipo2" onChange={this.handleChange} value={form ? form.eve_equipo2 : ''}></input> */}
                <br />
                <label htmlFor="eve_marca1">Marcador1</label>
                <input
                  className="form-control"
                  type="text"
                  name="eve_marca1"
                  id="eve_marca1"
                  onChange={this.handleChange}
                  value={form ? form.eve_marca1 : ""}
                ></input>
                <br />
                <label htmlFor="eve_marca2">Marcador2</label>
                <input
                  className="form-control"
                  type="text"
                  name="eve_marca2"
                  id="eve_marca2"
                  onChange={this.handleChange}
                  value={form ? form.eve_marca2 : ""}
                ></input>
                <br />
                <label htmlFor="eve_deporte">Deporte</label>
                <select
                  className="form-control"
                  name="dep_id"
                  id="dep_id"
                  onChange={this.handleChange}
                  value={form ? form.dep_id : ""}
                >
                  {this.state.dataDeportes.map((deporte) => {
                    return (
                      <option value={deporte.dep_id}>
                        {deporte.dep_nombre}
                      </option>
                    );
                  })}
                </select>
                {/* <input className="form-control" type="text" name="eve_deporte" id="eve_deporte" onChange={this.handleChange} value={form ? form.eve_deporte : ''}></input> */}
                <br />
                <label htmlFor="eve_descripcion">Descripción</label>
                <input
                  className="form-control"
                  type="text"
                  name="eve_descrip"
                  id="eve_descrip"
                  onChange={this.handleChange}
                  value={form ? form.eve_descrip : ""}
                ></input>
                <br />
                <label htmlFor="eve_fecha">Fecha</label>
                <input
                  className="form-control"
                  type="date"
                  name="eve_fecha"
                  id="eve_fecha"
                  onChange={this.handleChange}
                  value={form ? form.eve_fecha : ""}
                ></input>
                <br />
              </div>
            </ModalBody>
            <ModalFooter>
              {this.state.tipoModal === "insertar" ? (
                <button
                  className="btn btn-success"
                  onClick={() => this.peticionPost()}
                >
                  Insertar
                </button>
              ) : (
                <button
                  className="btn btn-success"
                  onClick={() => this.peticionPut()}
                >
                  Modificar
                </button>
              )}
              <button
                className="btn btn-danger"
                onClick={() => this.modalInsertar()}
              >
                Cancelar
              </button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={this.state.modalEliminar}>
            <ModalBody>¿Estas seguro que deseas eliminar?</ModalBody>
            <ModalFooter>
              <button
                className="btn btn-danger"
                onClick={() => this.peticionDelete()}
              >
                Si
              </button>
              <button
                className="btn btn-success"
                onClick={() => this.modalEliminar()}
              >
                No
              </button>
            </ModalFooter>
          </Modal>
        </div>
      );
    } else {
      // this.setState({estaLoguin:false})
      window.location.href = "./PageLogin"; /// redirigir al inicio
    }
  }
}
export default PageEventos;
