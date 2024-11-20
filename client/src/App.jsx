import { Outlet, Link, Form } from "react-router-dom"
import Header from "./components/Header"

function App() {
  return (
    <>
      <Header>
        <Link to="/login">Login</Link>
        <br/>
        <Link to="/register">Register</Link>
        <br/>
        <Link to="/home">HomePage</Link>
        
        <Form method="post">
          <button>log out</button>
        </Form>
      </Header>
      <Outlet/>
    </>
    
  )
}

export default App
