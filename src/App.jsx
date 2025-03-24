import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import './App.css';
import Inicio from "./views/Inicio";
import Encabezado from "./components/encabezado/Encabezado";
import Clientes from "./views/Clientes";
import Producto from "./views/Productos";
import Categorias from "./views/Categorias";

const App = () => {
  return (
    <Router>
        <Encabezado/>
     <main   className="margen-superior-main">
     <Routes>

<Route path="/" element={<Login />} />
<Route path="/inicio" element={<Inicio />} />
<Route path="/clientes" element={<Clientes/>} />
<Route path="/Producto" element={<Producto/>} />
<Route path="/Categorias" element={<Categorias/>} />


</Routes>
     </main>
    </Router>
  );
};

export default App;