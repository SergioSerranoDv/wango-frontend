import React, { PropsWithChildren } from "react";
import Navbar from "../components/layout/Navbar";
import { SideBar } from "../components/layout/SideBar";
import { Container, Content } from "../styles/GlobalStyles";

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Content>
        <SideBar />
        <Container>{children}</Container>
      </Content>
    </>
  );
};
