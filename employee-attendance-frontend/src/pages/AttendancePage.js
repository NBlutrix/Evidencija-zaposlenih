import React, { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import Card from '../components/Card';
import Button from '../components/Button';
import api from '../api/api';

const AttendancePage = () => {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [attendances, setAttendances] = useState([]);
  const [meta, setMeta] = useState({});

  const fetchAttendances = async () => {
    let url = `/attendances?page=${page}`;
    if (statusFilter) url += `&status=${statusFilter}`;
    const res = await api.get(url);
    setAttendances(res.data.data);
    setMeta({
      current_page: res.data.current_page,
      last_page: res.data.last_page
    });
  };

  useEffect(() => {
    fetchAttendances();
  }, [page, statusFilter]);

  return (
    <div style={{ padding: '16px' }}>
      <h2>Attendances</h2>
      <label>Status Filter: </label>
      <select onChange={e => setStatusFilter(e.target.value)}>
        <option value="">All</option>
        <option value="present">Present</option>
        <option value="absent">Absent</option>
        <option value="leave">Leave</option>
      </select>

      {attendances.map(att => (
        <Card key={att.id} title={`${att.user.name} - ${att.date}`}>
          Status: {att.status} <br />
          Arrival: {att.arrival_time || 'N/A'} <br />
          Departure: {att.departure_time || 'N/A'}
        </Card>
      ))}

      <div style={{ marginTop: '16px' }}>
        <Button onClick={() => setPage(prev => Math.max(prev - 1, 1))}>Prev</Button>
        <span style={{ margin: '0 8px' }}>{meta.current_page || 1}</span>
        <Button onClick={() => setPage(prev => prev + 1)}>Next</Button>
      </div>
    </div>
  );
};

export default AttendancePage;
