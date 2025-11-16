import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleLogin = async e => {
    e.preventDefault()
    try {
      const response = await axios.post('/login', { username, password })
      sessionStorage.setItem('accessToken', response.data.accessToken)
      sessionStorage.setItem('refreshToken', response.data.refreshToken)
      setError(null)
      navigate('/protected', { replace: true })
    } catch (err) {
      setError('Login failed. Please check your credentials.')
      console.error(err)
    }
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default Login

