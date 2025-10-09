import React from 'react';
import Button from '../components/Button';
import api from '../api/api';

const ExportPage = () => {
  const downloadICS = async () => {
    try {
      const res = await api.get('/attendances/export-ics', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'attendance.ics');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Error exporting ICS:", err);
      alert("Ne mogu da preuzmem ICS fajl.");
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Export Attendance</h2>
      <Button onClick={downloadICS}>Export ICS File</Button>
    </div>
  );
};

export default ExportPage;
