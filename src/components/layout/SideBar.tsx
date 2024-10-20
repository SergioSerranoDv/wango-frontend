import { Aside, ItemMenu, ListItem } from "../../styles/components/SideBar";
import { Link } from "react-router-dom";
import dashboard from "../../assets/icons/dashboard.svg";
import lot from "../../assets/icons/lot.svg";
import report from "../../assets/icons/report.svg";
import water from "../../assets/icons/water.svg";

export const SideBar = () => {
  return (
    <Aside>
      <nav>
        <ul style={{ marginTop: "4rem", listStyle: "none", paddingLeft: "0" }}>
          <ListItem>
            <img src={dashboard} width={20} height={20} alt="Dashboard" />
            <a href="/" style={{ textDecoration: "none", width: "100%", color: "currentcolor" }}>
              <ItemMenu>Dashboard</ItemMenu>
            </a>
          </ListItem>
          <ListItem>
            <img src={lot} width={20} height={20} alt="Lots" />
            <Link
              to="/dashboard/lots"
              style={{ textDecoration: "none", width: "100%", color: "currentcolor" }}
            >
              <ItemMenu>Lotes</ItemMenu>
            </Link>
          </ListItem>
          <ListItem>
            <img src={water} width={20} height={20} alt="Lots" />
            <Link
              to="/dashboard/water-footprint"
              style={{ textDecoration: "none", width: "100%", color: "currentcolor" }}
            >
              <ItemMenu>Huella hidrica</ItemMenu>
            </Link>
          </ListItem>
          <ListItem>
            <img src={report} width={20} height={20} alt="Reports" />
            <ItemMenu>Reportes</ItemMenu>
          </ListItem>
        </ul>
      </nav>
    </Aside>
  );
};
