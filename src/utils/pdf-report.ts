import { WaterFootprintI } from "../interfaces/WaterFootprint";
import jsPDF from "jspdf";
import "jspdf-autotable";

export const generatePDF = (WFDetails: WaterFootprintI) => {
  const doc = new jsPDF();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Informe de Huella Hídrica", 65, 20);
  doc.setFontSize(12);
  doc.text("ISO 14046-2014", 85, 30);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(
    `Fecha: ${new Date().toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}`,
    20,
    40
  );
  doc.text("Organización responsable: Finca Mangos del Sur S.A.", 20, 50);
  doc.text("Entidad encargada del estudio: WangoTeam", 20, 60);

  // Declaration
  doc.setFont("helvetica", "bold");
  doc.text("Declaración de conformidad con ISO 14046:", 20, 70);
  doc.setFont("helvetica", "normal");
  doc.text(
    "Este informe ha sido elaborado en conformidad con los requisitos establecidos por la norma ISO 14046:2014, la cual establece directrices para la evaluación de la huella hídrica en productos, procesos y organizaciones.",
    20,
    80,
    { maxWidth: 170, align: "justify" }
  );

  // Introduction
  doc.setFont("helvetica", "bold");
  doc.text("Introducción", 20, 100);

  doc.setFont("helvetica", "normal");
  doc.text("Razón del estudio:", 20, 110);
  doc.text(
    "El principal objetivo del estudio es medir y cuantificar el impacto del uso de recursos hídricos en los procesos de cultivo y producción de mangos, desde el riego hasta la cosecha, con el fin de identificar oportunidades de optimización. Además, este informe será utilizado para obtener certificaciones ambientales que fortalezcan la reputación de la empresa en mercados internacionales.",
    20,
    120,
    { maxWidth: 170, align: "justify" }
  );

  doc.setFont("helvetica", "normal");
  doc.text("Aplicaciones previstas:", 20, 150);
  doc.text(
    "Los resultados de este estudio serán empleados para implementar mejoras en las técnicas de riego, con el fin de reducir el consumo de agua y optimizar el rendimiento por hectárea de cultivo. También se utilizarán los resultados como base para solicitar certificaciones internacionales de sostenibilidad hídrica, permitiendo a Finca Mangos del Sur S.A. cumplir con estándares globales de producción responsable, lo que es clave para acceder a mercados que valoran la producción ecológica.",
    20,
    160,
    { maxWidth: 170, align: "justify" }
  );

  doc.setFont("helvetica", "normal");
  doc.text("Público destinatario:", 20, 195);
  doc.text(
    "Este informe está dirigido a los gerentes de sostenibilidad y operaciones de Finca Mangos del Sur S.A., auditores externos responsables de la verificación del cumplimiento normativo, así como a entidades certificadoras que avalen el uso responsable de los recursos hídricos. Asimismo, los resultados del estudio serán compartidos con los compradores internacionales que demandan productos con certificaciones ambientales.",
    20,
    205,
    { maxWidth: 170, align: "justify" }
  );

  // Add a new page
  doc.addPage();

  doc.setFont("helvetica", "bold");
  doc.text("Alcance del Estudio", 20, 20);

  doc.setFont("helvetica", "normal");
  doc.text("Función:", 20, 30);
  doc.text(
    "El estudio se centra en evaluar el uso y el impacto de los recursos hídricos en el cultivo de mangos, desde la etapa de siembra y riego hasta la cosecha y procesamiento preliminar para su distribución y venta. Este análisis abarca tanto el uso directo de agua en el campo como el consumo indirecto en las instalaciones de procesamiento.",
    20,
    40,
    { maxWidth: 170, align: "justify" }
  );

  doc.setFont("helvetica", "normal");
  doc.text("Unidad funcional:", 20, 60);

  doc.text(
    " • Total de producción de mangos: Toneladas (en toneladas o cualquier unidad que utilices).",
    20,
    70,
    { maxWidth: 170 }
  );

  doc.text(" • Resultados de la huella hídrica: m³ de agua por tonelada.", 20, 80, {
    maxWidth: 170,
  });

  doc.setFont("helvetica", "normal");
  doc.text("Límites del sistema:", 20, 95);
  doc.text(
    "El análisis de la huella hídrica cubre las actividades agrícolas desde la extracción del agua para riego hasta la cosecha y la preparación del producto para su transporte. Se incluyen las fuentes de agua utilizadas (subterránea y superficial), las técnicas de riego (aspersión, goteo), y los procesos de mantenimiento de los cultivos. No se consideran en esta fase del estudio los procesos de transporte y distribución, ya que se centran en el análisis de los procesos dentro de la finca.",
    20,
    105,
    { maxWidth: 170, align: "justify" }
  );

  doc.setFont("helvetica", "normal");
  doc.text("Criterios de corte:", 20, 140);
  doc.text(
    "Se excluyen de este análisis los impactos relacionados con la fabricación y mantenimiento de equipos agrícolas, el transporte fuera de la finca y el empaquetado de los mangos para su exportación.",
    20,
    150,
    { maxWidth: 170, align: "justify" }
  );

  doc.setFont("helvetica", "normal");
  doc.text("Etapas del ciclo de vida:", 20, 170);
  doc.text(
    "Las etapas cubiertas incluyen la extracción de agua para riego, la aplicación de técnicas de riego, el crecimiento del cultivo, la cosecha, y el procesamiento inicial del mango (lavado, clasificación).",
    20,
    180,
    { maxWidth: 170, align: "justify" }
  );

  doc.setFont("helvetica", "bold");
  doc.text("Análisis del Inventario de la Huella Hídrica", 20, 200);

  doc.setFont("helvetica", "normal");
  doc.text("Datos recolectados:", 20, 210);
  doc.text(
    "Los datos reflejan el volumen total de la huella hídrica utilizado para el riego durante la recolección actual y la cantidad total de mangos producidos.",
    20,
    220,
    { maxWidth: 170, align: "justify" }
  );

  doc.setFont("helvetica", "normal");
  doc.text(` • Huella hídrica verde: ${WFDetails.green_component} m³/tonelada`, 20, 235, {
    maxWidth: 170,
  });

  doc.setFont("helvetica", "normal");
  doc.text(` • Huella hídrica azul: ${WFDetails.blue_component} m³/tonelada`, 20, 245, {
    maxWidth: 170,
  });

  doc.setFont("helvetica", "normal");
  doc.text(` • Huella hídrica gris: ${WFDetails.grey_component} m³/tonelada`, 20, 255, {
    maxWidth: 170,
  });

  doc.setFont("helvetica", "normal");
  doc.text(` • Huella hídrica total: ${WFDetails.total} m³/tonelada`, 20, 265, { maxWidth: 170 });

  doc.addPage();

  doc.setFont("helvetica", "bold");
  doc.text("Metodología de cálculo:", 20, 20);

  doc.setFont("helvetica", "normal");
  doc.text("Datos recolectados:", 20, 30);
  doc.text(
    "El cálculo se basó en mediciones directas del consumo de agua y la producción de mangos, y se aplicó la metodología conforme a la norma ISO 14046 y al manual de evaluación de la huella hídrica.",
    20,
    40,
    { maxWidth: 170, align: "justify" }
  );

  doc.setFont("helvetica", "normal");
  doc.text("Descripción del proceso:", 20, 60);
  doc.text(
    "El estudio analiza la extracción de agua para riego y su aplicación en el cultivo, considerando la cantidad total de agua utilizada durante el ciclo de cultivo. Para ello, se registró el volumen de agua aplicado, así como la producción total de mangos.",
    20,
    70,
    { maxWidth: 170, align: "justify" }
  );

  doc.setFont("helvetica", "normal");
  doc.text(
    "Adicionalmente, se utilizó una API para obtener datos geoespaciales relevantes para el análisis.",
    20,
    90,
    { maxWidth: 170, align: "justify" }
  );

  doc.setFont("helvetica", "bold");
  doc.text("Resultados e Interpretación", 20, 110);

  doc.setFont("helvetica", "normal");
  doc.text(
    "Aquí hay unas sugerencias para reducir la huella hídrica de cultivo de mango Tommy Atkins:",
    20,
    120,
    { maxWidth: 170, align: "justify" }
  );

  doc.save("Informe_Huella_Hidrica.pdf");
};
