import { Link } from "react-router-dom"

const HomeNoAuth = () => {
  return (
  <div className="px-4 py-5 my-5 text-center">
    <h1 className="display-4 fw-bold">Listodo</h1>
    <div className="col-lg-6 mx-auto lead">
      <p>Too much to do to remember them all? Short memory? Just need a diary?</p>
      <p className='fw-bold'>We got you!</p>
      <p>Register to Listodo now to keep track of everything</p>
      <ul className="list-unstyled">
        <li>✔ Unlimited lists with unlimited records</li>
        <li>✔ Add, remove, edit, check things </li>
        <li>✔ Access your data everywhere</li>
        <li>✔ Free forever</li>
      </ul>
      <div className="d-grid gap-4 d-sm-flex justify-content-sm-center mt-4">
        <Link className="btn btn-main fw-bold btn-lg px-5" to="/register">Register</Link>
        <Link className="btn btn-main btn-lg px-5" to="/login">Login</Link>
      </div>
    </div>
  </div>
  )
}

export default HomeNoAuth