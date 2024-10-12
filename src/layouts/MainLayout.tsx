import React, { PropsWithChildren } from "react";
import Navbar from "../components/Navbar";
import { Container } from "../styles/GlobalStyles";
import { SideBar } from "../components/SideBar";
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
