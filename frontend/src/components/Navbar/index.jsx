import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Navbar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login')
  }

  const toggleMenu = () => {
    const menu = document.querySelector('.nav-links')
    menu.classList.toggle('nav-open')
  }

  return (
    <header className="navbar">
      <h1 className="navbar-logo">QuickHire</h1>
      <button className="navbar-toggle" onClick={toggleMenu}>☰</button>

      <div className="nav-links">
        <button onClick={() => navigate('/')} className="nav-btn">Home</button>
        <button onClick={() => navigate('/jobs')} className="nav-btn">Jobs</button>
        <button onClick={() => navigate('/PostJob')} className="nav-btn">Post a Job</button>
        <button onClick={() => navigate('/profile')} className="nav-btn">Profile</button>
        <button onClick={handleLogout} className="nav-btn logout-btn">Logout</button>
      </div>
    </header>
  )
}

export default Navbar
