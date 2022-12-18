import React, { Component } from 'react'

import axios from "axios";//
import "bootstrap/dist/css/bootstrap.min.css";//
import '../css/PageInicio.css'

const urlEventos = 'http://localhost:9000/api/eventos/5'

class PageInicio extends Component{
   
    state={
        data: [],
    }


    peticionGet = () => {
        axios.get(urlEventos).then(response => {
          //console.log(response.data);
          this.setState({data:response.data})
        }).catch(error => {
          console.log(error.message);
        })
      }

      componentDidMount(){
        this.peticionGet()
      }


    render(){
        return <div className='table-responsive'>
            <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr className='tdCenter'>
            <th>Fecha</th>
            <th>Equipo1</th>            
            <th>Marcador</th>            
            <th>Equipo2</th>
            <th>Deporte</th>            
            <th>Descripción</th>
            
            
          </tr>
        </thead>
        <tbody>
          {this.state.data.map(evento => { 
            return(
                <tr key={evento.sec} className='tdCenter'>
                <td>{evento.fecha}</td> 
                <td>{evento.equi1}</td> 
                <td>{evento.marca1}  - {evento.marca2}</td> 
                <td>{evento.equi2}</td> 
                <td>{evento.deporte} <img src={`./icons/${evento.deporte}.png`} alt="asdas" width={30}></img> </td> 
                <td>{evento.detalle}</td> 
                
              </tr>
            )
          })}
        </tbody>
        </table>
        </div>
    }
}

export default PageInicio