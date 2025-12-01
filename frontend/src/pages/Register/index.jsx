import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.css'

const Register = () => {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [gender,setGender]=useState('')
  const [isError, setIsError] = useState(false)

  const navigate = useNavigate()

  const submitForm = async () => {
    const userDetails = { firstname, lastname, username, password , gender }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDetails),
      })

      const data = await response.json()

      if (!response.ok) {
        setIsError(true)
        setMessage(data.error || 'Registration failed')
      } else {
        setIsError(false)
        setMessage('Registration successful')

        // Clear form fields
        setFirstname('')
        setLastname('')
        setUsername('')
        setPassword('')

        // Redirect after short delay
        setTimeout(() => {
          navigate('/login')
        }, 1500)
      }
    } catch (error) {
      setIsError(true)
      setMessage('Network error. Please try again.')
    }
  }

  const handleRegister = (e) => {
    e.preventDefault()
    submitForm()
  }

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2 className="form-heading">Create Your Account</h2>

        <label htmlFor="firstname">First Name</label>
        <input
          type="text"
          id="firstname"
          placeholder="Enter your Firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />

        <label htmlFor="lastname">Last Name</label>
        <input
          type="text"
          id="lastname"
          placeholder="Enter your Lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />

           <label htmlFor="gender">Gender</label>
        <input
          type="text"
          id="gender"
          placeholder="Enter your Lastname"
          value={gender}
          onChange={(e) => setGender(e.target.value.toLowerCase())}
        />

        <label htmlFor="username">Email</label>
        <input
          type="email"
          id="username"
          placeholder="Enter your Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Register</button>

        {/* ✅ Message appears BELOW the button */}
        {message && (
          <p className={isError ? 'error-message' : 'success-message'}>
            {message}
          </p>
        )}
<p className="register-text">
  Already have an account? <a href="/login" className="register-link">Login here</a>
</p>


      </form>
    </div>
  )
}

export default Register
