import { Route, Routes } from 'react-router-dom'
import Auth from './pages/auth/auth'
import Home from './pages/home/home'
import Profile from './pages/profile/profile'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/me" element={<Profile />} />
        <Route path="/login" element={<Auth />} />
      </Routes>
    </>
  )
}

export default App
