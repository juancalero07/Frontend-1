import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Inicio from "./views/Inicio";
import Encabezado from "./components/encabezado/Encabezado";
import Productos from "./views/Productos";
import Categorias from "./views/Categorias";
import Clientes from "./views/Clientes";
import Ventas from "./views/Ventas";
import Compras from "./views/Compras";
import Usuarios from "./views/Usuarios";
import Empleados from "./views/Empleados";
import Catalogo from "./views/CatalogoProductos";
import Estadisticas from "./views/Estadisticas";
import Dashboard from "./views/Dashboard";
import RutaProtegida from "./components/rutas/RutaProtegida";
import PiePagina from "./components/infopie/PiePagina";
import './App.css';




const App = () => {
  return (
    <Router>
     
      <div  className="app-wrapper">

      <Encabezado/>
      <main className="margen-superior-main">

          <Routes>
 
            <Route path="/" element={<Login />} />
            <Route path="/inicio" element={<Inicio />} />
            
            <Route path="/productos" element={<Productos />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/ventas" element={<Ventas />} />
            <Route path="/compras" element={<Compras />} />
            <Route path="/usuarios" element={<Usuarios/>} />
            <Route path="/empleados" element={<Empleados/>} />
             <Route path="/catalogo" element={<Catalogo/>} />
             <Route path="/estadisticas" element={<Estadisticas/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
         <Route path="/inicio" element={<RutaProtegida vista={<Inicio />} />} />

          </Routes>
      </main>
      
      <PiePagina />
     
      </div>

    </Router>
  );
};

export default App;