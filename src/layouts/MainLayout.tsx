import React, { PropsWithChildren, useEffect, useState } from "react";
import { Header } from "../components/layout/Header";
import { Sider } from "../components/layout/Sider";
import { Container, Wrapper } from "../styles/GlobalStyles";

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Header toogleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
      <Wrapper>
        <Sider isOpen={isSidebarOpen} />
        <Container>{children}</Container>
      </Wrapper>
    </>
  );
};
