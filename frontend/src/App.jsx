import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login  from './pages/Login'
import Home from './pages/Home'
import ProtectedRoute from './components/protectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path='/login' element={<Login />}/>
        <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      </Routes>
    </BrowserRouter>
  )
}

export default App
