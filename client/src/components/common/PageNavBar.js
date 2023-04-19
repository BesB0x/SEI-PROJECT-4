import { Nav, Navbar } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'
import { isAuthenticated, removeToken } from '../../helpers/auth'

const PageNavBar = () => {

  const handleLogout = () => {
    removeToken()
  }

  return (
    <Navbar expand='md' className='navbar-light bg-light'>
      <Container>
        <Navbar.Brand to='/' as={Link}> ª–ª</Navbar.Brand>
        <Navbar.Collapse>
          <Nav>
            {isAuthenticated() ?
              <>
                <Nav.Link to='/' as={Link} onClick={handleLogout}>Logout</Nav.Link>
                <Nav.Link to='/collection' as={Link}>Your Collection</Nav.Link>
              </>
              :
              <>
                <Nav.Link to='/login' as={Link}>Login</Nav.Link>
                <Nav.Link to='/register' as={Link}>Register</Nav.Link>
              </>
            }
            <Nav.Link to='/' as={Link}>Library</Nav.Link>
            <Nav.Link to='/daw' as={Link}>DAW</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default PageNavBar