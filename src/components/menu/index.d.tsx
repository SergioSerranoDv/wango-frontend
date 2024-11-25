import { Link } from "react-router-dom";
import { Item } from "../../styles/components/menu/MenuStyles";
import { MenuProps } from "./menu";

export const Menu: React.FC<MenuProps> = ({ items }) => {
  return (
    <nav>
      <ul style={{ marginTop: "2rem", listStyle: "none", padding: "0 1rem" }}>
        {items?.map((item, index) => (
          <Item key={index}>
            {item.icon}
            <Link
              to={item.link}
              style={{ textDecoration: "none", width: "100%", color: "currentcolor" }}
            >
              {item.title}
            </Link>
          </Item>
        ))}
      </ul>
    </nav>
  );
};
