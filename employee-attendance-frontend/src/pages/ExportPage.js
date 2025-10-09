import React from 'react';
import Button from '../components/Button';
import api from '../api/api';

const ExportPage = () => {
  const downloadICS = async () => {
    const res = await api.get('/attendances/export-ics', { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'attendance.ics');
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div style={{ padding: '16px' }}>
      <h2>Export Attendance</h2>
      <Button onClick={downloadICS}>Export ICS File</Button>
    </div>
  );
};

export default ExportPage;