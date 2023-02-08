import { Route, Routes } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/home/Home'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
