import axios from 'axios'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const navigate = useNavigate()

  const [ formFields,setFormFields ] = useState( {
    username: '',
    password: '',
  })
  const [ loginError,setLoginError ] = useState('')

  const handleChange = (e) => {
    setFormFields( { ...formFields, [e.target.name]: e.target.value })
    setLoginError('')
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/users/login/', formFields)
      localStorage.setItem('ATMOS-USER-TOKEN', data.token)
      navigate('/')
    } catch (error) {
      setLoginError(error.message)
      console.log(error)
    }
  }


  return (
    <main className='form-page'>
      <Container >
        <Row>
          <Col as='form' xs='10' md='6' lg='4' onSubmit={handleSubmit}>
            <h1> Login </h1>
            {/* Username */}
            <label htmlFor='username'>Username</label>
            <input placeholder='Username' type='text' name='username' onChange={handleChange} value={formFields.username} />
            {/* Password */}
            <label htmlFor='password'>Password</label>
            <input placeholder='Password' type='password' name='password' onChange={handleChange} value={formFields.password} />
            <button>Login</button>
            { loginError && <h6 className='error-message'> {loginError} </h6>}
          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default Login