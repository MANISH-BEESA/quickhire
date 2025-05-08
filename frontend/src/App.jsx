import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login  from './pages/Login'
import Home from './pages/Home'
import PostAJob from './pages/JobPosting'
import Jobs from './pages/Jobs'
import JobDetails from './pages/JobDetails'
import ApplyForm from './pages/ApplyForm'
import Profile from './pages/Profile'
import JobApplicants from './pages/jobApplicants'
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
        <Route
        path="/PostJob"
        element={
          <ProtectedRoute>
            <PostAJob />
          </ProtectedRoute>
        }
      />
           <Route
        path="/Jobs"
        element={
          <ProtectedRoute>
            <Jobs />
          </ProtectedRoute>
        }
      />
               <Route
        path="/jobs/:id"
        element={
          <ProtectedRoute>
            <JobDetails />
          </ProtectedRoute>
        }
      />
                     <Route
        path="/apply/:id"
        element={
          <ProtectedRoute>
            <ApplyForm />
          </ProtectedRoute>
        }
      />
                         <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
         <Route
        path="/jobs/:jobId/applications"
        element={
          <ProtectedRoute>
            <JobApplicants />
          </ProtectedRoute>
        }
      />
      </Routes>
    </BrowserRouter>
  )
}

export default App
