import React from "react";
import crop from "../assets/icons/crop.svg";
import farm from "../assets/icons/farm.svg";
import performance from "../assets/icons/performance.svg";
import { MainLayout } from "../layouts/MainLayout";
import { TopCard } from "../sections/analytics/TopCard";
import { WaterFootprintPieChart } from "../sections/analytics/WaterFootprintPieChart";
import { TopCardsContainer } from "../styles/MainMenuStyles";

const MainMenu: React.FC = () => {
  const data = {
    blue_component: 97986.86,
    green_component: 292803,
    grey_component: 40965.21,
  };

  return (
    <MainLayout>
      <TopCardsContainer>
        <TopCard
          background="#FFB032"
          description="Lotes de este mes"
          icon={farm}
          endpoint="v1/user/analytics/lots/quantity/by-month"
        />
        <TopCard
          background="#4CAF50"
          description="Cultivos de este mes"
          icon={crop}
          endpoint="v1/user/analytics/crops/quantity/by-month"
        />
        <TopCard
          background="#6C4E31"
          description="Recolecciones de este mes"
          icon={performance}
          endpoint="v1/user/analytics/collections/daily-performance/quantity/by-month"
        />
      </TopCardsContainer>
      <WaterFootprintPieChart data={data} />
    </MainLayout>
  );
};

export default MainMenu;
