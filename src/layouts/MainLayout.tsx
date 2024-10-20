import React, { PropsWithChildren } from "react";
import Navbar from "../components/layout/Navbar";
import { SideBar } from "../components/layout/SideBar";
import { Container } from "../styles/GlobalStyles";

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main style={{ display: "flex" }}>
        <SideBar />
        <Container>{children}</Container>
      </main>
    </>
  );
};
