import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/contextsHooks/useAuthContext.js';

import NotFound from "./pages/NotFound"
import HomeAuth from "./pages/HomeAuth"
import HomeNoAuth from "./pages/HomeNoAuth"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Navbar from './components/Navbar.jsx'

export default function App() {
  const {user} = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/" 
            element={user ? <HomeAuth /> : <HomeNoAuth />}
          />
          <Route 
            path="/login" 
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route 
            path="/register" 
            element={!user ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}