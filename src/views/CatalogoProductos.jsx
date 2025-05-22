import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Tarjeta from '../components/catalogo/Tarjeta';
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas';

const CatalogoProductos = () => {
  const [listaProductos, setListaProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 6; // Number of products per page

  // Fetch products
  const obtenerProductos = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/productos');
      if (!respuesta.ok) throw new Error('Error al cargar los productos');
      const datos = await respuesta.json();
      setListaProductos(datos);
      setProductosFiltrados(datos); // Initialize filtered products
      setCargando(false);
    } catch (error) {
      setErrorCarga(error.message);
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  // Handle search input changes
  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    setPaginaActual(1); // Reset to first page on search

    const filtrados = listaProductos.filter(
      (producto) =>
        producto.nombre_producto.toLowerCase().includes(texto) ||
        producto.descripcion_producto.toLowerCase().includes(texto)
    );
    setProductosFiltrados(filtrados);
  };

  // Calculate paginated products
  const productosPaginados = productosFiltrados.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );

  // Calculate total pages
  const totalPaginas = Math.ceil(productosFiltrados.length / elementosPorPagina);

  // Handle page change
  const manejarCambioPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  if (cargando) return <div>Cargando...</div>;
  if (errorCarga) return <div>Error: {errorCarga}</div>;

  return (
    <Container className="mt-5">
      <h4>Catálogo de Productos</h4>
      <Row className="mb-4">
        <Col lg={5} md={8} sm={8} xs={12}>
          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={manejarCambioBusqueda}
          />
        </Col>
      </Row>
      <Row>
        {productosPaginados.map((producto, indice) => (
          <Tarjeta
            key={producto.id_producto}
            indice={indice}
            nombre_producto={producto.nombre_producto}
            descripcion_producto={producto.descripcion_producto}
            precio_unitario={producto.precio_unitario}
            stock={producto.stock}
            id_categoria={producto.id_categoria}
            imagen={producto.imagen}
          />
        ))}
      </Row>
      {/* Pagination Controls */}
      <Row className="mt-4">
        <Col className="d-flex justify-content-center">
          <Button
            variant="outline-primary"
            className="mx-1"
            disabled={paginaActual === 1}
            onClick={() => manejarCambioPagina(paginaActual - 1)}
          >
            Anterior
          </Button>
          {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
            <Button
              key={num}
              variant={paginaActual === num ? 'primary' : 'outline-primary'}
              className="mx-1"
              onClick={() => manejarCambioPagina(num)}
            >
              {num}
            </Button>
          ))}
          <Button
            variant="outline-primary"
            className="mx-1"
            disabled={paginaActual === totalPaginas}
            onClick={() => manejarCambioPagina(paginaActual + 1)}
          >
            Siguiente
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CatalogoProductos;