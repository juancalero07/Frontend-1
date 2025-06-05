import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import VentasPorMes from '../components/graficos/VentasPorMes';
import VentasPorEmpleado from '../components/graficos/VentasPorEmpleado';
import ChatIA from '../components/chat/ChatIA';

const Estadisticas = () => {
  // State variables for chart data
  const [meses, setMeses] = useState([]);
  const [totalesPorMes, setTotalesPorMes] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [totalVentas, setTotalVentas] = useState([]);
  const [mostrarChatModal, setMostrarChatModal] = useState(false); // Estado para el modal

  // Fetch data on component mount
  useEffect(() => {
    cargaVentas();
    cargaVentasPorEmpleado();
  }, []);

  // Method to load sales data by month
  const cargaVentas = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/totalventaspormes');
      const data = await response.json();
      console.log(data); // Inspect the response
      if (data && Array.isArray(data)) {
        setMeses(data.map(item => item.mes));
        setTotalesPorMes(data.map(item => item.total_ventas));
      } else {
        console.error('Invalid data format:', data);
        alert('No se pudieron cargar los datos: formato inválido');
      }
    } catch (error) {
      console.error('Error al cargar ventas:', error);
      alert('Error al cargar ventas: ' + error.message);
    }
  };

  // Method to load sales data by employee
  const cargaVentasPorEmpleado = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/totalventasporempleado');
      const data = await response.json();
      setEmpleados(data.map(item => item.primer_nombre + ' ' + item.primer_apellido));
      setTotalVentas(data.map(item => item.total_ventas));
    } catch (error) {
      console.error('Error al cargar ventas por empleado:', error);
      alert('Error al cargar ventas por empleado: ' + error.message);
    }
  };

  // Render the component
  return (
    <Container className="mt-5">
      <h4>Estadísticas</h4>
      
      <Button 
          variant="primary" 
          className="mb-4"
          onClick={() => setMostrarChatModal(true)}
        >
          Consultar con IA
      </Button>



      <Row className="mt-4">
        <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
          <VentasPorMes meses={meses} totales_por_mes={totalesPorMes} />
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
         <VentasPorEmpleado empleados={empleados} total_ventas={totalVentas} />
         <ChatIA mostrarChatModal={mostrarChatModal} setMostrarChatModal={setMostrarChatModal} />
        </Col>
      </Row>
    </Container>
  );
};

export default Estadisticas;