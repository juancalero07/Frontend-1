import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Image } from "react-bootstrap";
import Portada from "../assets/wallhaven-nmpev9.jpg";
import Proposito from "../components/inicio/Proposito";

const Inicio = () => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const navegar = useNavigate();

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (!usuarioGuardado) {
      navegar("/");
    } else {
      setNombreUsuario(usuarioGuardado);
    }
  }, [navegar]);

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("contraseña");
    navegar("/");
  };

  return (
    <Container>
      <br />
    <h1 className="text-center m-4">¡Bienvenido, {nombreUsuario}!</h1>
<Image src={Portada} fluid rounded/>
<Proposito />

      <h1>¡Bienvenido, {nombreUsuario}!</h1>
      <p>Estás en la página de inicio.</p>
      <button onClick={cerrarSesion}>Cerrar Sesión</button>
    </Container>
  );
};

export default Inicio;