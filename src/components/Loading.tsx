import logoLoading from "../assets/images/loading.gif";
import { LogoContainer, LogoImage } from "../styles/LoadingStyles";

const LogoLoadingAnimation = () => {
  return (
    <LogoContainer>
      <LogoImage src={logoLoading} alt="Loading..." />
    </LogoContainer>
  );
};

export default LogoLoadingAnimation;
