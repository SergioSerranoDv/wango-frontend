import React from "react";
import styled, { keyframes } from "styled-components";
import logoLoading from "../assets/images/loading2.gif";
import { LogoContainer, LogoImage } from "../styles/LoadingStyles";

const LogoLoadingAnimation = () => {
  return (
    <LogoContainer>
      <LogoImage src={logoLoading} alt="Loading..." />
    </LogoContainer>
  );
};

export default LogoLoadingAnimation;
