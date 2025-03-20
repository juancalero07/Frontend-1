import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Inicio from "./views/Inicio";
import './App.css';
import Encabezado from "./components/encabezado/Encabezado";
import Cliente from "./views/Clientes";
import Producto from "./views/Productos";

const App = () => {
  return (
    <Router>
        <Encabezado/>
     <main   className="margen-superior-main">
     <Routes>

<Route path="/" element={<Login />} />
<Route path="/inicio" element={<Inicio />} />
<Route path="/Cliente" element={<Cliente />} />
<Route path="/Producto" element={<Producto/>} />
</Routes>
     </main>
    </Router>
  );
};

export default App;