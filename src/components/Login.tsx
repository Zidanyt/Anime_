import React, { useState } from 'react'
import axios from '../utils/axiosInstance'
import { useNavigate, Link  } from 'react-router-dom'

interface LoginProps {
  onLogin: () => void
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post('/login', { email, password })
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('userId', response.data.userId)
      onLogin()
      navigate('/anime-list')
    } catch (error) {
      console.error('Erro no login:', error)
      setErrorMessage('Email ou senha incorretos.')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button type="submit">Entrar</button>
      <p>Não tem uma conta? <Link to="/">Cadastre-se</Link></p>
    </form>
  )
}

export default Login
