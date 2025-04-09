import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroCliente = ({
  mostrarModal,
  setMostrarModal,
  nuevoCliente,
  manejarCambioInput,
  agregarCliente,
  errorCarga,
}) => {
  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Registro de un nuevo Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formNombreCliente">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={nuevoCliente.nombre}
              onChange={manejarCambioInput}
              placeholder="Ingresa el nombre (máx. 20 caracteres)"
              maxLength={20}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formApellidoCliente">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              name="apellido"
              value={nuevoCliente.apellido}
              onChange={manejarCambioInput}
              placeholder="Ingresa el apellido (máx. 20 caracteres)"
              maxLength={20}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCelularCliente">
            <Form.Label>Celular</Form.Label>
            <Form.Control
              type="text"
              name="celular"
              value={nuevoCliente.celular}
              onChange={manejarCambioInput}
              placeholder="Ingresa el celular (máx. 12 caracteres)"
              maxLength={12}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDireccionCliente">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              name="direccion"
              value={nuevoCliente.direccion}
              onChange={manejarCambioInput}
              placeholder="Ingresa la dirección (máx. 50 caracteres)"
              maxLength={50}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCedulaCliente">
            <Form.Label>Cédula</Form.Label>
            <Form.Control
              type="text"
              name="cedula"
              value={nuevoCliente.cedula}
              onChange={manejarCambioInput}
              placeholder="Ingresa la cédula (máx. 20 caracteres)"
              maxLength={20}
              required
            />
          </Form.Group>
          {errorCarga && <div className="text-danger mt-2">{errorCarga}</div>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={agregarCliente}>
          Guardar Cliente
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroCliente;