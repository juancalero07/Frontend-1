import React, { useState, useEffect } from 'react';
import TablaUsuarios from '../components/usuario/TablaUsuarios'; // Importa el componente de tabla
import { Container  ,Row ,Col} from "react-bootstrap";
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas.jsx';
// Declaración del componente Ventas
const Usuarios = () => {
  // Estados para manejar los datos, carga y errores
  const [listaUsuarios, setListaUsuarios] = useState([]); // Almacena los datos de la API
  const [cargando, setCargando] = useState(true);     // Controla el estado de carga
  const [errorCarga, setErrorCarga] = useState(null); // Maneja errores de la petición
   
    const [categoriasFiltradas, setCategoriasFiltradas] = useState([]);
    const [textoBusqueda, setTextoBusqueda] = useState("");
    
    
  // Lógica de obtención de datos con useEffect
  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const respuesta = await fetch('http://localhost:3000/api/usuarios'); // Ruta ajustada al controlador
        if (!respuesta.ok) {
          throw new Error('Error al cargar las usuarios');
        }
        const datos = await respuesta.json();
        setListaUsuarios(datos);    // Actualiza el estado con los datos
        setCargando(false);       // Indica que la carga terminó
      } catch (error) {
        setErrorCarga(error.message); // Guarda el mensaje de error
        setCargando(false);       // Termina la carga aunque haya error
      }
    };
    obtenerUsuarios();            // Ejecuta la función al montar el componente
  }, []);                       // Array vacío para que solo se ejecute una vez

  // Renderizado de la vista
  return (
    <>
      <Container className="mt-5">
        <br />
        <h4>Usuarios</h4>

        {/* Pasa los estados como props al componente TablaVentas */}
        <TablaUsuarios
          Usuarios={listaUsuarios}
          cargando={cargando}
          error={errorCarga}
        />
      </Container>
    </>
  );
};

// Exportación del componente
export default Usuarios;
