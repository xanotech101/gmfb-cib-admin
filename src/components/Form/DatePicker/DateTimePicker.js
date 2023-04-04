import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from 'components/Button/Button';
import { Container } from 'components/Container/Container';
const DateTimePicker = ({toggle}) => {

  const [startDate, setStartDate] = useState(new Date());
  return (
    <div
     
      className={`absolute top-[22%] z-30 hidden${toggle}`}>
        <Container>
      <ReactDatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
     <div className='mt-3'>
     <Button isFullWidth>Download</Button>
     </div>
      </Container>
    </div>
  );
};

export default DateTimePicker;
