import { Link } from "react-router-dom"

const HomeNoAuth = () => {
  return (
    <div class="px-4 py-5 my-5 text-center">
    <h1 class="display-4 fw-bold">Listodo</h1>
    <div class="col-lg-6 mx-auto lead">
      <p>Too much to do to remember them all? Short memory? Just need a diary?</p>
      <p className='fw-bold'>We got you!</p>
      <p>Register to Listodo now to keep track of everything</p>
      <ul class="list-unstyled">
        <li>✔ Unlimited lists with unlimited records</li>
        <li>✔ Add, remove, edit, check things </li>
        <li>✔ Access your data everywhere</li>
        <li>✔ Free forever</li>
      </ul>
      <div class="d-grid gap-4 d-sm-flex justify-content-sm-center mt-4">
        <Link class="btn btn-main fw-bold btn-lg px-5" to="/register">Register</Link>
        <Link class="btn btn-main btn-lg px-5" to="/login">Login</Link>
      </div>
    </div>
  </div>
  )
}

export default HomeNoAuth