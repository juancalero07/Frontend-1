import React from 'react';
import { useRef } from "react";
import { Card, Button } from "react-bootstrap";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Line } from 'react-chartjs-2';

const VentasPorMes = ({ meses, totales_por_mes }) => {

  const chartRef = useRef(null);
  // Define chart data
  const data = {
    labels: meses, // Array of months (e.g., ['Enero', 'Febrero', ...])
    datasets: [
      {
        label: 'Ventas por Mes',
        data: totales_por_mes, // Array of sales totals (e.g., [1000, 2000, ...])
         backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
        borderWidth: 1,
      },
    ],
  };

  // Define chart options
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Total Ventas',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Meses',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };
  const generarPDF = ( ) => {
    const doc = new jsPDF( );

    // Encabezado
    doc.setFillColor(28, 41, 51);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), 30, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text("Reporte de Ventas por Mes", doc.internal.pageSize.getWidth() / 2, 20, { align: "center" });

    // Capturar gráfico como imagen
    const chartInstance = chartRef.current;
    const chartCanvas = chartInstance ?. canvas;
    const chartImage = chartCanvas ?. toDataURL("image/png", 1.0);

    if (chartImage) {
    doc.addImage(chartImage, "PNG", 14, 40, 180, 100);

    }

    // Tabla de datos
    const columnas = ["Mes", "Ventas (C$)"];
    const filas = meses.map((mes, index) => [mes, totales_por_mes[index]]);

    autoTable(doc, {
    head: [columnas],
    body: filas,
    startY: 150,
    theme: "grid",
    styles: { fontSize: 10, cellPadding: 2 },
    margin: { top: 20, left: 14, right: 14 },
    });
    // Generar un nombre dinamico para el archivo PDF
    const fecha = new Date( );
    const dia = String(fecha.getDate( )).padStart(2, '0');
    const mes = String(fecha.getMonth() +1).padStart(2,'0');
    const anio = fecha.getFullYear( );
    const nombreArchivo = 'VentasPorMes_${dia}${mes}${anio}.pdf';

    // Guardar PDF
    doc.save(nombreArchivo);
    };


  return (
    <Card>
      <Card.Body>
        <Card.Title>Ventas por Mes</Card.Title>
        <Line ref={chartRef} data={data} options={options} />
        <Button className="btn btn-primary mt-3" onClick={generarPDF}>
        Generar Reporte <i className="bi bi-download"></i>
        </Button>

      </Card.Body>
    </Card>

    
  );
};

export default VentasPorMes;