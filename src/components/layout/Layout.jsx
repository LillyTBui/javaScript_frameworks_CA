import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Home from "../home/Home";
import Contact from "../contact/Contact";
import Login from "../login/Login";
import Admin from "../admin/Admin";
import Detail from "../detail/Detail";

function Layout() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="md">
        <Container>
          <NavLink to="/" exact>
            <Navbar.Brand>Course assignment</Navbar.Brand>
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
              <NavLink to="/contact" className="nav-link">
                Contact
              </NavLink>
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/detail/:id" element={<Detail />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default Layout;
