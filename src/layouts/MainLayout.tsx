import React, { PropsWithChildren } from "react";
import Navbar from "../components/Navbar";
import { Container } from "../styles/GlobalStyles";
export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>
        <Container>{children}</Container>
      </main>
    </>
  );
};
