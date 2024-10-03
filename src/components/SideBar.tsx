import { Aside, ItemMenu, ListItem } from "../styles/components/SideBar";

export const SideBar = () => {
  return (
    <Aside>
      <nav>
        <ul style={{ marginTop: "4rem", listStyle: "none", paddingLeft: "0" }}>
          <ListItem>
            <a href="/" style={{ textDecoration: "none", width: "100%" }}>
              <ItemMenu>Dashboard</ItemMenu>
            </a>
          </ListItem>
          <ListItem>
            <a href="/lots-manage" style={{ textDecoration: "none", width: "100%" }}>
              <ItemMenu>Lotes</ItemMenu>
            </a>
          </ListItem>
          <ListItem>
            <ItemMenu>Reportes</ItemMenu>
          </ListItem>
        </ul>
      </nav>
    </Aside>
  );
};
