import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function TestComponent() {
  const [value, setValue] = useState(new Date());

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc' }}>
      <h1>Test Calendar</h1>
      <Calendar onChange={setValue} value={value} />
    </div>
  );
}
