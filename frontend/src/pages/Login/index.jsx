import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  const navigate = useNavigate()

  const setCookies = (jwtToken) => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
  }

  const submitForm = async () => {
    const userDetails = { username, password }

    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      }

      const apiUrl = `${import.meta.env.VITE_API_URL}/login`
      const response = await fetch(apiUrl, options)
      const data = await response.json()

      if (!response.ok) {
        setIsError(true)
        setMessage(data.error || 'Login Failed')
      } else {
        setIsError(false)
        setMessage('Login successful')
        setUsername('')
        setPassword('')
        setCookies(data.jwt_token)
        navigate('/', { replace: true })
      }
    } catch (error) {
      setIsError(true)
      setMessage('Network error. Please try again.')
    }
  }

  const handleLogin = (event) => {
    event.preventDefault()
    submitForm()
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Enter your Email"
          id="email"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Enter your Password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="submit">Login</button>

        {message && (
          <p className={isError ? 'error-message' : 'success-message'}>
            {message}
          </p>
        )}

        <p className="register-text">
          Don't have an account? <Link to="/register" className="register-link">Register here</Link>
        </p>
      </form>
    </div>
  )
}

export default Login
