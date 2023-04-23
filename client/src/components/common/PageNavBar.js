import { Nav, Navbar } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { isAuthenticated, removeToken } from '../../helpers/auth'


const PageNavBar = () => {
  const location = useLocation()

  const handleLogout = () => {
    removeToken()
  }

  return (
    <Navbar expand='md' className=''>
      <Container>
        <Navbar.Brand to='/' as={Link}>
        </Navbar.Brand>
        <Navbar.Collapse>
          <Nav>
            {isAuthenticated() ?
              <>
                {/* <Nav.Link to='/' as={Link} onClick={handleLogout}>Logout</Nav.Link> */}
                <Nav.Link to='/collection' as={Link} className='collection-icon'>
                </Nav.Link>
              </>
              :
              <>
                <Nav.Link to='/login' as={Link}>Login</Nav.Link>
                <Nav.Link to='/register' as={Link}>Register</Nav.Link>
              </>
            }
            <Nav.Link className='atmos-name' to='/' as={Link}> A     T     M     O     S</Nav.Link>
            {location.pathname === '/collection' ? <Nav.Link onClick={() => handleLogout()} className='logout-button' to='/' as={Link}> Logout</Nav.Link> : ''}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default PageNavBar