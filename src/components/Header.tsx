import { Button } from "../styles/FormStyles";
import { Text, Hero } from "../styles/MainMenuStyles";

interface HeaderProps {
  description: string;
  title: string;
  openModal: any;
}
export const Header: React.FC<HeaderProps> = ({ description, title, openModal }) => {
  return (
    <>
      <Hero>
        <Text> {description} </Text>
        <Button
          onClick={() => openModal()}
          style={{
            padding: "12px 16px",
          }}
        >
          <span>
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginRight: "6px" }}
            >
              <path d="M11 13v6h2v-6h6v-2h-6V5h-2v6H5v2h6z" fill="currentColor"></path>
            </svg>
          </span>
          {title}
        </Button>
      </Hero>
    </>
  );
};
