// Importaciones necesarias para el componente visual
import React from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Declaración del componente TablaCategorias que recibe props
const TablaUsuarios = ({ Usuarios, cargando, error }) => {
  // Renderizado condicional según el estado recibido por props
  if (cargando) {
    return <div>Cargando Usuarios...</div>; // Muestra mensaje mientras carga
  }
  if (error) {
    return <div>Error: {error}</div>;         // Muestra error si ocurre
  }

  // Renderizado de la tabla con los datos recibidos
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID Usuarios</th>
          <th>Usuarios</th>
          <th>Contraseña</th>
        </tr>
      </thead>
      <tbody>
        {Usuarios.map((Usuarios) => (
          <tr key={Usuarios.id_usuario}>
            <td>{Usuarios.id_usuario}</td>
            <td>{Usuarios.usuario}</td>
            <td>{Usuarios.contraseña}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

// Exportación del componente
export default TablaUsuarios;
