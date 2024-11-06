import React from "react";
import { UseGet } from "../../hooks/UseGet";

interface TopCardProps {
  background: string;
  endpoint: string;
  description: string;
  icon: string;
}
export const TopCard: React.FC<TopCardProps> = ({ background, endpoint, description, icon }) => {
  const { data, loading } = UseGet({
    endpoint: endpoint,
  });

  return (
    <div
      style={{
        borderRadius: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "20px",
        background: "#fff",
        boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.25)",
        minWidth: "300px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div
          style={{
            background: `${background}`,
            width: "40px",
            height: "40px",
            borderRadius: "1rem",
            padding: "9px",
          }}
        >
          <img width={36} height={36} src={icon} alt="" />
        </div>
        <span>{loading ? "Cargando..." : data.count}</span>
      </div>
      <span>{description}</span>
    </div>
  );
};
