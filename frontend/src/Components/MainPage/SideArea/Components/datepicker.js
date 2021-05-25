import React, { useState } from "react";
import DatePicker from "react-datepicker";

// CSS Modules, react-datepicker-cssmodules.css
import '../../../../../node_modules/react-datepicker/dist/react-datepicker.css';

function Example() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
  );
}

export default Example;