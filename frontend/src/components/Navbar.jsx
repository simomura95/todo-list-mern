import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout.jsx'
import { useAuthContext } from '../hooks/contextsHooks/useAuthContext.jsx'

function Navbar() {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleLogout = () => {
    logout()
  }

  return (
    <nav className="navbar bg-dark navbar-expand-sm" aria-label="Navbar" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand ms-sm-2" to="/">Listodo</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar">
          {user && 
                <span className="navbar-text ms-auto username-navbar">{user.username}</span>
          }
          <ul className={`navbar-nav me-sm-2 mb-2 mb-sm-0 ${!user ? "ms-auto" : ""}`}>
            {!user && (
              <>
              <li className="nav-item">
                <Link className="nav-link ms-auto" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link ms-2" to="/register">Register</Link>
              </li>
              </>
            )}
            {user && (
              <li className="nav-item">
                <button className="nav-link ms-4 border rounded" onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar