import React, { useRef, useEffect } from "react";
import { DropdownContainer } from "../styles/components/DropdownStyles";

interface DropdownProps {
  children: React.ReactNode;
  closeDropdown: () => void;
}

export const Dropdown: React.FC<DropdownProps> = ({ closeDropdown, children }) => {
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

  return <DropdownContainer ref={ref}>{children}</DropdownContainer>;
};
