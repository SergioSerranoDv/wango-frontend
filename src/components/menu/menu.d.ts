export interface MenuProps {
  items?: ItemType[];
  open: boolean;
}

export interface ItemType {
  title: string;
  icon: React.ReactNode;
  link: string;
}
