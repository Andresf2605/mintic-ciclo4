import { Component } from "react";
import Menu from "./components/Menu.js"
import MenuInicial from "./components/MenuInicial"
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import PageDeportes from "./components/PageDeportes.js"
import PageEventos from "./components/PageEventos.js"
import PageEquipos from "./components/PageEquipos.js"
import PageInicio from "./components/PageInicio.js"
import PageLogin from "./components/PageLogin.js"
import PageLogout from "./components/PageLogout.js"
import PageUsuarios from "./components/PageUsuarios.js"
import PageRegistro from "./components/PageRegistro.js"

class App extends Component {
  render() {
    return <div>
      {/* <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<PageInicio />}/>
          <Route path="/PageInicio" element={<PageInicio />}/>
          <Route path="/PageDeportes" element={<PageDeportes />}/>
          <Route path="/PageEquipos" element={<PageEquipos />}/>
          <Route path="/PageEventos" element={<PageEventos />}/>
          <Route path="/PageLogin" element={<PageLogin />}/>
          <Route path="/PageUsuarios" element={<PageUsuarios />}/>
        </Routes>
      </Router> */}

<Router>
        <MenuInicial />
        <Routes>
          <Route path="/" element={<PageInicio />}/>
          <Route path="/PageInicio" element={<PageInicio />}/>
          <Route path="/PageLogin" element={<PageLogin />}/>
          <Route path="/PageLogout" element={<PageLogout />}/>
          <Route path="/PageEventos" element={<PageEventos />}/>
          <Route path="/PageUsuarios" element={<PageUsuarios />}/>
          <Route path="/PageDeportes" element={<PageDeportes />}/>
          <Route path="/PageEquipos" element={<PageEquipos />}/>
          <Route path="/PageRegistro" element={<PageRegistro />}/>
        </Routes>
      </Router>
    </div>;
  }
}

export default App;
