import React, { useRef, useEffect } from "react";
import { Item } from "../styles/components/Actions";
import { DropdownContainer } from "../styles/components/DropdownStyles";

interface DropdownProps {
  items: { action: () => void; icon: JSX.Element; name: string }[];
  closeDropdown: () => void;
}

export const Dropdown: React.FC<DropdownProps> = ({ closeDropdown, items }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        !ref.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <DropdownContainer ref={ref}>
      {items.map((action) => (
        <Item
          key={action.name}
          onClick={() => {
            action.action();
            closeDropdown();
          }}
        >
          <span style={{ marginRight: "8px" }}>{action.icon}</span>
          <div>{action.name}</div>
        </Item>
      ))}
    </DropdownContainer>
  );
};
