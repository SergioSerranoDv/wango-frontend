export interface MenuProps {
  items?: ItemType[];
}

export interface ItemType {
  title: string;
  icon: React.ReactNode;
  link: string;
}
