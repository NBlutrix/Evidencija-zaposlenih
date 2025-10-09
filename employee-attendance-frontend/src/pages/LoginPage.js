import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/login', { email, password });
      navigate('/'); // nakon logina ide na Home
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '300px', margin: '50px auto' }}>
      <Input label="Email" value={email} onChange={e => setEmail(e.target.value)} type="email" />
      <Input label="Password" value={password} onChange={e => setPassword(e.target.value)} type="password" />
      <Button type="submit">Login</Button>
    </form>
  );
};

export default LoginPage;
