import React, { useState, useEffect } from 'react';
import TablaClientes from '../components/clientes/TablaClientes';
import ModalRegistroCliente from '../components/clientes/ModalRegistroCliente';
import { Container, Button, Row, Col } from "react-bootstrap";
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas.jsx';

const Clientes = () => {
  const [listaClientes, setListaClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: '',
    apellido: '',
    celular: '',
    direccion: '',
    cedula: ''
  });
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  // Obtener lista de clientes
  const obtenerClientes = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/clientes');
      if (!respuesta.ok) {
        throw new Error('Error al cargar los clientes');
      }
      const datos = await respuesta.json();
      setListaClientes(datos);
      setClientesFiltrados(datos);
    } catch (error) {
      setErrorCarga(error.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerClientes();
  }, []);

  // Manejar cambios en los inputs del modal
  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoCliente((prev) => ({ ...prev, [name]: value }));
  };

  // Agregar un nuevo cliente
  const agregarCliente = async () => {
    const { nombre, apellido, celular, cedula } = nuevoCliente;
    if (!nombre || !apellido || !celular || !cedula) {
      setErrorCarga("Por favor, completa todos los campos obligatorios.");
      return;
    }

    try {
      const respuesta = await fetch('http://localhost:3000/api/registrarclientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoCliente),
      });

      if (!respuesta.ok) {
        const errorData = await respuesta.json();
        throw new Error(errorData.mensaje || 'Error al agregar el cliente');
      }

      await obtenerClientes(); // Refrescar lista
      setNuevoCliente({ nombre: '', apellido: '', celular: '', direccion: '', cedula: '' });
      setMostrarModal(false);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  // Manejar búsqueda
  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtrados = listaClientes.filter((cliente) =>
      [cliente.nombre, cliente.apellido, cliente.celular, cliente.cedula, cliente.direccion || '']
        .some((campo) => campo.toLowerCase().includes(texto))
    );
    setClientesFiltrados(filtrados);
  };

  return (
    <Container className="mt-5">
      <h4>Clientes</h4>
      <Row>
        <Col lg={2} md={4} sm={4} xs={5}>
          <Button
            variant="primary"
            onClick={() => setMostrarModal(true)}
            style={{ width: "100%" }}
          >
            Nuevo Cliente
          </Button>
        </Col>
        <Col lg={5} md={8} sm={8} xs={7}>
          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={manejarCambioBusqueda}
          />
        </Col>
      </Row>
      <br /><br />
      <TablaClientes
        clientes={clientesFiltrados}
        cargando={cargando}
        error={errorCarga}
      />
      <ModalRegistroCliente
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoCliente={nuevoCliente}
        manejarCambioInput={manejarCambioInput}
        agregarCliente={agregarCliente}
        errorCarga={errorCarga}
      />
    </Container>
  );
};

export default Clientes;