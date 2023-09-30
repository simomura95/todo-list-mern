import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/contextsHooks/useAuthContext.jsx';

import NotFound from "./pages/NotFound.jsx"
import HomeAuth from "./pages/HomeAuth.jsx"
import HomeNoAuth from "./pages/HomeNoAuth.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
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