import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export const WaterFootprintPieChart = ({ data }: any) => {
  // Prepare the chart data
  const chartData = {
    labels: ["Component azul", "Componente verde", "Component gris"],
    datasets: [
      {
        label: "Water Footprint",
        data: [data.blue_component, data.green_component, data.grey_component],
        backgroundColor: ["#36A2EB", "#4CAF50", "#9E9E9E"], // Colors for the segments
        borderColor: ["#fff", "#fff", "#fff"],
        borderWidth: 1,
      },
    ],
  };

  // Pie chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.label}: ${tooltipItem.raw.toFixed(2)}`;
          },
        },
      },
    },
  };

  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "16px",
        background: "#fff",
        boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.25)",
      }}
    >
      <span>Huella hídrica de la ultima recolección</span>
      <hr />
      <Pie data={chartData} options={options} />
    </div>
  );
};
