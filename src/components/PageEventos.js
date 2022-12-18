import { Component } from "react";
import Cookies from 'universal-cookie'
const cookies = new Cookies();
class PageEventos extends Component{
 
    render(){
        if(cookies.get("usu_nombres")){
            return <h1>Pagina de Eventos</h1>
        }else{
            // this.setState({estaLoguin:false})
           window.location.href="./PageLogin" /// redirigir al inicio
        }
    }
}

export default PageEventos;