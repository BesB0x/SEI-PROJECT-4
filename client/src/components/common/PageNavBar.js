import { Nav, Navbar } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'
import { isAuthenticated, removeToken } from '../../helpers/auth'

import logo from '../../assets/logo-bw.png'
import collection from '../../assets/cltn-bw.png'

const PageNavBar = () => {

  return (
    <Navbar expand='md' className='navbar-light bg-light'>
      <Container>
        <Navbar.Brand to='/' as={Link}>
          <Link to="/" >
          </Link>
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default PageNavBar