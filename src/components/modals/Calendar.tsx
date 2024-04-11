import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";
import calendarIcon from "../../assets/icons/calendar.svg";
import {
  DatePickerContainer,
  CalendarIcon,
  CustomInput,
} from "../../styles/components/CalendarStyles";
registerLocale("es", es);

interface CustomDatePickerProps {
  selected: Date;
  onChange: (date: Date) => void;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ selected, onChange }) => {
  return (
    <DatePickerContainer>
      <CalendarIcon
        src={calendarIcon}
        alt="Calendar Icon"
      />
      <DatePicker
        selected={selected}
        onChange={onChange}
        dateFormat="dd/MM/yyyy"
        customInput={<CustomInput readOnly />}
        locale="es"
      />
    </DatePickerContainer>
  );
};

export default CustomDatePicker;
